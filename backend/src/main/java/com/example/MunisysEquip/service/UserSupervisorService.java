package com.example.MunisysEquip.service;

import com.example.MunisysEquip.dto.superiors.SupervisorDto;
import com.example.MunisysEquip.dto.superiors.UserSupervisorDTO;
import com.example.MunisysEquip.entity.User;

import java.util.List;
import java.util.Map;

public interface UserSupervisorService {
    void initializeSupervisorsForAllUsers();
    void assignSupervisorsToUser(User user);
    void updateSupervisorsForUser(Long userId);
    void deleteSupervisorsForUser(Long userId);
    List<UserSupervisorDTO> getUserSupervisors(Long userId);
    void addSupervisorForUser(Long userId, Long supervisorId);


    void initializeSupervisorsForService(Long serviceId);
}
