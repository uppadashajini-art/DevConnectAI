package com.devconnect.backend.service;

import com.devconnect.backend.entity.Activity;
import com.devconnect.backend.repository.ActivityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository repository;

    public List<Activity> getAllActivities() {

        return repository.findAll();

    }

    public Activity saveActivity(Activity activity) {

        return repository.save(activity);

    }
}