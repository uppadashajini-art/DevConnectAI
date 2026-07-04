package com.devconnect.backend.controller;

import com.devconnect.backend.entity.Activity;
import com.devconnect.backend.service.ActivityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:3000")
public class ActivityController {

    @Autowired
    private ActivityService service;

    @GetMapping
    public List<Activity> getActivities() {

        return service.getAllActivities();

    }

    @PostMapping
    public Activity saveActivity(
            @RequestBody Activity activity) {

        return service.saveActivity(activity);

    }
}
