package com.devconnect.backend.controller;

import com.devconnect.backend.entity.Team;
import com.devconnect.backend.service.TeamService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team")
@CrossOrigin(origins = "http://localhost:3000")
public class TeamController {

    @Autowired
    private TeamService teamService;

    // ADD MEMBER
    @PostMapping
    public Team addMember(
            @RequestBody Team team) {

        return teamService.addMember(team);
    }

    // GET ALL MEMBERS
    @GetMapping
    public List<Team> getAllMembers() {

        return teamService.getAllMembers();
    }

    // UPDATE MEMBER
    @PutMapping("/{id}")
    public Team updateMember(
            @PathVariable Long id,
            @RequestBody Team updatedTeam) {

        Team existingTeam =
                teamService.getMemberById(id);

        if (existingTeam != null) {

            existingTeam.setMemberName(
                    updatedTeam.getMemberName());

            existingTeam.setMemberEmail(
                    updatedTeam.getMemberEmail());

            existingTeam.setRole(
                    updatedTeam.getRole());

            existingTeam.setProjectName(
                    updatedTeam.getProjectName());

            return teamService.addMember(existingTeam);
        }

        return null;
    }

    // DELETE MEMBER
    @DeleteMapping("/{id}")
    public void deleteMember(
            @PathVariable Long id) {

        teamService.deleteMember(id);
    }
}