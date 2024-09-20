package com.example.MunisysEquip.controller;

import com.example.MunisysEquip.dto.EquipmentResponseDto;
import com.example.MunisysEquip.entity.Equipment;
import com.example.MunisysEquip.entity.User;
import com.example.MunisysEquip.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/inventory")
@AllArgsConstructor
public class InventoryController {

    private final UserService userService;

    @PostMapping("/user/{userId}/equipment")
    public ResponseEntity<String> addEquipmentToUser(@PathVariable Long userId, @RequestBody List<Equipment> equipments) {
        userService.addEquipmentsToUser(userId, equipments);
        return new ResponseEntity<>("Equipments added to user's inventory", HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public List<EquipmentResponseDto> getUserInventory(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        return userService.getUserInventory(user.getId());
    }

    @GetMapping("/service/{serviceId}")
    public List<EquipmentResponseDto> getServiceInventory(@PathVariable Long serviceId) {
        return userService.getServiceInventory(serviceId);
    }
}