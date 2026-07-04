package com.devconnect.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "files")
public class FileDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String fileType;

    private String filePath;

    public FileDocument() {
    }

    public FileDocument(
            String fileName,
            String fileType,
            String filePath) {

        this.fileName = fileName;
        this.fileType = fileType;
        this.filePath = filePath;
    }

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // FILE NAME
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    // FILE TYPE
    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    // FILE PATH
    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
