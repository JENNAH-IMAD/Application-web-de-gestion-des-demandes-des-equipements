package com.example.MunisysEquip.service;



import com.example.MunisysEquip.dto.EquipmentResponseDto;

import com.example.MunisysEquip.dto.superiors.SupervisorDto;
import com.example.MunisysEquip.entity.Equipment;

import com.example.MunisysEquip.entity.User;
import com.example.MunisysEquip.request.UserDtoBody;
import com.example.MunisysEquip.request.UserDtoResponse;

import java.util.List;
import java.util.Map;


public interface UserService {
    UserDtoResponse addUser(UserDtoBody UserDto);

    User getUser(Long id);

    List<UserDtoBody> getAllUsers();

    UserDtoResponse updateUser(UserDtoBody UserDto, Long id);

    List<UserDtoBody> getUsersByService(Long serviceId);

    void deleteUser(Long id);
    List<EquipmentResponseDto> getUserInventory(Long userId);

    List<EquipmentResponseDto> getServiceInventory(Long serviceId);

    User findByUsername(String username);

    void addEquipmentsToUser(Long userId, List<Equipment> equipments);


    Map<String, SupervisorDto> getAllSupervisorsByService(Long serviceId);
}
