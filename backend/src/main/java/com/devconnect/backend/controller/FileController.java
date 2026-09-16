package com.devconnect.backend.controller;

import com.devconnect.backend.entity.FileDocument;
import com.devconnect.backend.repository.FileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    @Autowired
    private FileRepository fileRepository;

    // =========================================
    // UPLOAD DIRECTORY
    // =========================================
    private final String uploadDir =
            System.getProperty("user.dir") + "/uploads/";

    // =========================================
    // GET ALL FILES
    // =========================================
    @GetMapping
    public List<FileDocument> getAllFiles() {

        return fileRepository.findAll();
    }

    // =========================================
    // UPLOAD FILE
    // =========================================
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file) {

        try {

            // Check if file is empty
            if (file.isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Please select a file");
            }

            // Create uploads folder
            File folder = new File(uploadDir);

            if (!folder.exists()) {

                boolean created = folder.mkdirs();

                if (!created && !folder.exists()) {

                    return ResponseEntity
                            .internalServerError()
                            .body("Could not create upload directory");
                }
            }

            // Get original filename
            String originalFileName =
                    file.getOriginalFilename();

            if (originalFileName == null ||
                    originalFileName.trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Invalid file name");
            }

            // Create file path
            File destinationFile =
                    new File(
                            uploadDir + originalFileName
                    );

            // Save physical file
            file.transferTo(destinationFile);

            // Save file information in database
            FileDocument document =
                    new FileDocument();

            document.setFileName(originalFileName);

            document.setFileType(
                    file.getContentType()
            );

            document.setFilePath(
                    destinationFile.getAbsolutePath()
            );

            fileRepository.save(document);

            return ResponseEntity.ok(
                    "File uploaded successfully"
            );

        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body("Upload failed");
        }
    }

    // =========================================
    // VIEW FILE
    // =========================================
    @GetMapping("/view/{id}")
    public ResponseEntity<Resource> viewFile(
            @PathVariable Long id) throws IOException {

        FileDocument document =
                fileRepository.findById(id)
                        .orElse(null);

        // File record not found
        if (document == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        // Get physical file
        File file =
                new File(
                        document.getFilePath()
                );

        // Physical file not found
        if (!file.exists()) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        // Convert file into Resource
        Resource resource =
                new UrlResource(
                        file.toURI()
                );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" +
                                document.getFileName() +
                                "\""
                )
                .header(
                        HttpHeaders.CONTENT_TYPE,
                        document.getFileType() != null
                                ? document.getFileType()
                                : "application/octet-stream"
                )
                .body(resource);
    }

    // =========================================
    // DELETE FILE
    // =========================================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFile(
            @PathVariable Long id) {

        FileDocument document =
                fileRepository.findById(id)
                        .orElse(null);

        // Database record not found
        if (document == null) {

            return ResponseEntity
                    .badRequest()
                    .body("File not found");
        }

        // Get physical file
        File file =
                new File(
                        document.getFilePath()
                );

        // Delete physical file
        if (file.exists()) {

            boolean deleted = file.delete();

            if (!deleted) {

                return ResponseEntity
                        .internalServerError()
                        .body("Could not delete physical file");
            }
        }

        // Delete database record
        fileRepository.deleteById(id);

        return ResponseEntity.ok(
                "File deleted successfully"
        );
    }
}