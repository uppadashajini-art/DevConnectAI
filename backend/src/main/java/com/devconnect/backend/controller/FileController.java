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

    // UPLOAD DIRECTORY
    private final String uploadDir =
            System.getProperty("user.dir")
                    + "/uploads/";

    // GET ALL FILES
    @GetMapping
    public List<FileDocument> getAllFiles() {

        return fileRepository.findAll();
    }

    // UPLOAD FILE
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file
    ) {

        try {

            // CREATE FOLDER
            File folder = new File(uploadDir);

            if (!folder.exists()) {

                folder.mkdirs();
            }

            // FILE PATH
            String filePath =
                    uploadDir +
                            file.getOriginalFilename();

            // SAVE FILE
            file.transferTo(
                    new File(filePath));

            // SAVE DATABASE
            FileDocument document =
                    new FileDocument();

            document.setFileName(
                    file.getOriginalFilename());

            document.setFileType(
                    file.getContentType());

            document.setFilePath(
                    filePath);

            fileRepository.save(document);

            return ResponseEntity.ok(
                    "File uploaded successfully"
            );

        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body("Upload failed");
        }
    }

    // VIEW FILE
    @GetMapping("/view/{id}")
    public ResponseEntity<Resource> viewFile(
            @PathVariable Long id
    ) throws IOException {

        FileDocument document =
                fileRepository.findById(id)
                        .orElse(null);

        if (document == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        File file =
                new File(
                        document.getFilePath());

        Resource resource =
                new UrlResource(
                        file.toURI());

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\""
                                + document.getFileName()
                                + "\""
                )
                .body(resource);
    }

    // DELETE FILE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFile(
            @PathVariable Long id
    ) {

        FileDocument document =
                fileRepository.findById(id)
                        .orElse(null);

        if (document != null) {

            // DELETE PHYSICAL FILE
            File file =
                    new File(
                            document.getFilePath());

            if (file.exists()) {

                file.delete();
            }

            // DELETE DATABASE
            fileRepository.deleteById(id);

            return ResponseEntity.ok(
                    "File deleted successfully"
            );
        }

        return ResponseEntity
                .badRequest()
                .body("File not found");
    }
}
