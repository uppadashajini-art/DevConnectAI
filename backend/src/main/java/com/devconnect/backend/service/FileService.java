package com.devconnect.backend.service;

import com.devconnect.backend.entity.FileDocument;
import com.devconnect.backend.repository.FileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    // =========================================
    // SAVE FILE
    // =========================================
    public FileDocument saveFile(
            FileDocument fileDocument) {

        return fileRepository.save(fileDocument);
    }

    // =========================================
    // GET ALL FILES
    // =========================================
    public List<FileDocument> getAllFiles() {

        return fileRepository.findAll();
    }

    // =========================================
    // GET FILE BY ID
    // =========================================
    public FileDocument getFileById(Long id) {

        return fileRepository.findById(id)
                .orElse(null);
    }

    // =========================================
    // DELETE FILE
    // =========================================
    public void deleteFile(Long id) {

        fileRepository.deleteById(id);
    }
}