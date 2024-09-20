package com.example.MunisysEquip.service.impl;

import com.example.MunisysEquip.dto.superiors.UserSupervisorDTO;
import com.example.MunisysEquip.entity.Enum.Grade;
import com.example.MunisysEquip.entity.ServiceEntity;
import com.example.MunisysEquip.entity.User;
import com.example.MunisysEquip.entity.UserSupervisor;
import com.example.MunisysEquip.exception.ResourceNotFoundException;
import com.example.MunisysEquip.repository.ServiceEntityRepository;
import com.example.MunisysEquip.repository.UserRepository;
import com.example.MunisysEquip.repository.UserSupervisorRepository;
import com.example.MunisysEquip.service.UserSupervisorService;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserSupervisorServiceImpl implements UserSupervisorService {

    private final UserRepository userRepository;
    private final UserSupervisorRepository userSupervisorRepository;
    private final ServiceEntityRepository serviceEntityRepository;

    @PostConstruct
    @Override
    public void initializeSupervisorsForAllUsers() {
        List<ServiceEntity> services = serviceEntityRepository.findAll();
        for (ServiceEntity service : services) {
            initializeSupervisorsForService(service.getId());
        }
    }

    public void initializeSupervisorsForService(Long serviceId) {
        List<User> users = userRepository.findByService_Id(serviceId);

        for (User user : users) {
            if (userSupervisorRepository.findByUserId(user.getId()).isEmpty()) {
                assignSupervisorsToUser(user);
            }
        }
    }

    @Override
    public void assignSupervisorsToUser(User user) {
        Grade userGrade = user.getGrade();
        ServiceEntity service = user.getService();

        if (userGrade == Grade.TECHNICIAN) {
            assignSupervisors(user, service, Grade.ENGINEER, Grade.TEAM_LEADER, Grade.SERVICE_LEADER, Grade.MANAGER);
        } else if (userGrade == Grade.ENGINEER) {
            assignSupervisors(user, service, Grade.TEAM_LEADER, Grade.SERVICE_LEADER, Grade.MANAGER);
        } else if (userGrade == Grade.TEAM_LEADER) {
            assignSupervisors(user, service, Grade.SERVICE_LEADER, Grade.MANAGER);
        } else if (userGrade == Grade.SERVICE_LEADER) {
            assignSupervisors(user, service, Grade.MANAGER);
        }
    }

    private void assignSupervisors(User user, ServiceEntity service, Grade... grades) {
        int currentServiceLevel = 0; // Default starting level

        for (Grade grade : grades) {
            Optional<User> supervisorOpt = userRepository.findByServiceAndGrade(service, grade).stream().findFirst();
            if (supervisorOpt.isPresent()) {
                User supervisor = supervisorOpt.get();

                // Create new UserSupervisor entity and set fields
                UserSupervisor userSupervisor = new UserSupervisor();
                userSupervisor.setUser(user);
                userSupervisor.setUserName(user.getName());
                userSupervisor.setUserGrade(user.getGrade());
                userSupervisor.setSupervisor(supervisor);
                userSupervisor.setService(supervisor.getService());
                userSupervisor.setSupervisorName(supervisor.getName());
                userSupervisor.setSupervisorGrade(supervisor.getGrade());

                // Set the level of the supervisor
                userSupervisor.setLvl(currentServiceLevel + 1);
                currentServiceLevel++; // Increment for the next supervisor

                // Save to the database
                userSupervisorRepository.save(userSupervisor);
            }
        }
    }

    @Override
    public void updateSupervisorsForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        userSupervisorRepository.deleteByUserId(userId);

        assignSupervisorsToUser(user);
    }

    @Override
    public void deleteSupervisorsForUser(Long userId) {
        userSupervisorRepository.deleteByUserId(userId);
    }

    @Override
    public List<UserSupervisorDTO> getUserSupervisors(Long userId) {
        List<UserSupervisor> userSupervisors = userSupervisorRepository.findByUserId(userId);
        return userSupervisors.stream()
                .map(userSupervisor -> new UserSupervisorDTO(
                        userSupervisor.getUser().getId(),
                        userSupervisor.getUserName(),
                        userSupervisor.getUserGrade(),
                        userSupervisor.getSupervisor().getId(),
                        userSupervisor.getSupervisorName(),
                        userSupervisor.getSupervisorGrade(),
                        userSupervisor.getService().toString()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public void addSupervisorForUser(Long userId, Long supervisorId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        User supervisor = userRepository.findById(supervisorId)
                .orElseThrow(() -> new ResourceNotFoundException("Supervisor not found with id: " + supervisorId));

        UserSupervisor userSupervisor = new UserSupervisor();
        userSupervisor.setUser(user);
        userSupervisor.setUserName(user.getName());
        userSupervisor.setUserGrade(user.getGrade());
        userSupervisor.setSupervisor(supervisor);
        userSupervisor.setService(supervisor.getService());
        userSupervisor.setSupervisorName(supervisor.getName());
        userSupervisor.setSupervisorGrade(supervisor.getGrade());

        // Set level for new supervisor (increment based on hierarchy)
        userSupervisor.setLvl(userSupervisorRepository.findByUserId(userId).size() + 1);

        userSupervisorRepository.save(userSupervisor);
    }
}
