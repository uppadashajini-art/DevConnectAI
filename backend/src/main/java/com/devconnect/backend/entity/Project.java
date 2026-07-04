package com.devconnect.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String techStack;

    // NEW FIELDS
    private Integer totalTasks;

    private Integer completedTasks;

    private String deadline;

    // USER EMAIL
    private String userEmail;

    public Project() {
    }

    public Project(
            String title,
            String description,
            String techStack,
            Integer totalTasks,
            Integer completedTasks,
            String deadline,
            String userEmail) {

        this.title = title;
        this.description = description;
        this.techStack = techStack;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.deadline = deadline;
        this.userEmail = userEmail;
    }

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // TITLE
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // DESCRIPTION
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // TECH STACK
    public String getTechStack() {
        return techStack;
    }

    public void setTechStack(String techStack) {
        this.techStack = techStack;
    }

    // TOTAL TASKS
    public Integer getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(Integer totalTasks) {
        this.totalTasks = totalTasks;
    }

    // COMPLETED TASKS
    public Integer getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(Integer completedTasks) {
        this.completedTasks = completedTasks;
    }

    // DEADLINE
    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    // USER EMAIL
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}