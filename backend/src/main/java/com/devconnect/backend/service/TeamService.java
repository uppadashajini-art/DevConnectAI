package com.devconnect.backend.service;

import com.devconnect.backend.entity.Activity;
import com.devconnect.backend.entity.Notification;
import com.devconnect.backend.entity.Team;

import com.devconnect.backend.repository.ActivityRepository;
import com.devconnect.backend.repository.NotificationRepository;
import com.devconnect.backend.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    // =========================================
    // ADD TEAM MEMBER
    // =========================================
    public Team addMember(Team team) {

        Team savedTeam =
                teamRepository.save(team);

        // -----------------------------------------
        // SAVE ACTIVITY
        // -----------------------------------------

        Activity activity =
                new Activity();

        activity.setTitle(
                "New Team Member Added"
        );

        activity.setDescription(
                team.getMemberName()
                        + " joined DevConnect AI"
        );

        activity.setColor("blue");

        activityRepository.save(activity);

        // -----------------------------------------
        // SAVE NOTIFICATION
        // -----------------------------------------

        Notification notification =
                new Notification();

        notification.setTitle(
                "New Team Member Added"
        );

        notification.setMessage(
                team.getMemberName()
                        + " joined DevConnect AI"
        );

        notification.setType("team");

        notification.setTime("Just Now");

        notificationRepository.save(notification);

        return savedTeam;
    }

    // =========================================
    // GET ALL TEAM MEMBERS
    // =========================================
    public List<Team> getAllMembers() {

        return teamRepository.findAll();
    }

    // =========================================
    // GET MEMBER BY ID
    // =========================================
    public Team getMemberById(Long id) {

        return teamRepository.findById(id)
                .orElse(null);
    }

    // =========================================
    // UPDATE MEMBER
    // =========================================
    public Team updateMember(
            Long id,
            Team updatedTeam) {

        Team existingTeam =
                teamRepository.findById(id)
                        .orElse(null);

        if (existingTeam == null) {
            return null;
        }

        existingTeam.setMemberName(
                updatedTeam.getMemberName()
        );

        existingTeam.setMemberEmail(
                updatedTeam.getMemberEmail()
        );

        existingTeam.setRole(
                updatedTeam.getRole()
        );

        existingTeam.setProjectName(
                updatedTeam.getProjectName()
        );

        Team saved =
                teamRepository.save(existingTeam);

        // -----------------------------------------
        // SAVE ACTIVITY
        // -----------------------------------------

        Activity activity =
                new Activity();

        activity.setTitle(
                "Team Member Updated"
        );

        activity.setDescription(
                updatedTeam.getMemberName()
                        + " details updated"
        );

        activity.setColor("green");

        activityRepository.save(activity);

        // -----------------------------------------
        // SAVE NOTIFICATION
        // -----------------------------------------

        Notification notification =
                new Notification();

        notification.setTitle(
                "Team Member Updated"
        );

        notification.setMessage(
                updatedTeam.getMemberName()
                        + " details updated"
        );

        notification.setType("team");

        notification.setTime("Just Now");

        notificationRepository.save(notification);

        return saved;
    }

    // =========================================
    // DELETE MEMBER
    // =========================================
    public String deleteMember(Long id) {

        Team existingTeam =
                teamRepository.findById(id)
                        .orElse(null);

        if (existingTeam == null) {
            return "Team member not found";
        }

        teamRepository.deleteById(id);

        // -----------------------------------------
        // SAVE ACTIVITY
        // -----------------------------------------

        Activity activity =
                new Activity();

        activity.setTitle(
                "Team Member Removed"
        );

        activity.setDescription(
                existingTeam.getMemberName()
                        + " was removed"
        );

        activity.setColor("red");

        activityRepository.save(activity);

        // -----------------------------------------
        // SAVE NOTIFICATION
        // -----------------------------------------

        Notification notification =
                new Notification();

        notification.setTitle(
                "Team Member Removed"
        );

        notification.setMessage(
                existingTeam.getMemberName()
                        + " was removed"
        );

        notification.setType("team");

        notification.setTime("Just Now");

        notificationRepository.save(notification);

        return "Team member deleted successfully";
    }
}