package com.devconnect.backend.controller;

import com.devconnect.backend.entity.Team;
import com.devconnect.backend.service.TeamService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team")
@CrossOrigin(origins = "http://localhost:3000")
public class TeamController {

    @Autowired
    private TeamService teamService;

    // =========================================
    // ADD TEAM MEMBER
    // =========================================
    @PostMapping
    public ResponseEntity<Team> addMember(
            @RequestBody Team team) {

        Team savedMember =
                teamService.addMember(team);

        return ResponseEntity.ok(savedMember);
    }

    // =========================================
    // GET ALL TEAM MEMBERS
    // =========================================
    @GetMapping
    public ResponseEntity<List<Team>> getAllMembers() {

        List<Team> members =
                teamService.getAllMembers();

        return ResponseEntity.ok(members);
    }

    // =========================================
    // UPDATE TEAM MEMBER
    // =========================================
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMember(
            @PathVariable Long id,
            @RequestBody Team updatedTeam) {

        Team existingTeam =
                teamService.getMemberById(id);

        if (existingTeam == null) {

            return ResponseEntity
                    .notFound()
                    .build();
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

        Team savedMember =
                teamService.addMember(existingTeam);

        return ResponseEntity.ok(savedMember);
    }

    // =========================================
    // DELETE TEAM MEMBER
    // =========================================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMember(
            @PathVariable Long id) {

        Team existingTeam =
                teamService.getMemberById(id);

        if (existingTeam == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        teamService.deleteMember(id);

        return ResponseEntity.ok(
                "Team member deleted successfully"
        );
    }
}