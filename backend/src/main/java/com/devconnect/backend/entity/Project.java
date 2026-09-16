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

    private Integer totalTasks;

    private Integer completedTasks;

    private String deadline;

    private String priority;

    private String status;

    private String userEmail;

    // Default constructor
    public Project() {
    }

    // Parameterized constructor
    public Project(
            String title,
            String description,
            String techStack,
            Integer totalTasks,
            Integer completedTasks,
            String deadline,
            String priority,
            String status,
            String userEmail) {

        this.title = title;
        this.description = description;
        this.techStack = techStack;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.deadline = deadline;
        this.priority = priority;
        this.status = status;
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

    // PRIORITY
    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    // STATUS
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // USER EMAIL
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}