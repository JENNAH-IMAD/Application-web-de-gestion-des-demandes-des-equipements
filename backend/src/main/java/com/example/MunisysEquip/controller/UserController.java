package com.example.MunisysEquip.controller;


import com.example.MunisysEquip.entity.User;
import com.example.MunisysEquip.request.UserDtoBody;
import com.example.MunisysEquip.request.UserDtoResponse;
import com.example.MunisysEquip.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("api/users")
@AllArgsConstructor
public class UserController {

    private UserService userService;
    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<UserDtoBody>> getUsersByService(@PathVariable Long serviceId) {
        List<UserDtoBody> users = userService.getUsersByService(serviceId);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<UserDtoResponse> updateUserRole(@PathVariable Long id, @RequestBody UserDtoBody userDto) {
        UserDtoResponse updatedUser = userService.updateUser(userDto, id);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
    // Build Add User REST API
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<UserDtoResponse> addUser(@RequestBody UserDtoBody userDto){

        UserDtoResponse savedUser = userService.addUser(userDto);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    // Build Get User REST API
    @PreAuthorize("hasAnyRole('ADMIN_SUPERVISOR','ADMIN')")
    @GetMapping("{id}")
    public ResponseEntity<UserDtoResponse> getUser(@PathVariable("id") Long userId){
        User user = userService.getUser(userId);
        return new ResponseEntity<>(UserDtoResponse.builder()
                .user(user)
                .message("User found")
                .build(), HttpStatus.OK);
    }
    // Build Get All Users REST API
    @PreAuthorize("hasAnyRole('ADMIN','ADMIN_SUPERVISOR','SUPERVISOR')")
    @GetMapping
    public ResponseEntity<List<UserDtoBody>> getAllUsers(){
        List<UserDtoBody> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    // Build Update User REST API
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<UserDtoResponse> updateUser(@RequestBody UserDtoBody userDto, @PathVariable("id") Long userId){
        UserDtoResponse updatedUser = userService.updateUser(userDto, userId);
        return ResponseEntity.ok(updatedUser);
    }

    // Build Delete User REST API
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully!.");
    }

}



