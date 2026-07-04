package com.devconnect.backend.repository;

import com.devconnect.backend.entity.FileDocument;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository
        extends JpaRepository<FileDocument, Long> {
}