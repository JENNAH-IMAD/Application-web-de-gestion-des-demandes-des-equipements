package com.example.MunisysEquip.controller;

import com.example.MunisysEquip.dto.superiors.UserSupervisorDTO;
import com.example.MunisysEquip.service.UserSupervisorService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-supervisors")
@AllArgsConstructor
@CrossOrigin("*")
public class UserSupervisorController {

    private final UserSupervisorService userSupervisorService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserSupervisorDTO>> getUserSupervisors(@PathVariable Long userId) {
        List<UserSupervisorDTO> supervisors = userSupervisorService.getUserSupervisors(userId);
        return ResponseEntity.ok(supervisors);
    }

    @PostMapping("/initialize")
    public ResponseEntity<String> initializeSupervisorsForAllUsers() {
        userSupervisorService.initializeSupervisorsForAllUsers();
        return ResponseEntity.ok("Supervisors initialized successfully for all users.");
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<String> updateUserSupervisors(@PathVariable Long userId) {
        userSupervisorService.updateSupervisorsForUser(userId);
        return ResponseEntity.ok("User supervisors updated successfully.");
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUserSupervisors(@PathVariable Long userId) {
        userSupervisorService.deleteSupervisorsForUser(userId);
        return ResponseEntity.ok("User supervisors deleted successfully.");
    }

    @PostMapping("/add")
    public ResponseEntity<String> addSupervisorForUser(@RequestParam Long userId, @RequestParam Long supervisorId) {
        userSupervisorService.addSupervisorForUser(userId, supervisorId);
        return ResponseEntity.ok("Supervisor added successfully.");
    }
}
