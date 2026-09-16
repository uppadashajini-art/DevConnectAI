package com.devconnect.backend.controller;

import com.devconnect.backend.entity.Team;
import com.devconnect.backend.service.TeamService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team")
@CrossOrigin(origins = "*")
public class TeamController {

    @Autowired
    private TeamService teamService;

    // =========================================
    // ADD TEAM MEMBER
    // =========================================

    @PostMapping
    public ResponseEntity<Team> addMember(
            @RequestBody Team team) {

        Team savedMember = teamService.addMember(team);

        return ResponseEntity.ok(savedMember);
    }

    // =========================================
    // GET ALL TEAM MEMBERS
    // =========================================

    @GetMapping
    public ResponseEntity<List<Team>> getAllMembers() {

        List<Team> members = teamService.getAllMembers();

        return ResponseEntity.ok(members);
    }

    // =========================================
    // GET TEAM MEMBER BY ID
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<Team> getMemberById(
            @PathVariable Long id) {

        Team member = teamService.getMemberById(id);

        if (member == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(member);
    }

    // =========================================
    // UPDATE TEAM MEMBER
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<Team> updateMember(
            @PathVariable Long id,
            @RequestBody Team updatedTeam) {

        Team updatedMember =
                teamService.updateMember(id, updatedTeam);

        if (updatedMember == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedMember);
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
