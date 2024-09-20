package com.example.MunisysEquip.controller;

import com.example.MunisysEquip.dto.superiors.SupervisorDto;
import com.example.MunisysEquip.entity.ServiceEntity;
import com.example.MunisysEquip.entity.ServiceSupervisor;
import com.example.MunisysEquip.entity.User;
import com.example.MunisysEquip.exception.ResourceNotFoundException;
import com.example.MunisysEquip.repository.ServiceEntityRepository;
import com.example.MunisysEquip.repository.ServiceSupervisorRepository;
import com.example.MunisysEquip.request.UserDtoBody;
import com.example.MunisysEquip.service.SupervisorInitializationService;
import com.example.MunisysEquip.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/supervisors")
@AllArgsConstructor
@CrossOrigin("*")
public class SupervisorController {

    private final UserService userService;
    private final ServiceEntityRepository serviceEntityRepository;
    private final SupervisorInitializationService supervisorInitializationService;
    private final ServiceSupervisorRepository serviceSupervisorRepository;


    // Get all supervisors of a service in a hierarchical manner (keyed by supervisor order)
    @GetMapping("/service/{serviceId}/supervisors")
    public ResponseEntity<Map<String, SupervisorDto>> getAllSupervisorsByService(@PathVariable Long serviceId) {
        Map<String, SupervisorDto> supervisors = userService.getAllSupervisorsByService(serviceId);
        return new ResponseEntity<>(supervisors, HttpStatus.OK);
    }

    // Add a new supervisor to a service
    @PostMapping("/service/{serviceId}/add-supervisor/{userId}")
    public ResponseEntity<String> addSupervisor(@PathVariable Long serviceId, @PathVariable Long userId) {
        supervisorInitializationService.addSupervisor(serviceId, userId);
        return new ResponseEntity<>("Supervisor added successfully.", HttpStatus.CREATED);
    }

    // Update an existing supervisor by assigning a different user
    @PutMapping("/service/{serviceId}/update-supervisor/{supervisorId}/{userId}")
    public ResponseEntity<String> updateSupervisor(@PathVariable Long serviceId,
                                                   @PathVariable Long supervisorId,
                                                   @PathVariable Long userId) {
        supervisorInitializationService.updateSupervisor(serviceId, supervisorId, userId);
        return new ResponseEntity<>("Supervisor updated successfully.", HttpStatus.OK);
    }

    // Delete a supervisor and adjust the levels of remaining supervisors
    @DeleteMapping("/service/{serviceId}/delete-supervisor/{supervisorId}")
    public ResponseEntity<String> deleteSupervisor(@PathVariable Long serviceId,
                                                   @PathVariable Long supervisorId) {
        supervisorInitializationService.deleteSupervisor(serviceId, supervisorId);
        return new ResponseEntity<>("Supervisor deleted and levels adjusted.", HttpStatus.OK);
    }
}
