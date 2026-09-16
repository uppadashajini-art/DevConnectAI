package com.devconnect.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String memberName;

    private String memberEmail;

    private String role;

    private String projectName;

    // Default constructor
    public Team() {
    }

    // Parameterized constructor
    public Team(
            String memberName,
            String memberEmail,
            String role,
            String projectName) {

        this.memberName = memberName;
        this.memberEmail = memberEmail;
        this.role = role;
        this.projectName = projectName;
    }

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // MEMBER NAME
    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    // MEMBER EMAIL
    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }

    // ROLE
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // PROJECT NAME
    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
}