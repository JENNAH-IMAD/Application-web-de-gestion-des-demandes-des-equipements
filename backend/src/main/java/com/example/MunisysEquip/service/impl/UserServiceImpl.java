package com.example.MunisysEquip.service.impl;

import com.example.MunisysEquip.dto.EquipmentResponseDto;
import com.example.MunisysEquip.dto.superiors.SupervisorDto;
import com.example.MunisysEquip.entity.*;

import com.example.MunisysEquip.exception.APIException;
import com.example.MunisysEquip.exception.ResourceNotFoundException;
import com.example.MunisysEquip.repository.*;
import com.example.MunisysEquip.request.UserDtoBody;
import com.example.MunisysEquip.request.UserDtoResponse;
import com.example.MunisysEquip.service.UserService;
import com.example.MunisysEquip.utils.USER_ADAPTER;
import com.example.MunisysEquip.utils.VALUE_UTIL;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ServiceEntityRepository serviceEntityRepository;
    private final EquipmentRepository equipmentRepository;
    private final ServiceSupervisorRepository serviceSupervisorRepository;
    @Override
    public Map<String, SupervisorDto> getAllSupervisorsByService(Long serviceId) {
        ServiceEntity service = serviceEntityRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

        List<ServiceSupervisor> supervisors = serviceSupervisorRepository.findByService(service);

        Map<String, SupervisorDto> result = new LinkedHashMap<>();

        for (int i = 0; i < supervisors.size(); i++) {
            ServiceSupervisor supervisor = supervisors.get(i);
            String supervisorKey = "supervisor " + (i + 1); // Dynamic key: "supervisor 1", "supervisor 2", etc.
            result.put(supervisorKey, new SupervisorDto(
                    supervisor.getId(),                // Supervisor's ID
                    supervisor.getUser().getId(),       // Supervisor's user ID
                    supervisor.getUser().getName(),     // Supervisor's name
                    supervisor.getGrade(),              // Supervisor's grade
                    supervisor.getLvl(),                // Supervisor's level
                    supervisor.getService().getName()   // Service name
            ));
        }

        return result;
    }


    @Override
    public List<UserDtoBody> getUsersByService(Long serviceId) {
        ServiceEntity service = serviceEntityRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

        List<User> users = service.getUsers();
        return users.stream()
                .map(USER_ADAPTER::asUserDtoBody)
                .collect(Collectors.toList());
    }

    @Override
    public UserDtoResponse addUser(UserDtoBody userDto) {

        if (userRepository.existsByUsername(userDto.getUsername())) {
            throw new APIException(HttpStatus.BAD_REQUEST, VALUE_UTIL.USER_EXIST);
        }

        ServiceEntity serviceEntity = serviceEntityRepository.findByName(userDto.getService())
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with name: " + userDto.getService()));

        User user = new User();
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setGrade(userDto.getGrade());
        user.setService(serviceEntity);

        Optional<Role> role = roleRepository.findByName(userDto.getRole());

        if (role.isPresent()) {
            Set<Role> roles = new HashSet<>();
            roles.add(role.get());

            user.setRoles(roles);

            User savedUser = userRepository.save(user);

            return UserDtoResponse.builder()
                    .user(savedUser)
                    .message("User registered")
                    .build();
        }

        return UserDtoResponse.builder()
                .message("Role does not exist")
                .build();
    }

    @Override
    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id :" + id));
    }

    @Override
    public List<UserDtoBody> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(USER_ADAPTER::asUserDtoBody)
                .collect(Collectors.toList());
    }

    @Override
    public UserDtoResponse updateUser(UserDtoBody userDto, Long id) {

        ServiceEntity serviceEntity = serviceEntityRepository.findByName(userDto.getService())
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with name: " + userDto.getService()));

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setService(serviceEntity);
        user.setGrade(userDto.getGrade());

        Optional<Role> role = roleRepository.findByName(userDto.getRole());

        if (role.isPresent()) {
            Set<Role> roles = new HashSet<>();
            roles.add(role.get());

            user.setRoles(roles);

            User updatedUser = userRepository.save(user);

            return UserDtoResponse.builder()
                    .user(updatedUser)
                    .message("User updated")
                    .build();
        }

        return UserDtoResponse.builder()
                .message("Role does not exist")
                .build();
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id : " + id));

        userRepository.deleteById(id);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
    }

    @Override
    public void addEquipmentsToUser(Long userId, List<Equipment> equipments) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        equipments.forEach(equipment -> {
            equipment.setUser(user);
            equipmentRepository.save(equipment);
        });
    }



    @Override
    public List<EquipmentResponseDto> getUserInventory(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        return user.getEquipments().stream()
                .map(equipment -> new EquipmentResponseDto(
                        equipment.getId(),
                        equipment.getName(),
                        equipment.getType(),
                        equipment.getStatus(),
                        equipment.getSeries(),
                        equipment.getDateOfReceipt()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<EquipmentResponseDto> getServiceInventory(Long serviceId) {
        ServiceEntity service = serviceEntityRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

        return service.getUsers().stream()
                .flatMap(user -> user.getEquipments().stream()
                        .map(equipment -> new EquipmentResponseDto(
                                equipment.getId(),
                                equipment.getName(),
                                equipment.getType(),
                                equipment.getStatus(),
                                equipment.getSeries(),
                                equipment.getDateOfReceipt()
                        ))
                )
                .collect(Collectors.toList());
    }


}
