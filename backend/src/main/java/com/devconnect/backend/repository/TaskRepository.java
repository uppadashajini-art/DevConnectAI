package com.devconnect.backend.repository;

import com.devconnect.backend.entity.Task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository
        extends JpaRepository<Task, Long> {

    List<Task> findByUserEmail(String userEmail);

    List<Task> findByProjectId(Long projectId);
}
