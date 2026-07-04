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

    // SAVE FILE
    public FileDocument saveFile(
            FileDocument fileDocument) {

        return fileRepository.save(fileDocument);
    }

    // GET ALL FILES
    public List<FileDocument> getAllFiles() {

        return fileRepository.findAll();
    }

    // DELETE FILE
    public void deleteFile(Long id) {

        fileRepository.deleteById(id);
    }
}