
package com.devconnect.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String color;

    // Default constructor
    public Activity() {
    }

    // Parameterized constructor
    public Activity(
            String title,
            String description,
            String color) {

        this.title = title;
        this.description = description;
        this.color = color;
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

    // COLOR
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}