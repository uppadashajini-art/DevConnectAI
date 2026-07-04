package com.devconnect.backend.repository;

import com.devconnect.backend.entity.Project;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository
        extends JpaRepository<Project, Long> {

    List<Project> findByUserEmail(String userEmail);
}
