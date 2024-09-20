package com.example.MunisysEquip.service.impl;

import com.example.MunisysEquip.entity.Enum.Grade;
import com.example.MunisysEquip.entity.ServiceEntity;
import com.example.MunisysEquip.entity.ServiceSupervisor;
import com.example.MunisysEquip.entity.User;
import com.example.MunisysEquip.exception.APIException;
import com.example.MunisysEquip.exception.ResourceNotFoundException;
import com.example.MunisysEquip.repository.ServiceEntityRepository;
import com.example.MunisysEquip.repository.ServiceSupervisorRepository;
import com.example.MunisysEquip.repository.UserRepository;
import com.example.MunisysEquip.service.SupervisorInitializationService;
import com.example.MunisysEquip.service.UserSupervisorService;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SupervisorInitializationServiceImpl implements SupervisorInitializationService {

    private final UserRepository userRepository;
    private final ServiceEntityRepository serviceEntityRepository;
    private final ServiceSupervisorRepository serviceSupervisorRepository;
    private final UserSupervisorService userSupervisorService;  // UserSupervisorService to update user supervisors

    @PostConstruct
    @Override
    public void initializeSupervisors() {
        List<ServiceEntity> services = serviceEntityRepository.findAll();
        for (ServiceEntity service : services) {
            if (hasAllGrades(service) && !hasSupervisors(service)) {
                assignSupervisors(service);
            }
        }
    }

    @Override
    public boolean hasAllGrades(ServiceEntity service) {
        return userRepository.findByServiceAndGrade(service, Grade.MANAGER).size() > 0 &&
                userRepository.findByServiceAndGrade(service, Grade.SERVICE_LEADER).size() > 0 &&
                userRepository.findByServiceAndGrade(service, Grade.TEAM_LEADER).size() > 0 &&
                userRepository.findByServiceAndGrade(service, Grade.ENGINEER).size() > 0;
    }

    @Override
    public boolean hasSupervisors(ServiceEntity service) {
        return serviceSupervisorRepository.findByService(service).size() > 0;
    }

    @Override
    public void assignSupervisors(ServiceEntity service) {
        assignSupervisor(service, Grade.MANAGER);
        assignSupervisor(service, Grade.SERVICE_LEADER);
        assignSupervisor(service, Grade.TEAM_LEADER);
        assignSupervisor(service, Grade.ENGINEER);

        // Trigger user supervisor initialization after assigning supervisors
        userSupervisorService.initializeSupervisorsForService(service.getId());
    }

    @Override
    public void assignSupervisor(ServiceEntity service, Grade grade) {
        Optional<User> userOpt = userRepository.findByServiceAndGrade(service, grade).stream().findFirst();
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            ServiceSupervisor supervisor = new ServiceSupervisor();
            supervisor.setService(service);
            supervisor.setUser(user);
            supervisor.setSupervisorName(user.getName());
            supervisor.setGrade(grade);

            int supervisorLevel = switch (grade) {
                case MANAGER -> 1;
                case SERVICE_LEADER -> 2;
                case TEAM_LEADER -> 3;
                case ENGINEER -> 4;
                default -> 5;
            };

            supervisor.setLvl(supervisorLevel);
            serviceSupervisorRepository.save(supervisor);
        }
    }

    @Override
    public void addSupervisor(Long serviceId, Long userId) {
        ServiceEntity service = serviceEntityRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (!user.getService().getId().equals(serviceId)) {
            throw new APIException(HttpStatus.BAD_REQUEST, "User does not belong to this service.");
        }

        if (serviceSupervisorRepository.findByServiceAndUser(service, user).isPresent()) {
            throw new APIException(HttpStatus.BAD_REQUEST, "This user is already a supervisor in this service.");
        }

        int maxLevel = serviceSupervisorRepository.findByService(service).stream()
                .mapToInt(ServiceSupervisor::getLvl).max().orElse(0);

        ServiceSupervisor newSupervisor = new ServiceSupervisor();
        newSupervisor.setService(service);
        newSupervisor.setUser(user);
        newSupervisor.setSupervisorName(user.getName());
        newSupervisor.setGrade(user.getGrade());
        newSupervisor.setLvl(maxLevel + 1);

        serviceSupervisorRepository.save(newSupervisor);
        recalculateSupervisorLevels(serviceId);

        // Update the user supervisors hierarchy after adding a supervisor
        userSupervisorService.initializeSupervisorsForService(serviceId);
    }

    @Override
    public void updateSupervisor(Long serviceId, Long supervisorId, Long userId) {
        ServiceSupervisor supervisor = serviceSupervisorRepository.findById(supervisorId)
                .orElseThrow(() -> new ResourceNotFoundException("Supervisor not found with id: " + supervisorId));

        User newUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (!newUser.getService().getId().equals(serviceId)) {
            throw new APIException(HttpStatus.BAD_REQUEST, "User does not belong to this service.");
        }

        if (serviceSupervisorRepository.findByServiceAndUser(supervisor.getService(), newUser).isPresent()) {
            throw new APIException(HttpStatus.BAD_REQUEST, "This user is already a supervisor in this service.");
        }

        supervisor.setUser(newUser);
        supervisor.setSupervisorName(newUser.getName());
        supervisor.setGrade(newUser.getGrade());

        serviceSupervisorRepository.save(supervisor);
        recalculateSupervisorLevels(serviceId);

        // Update the user supervisors hierarchy after updating a supervisor
        userSupervisorService.initializeSupervisorsForService(serviceId);
    }

    @Override
    public void deleteSupervisor(Long serviceId, Long supervisorId) {
        ServiceSupervisor supervisor = serviceSupervisorRepository.findById(supervisorId)
                .orElseThrow(() -> new ResourceNotFoundException("Supervisor not found with id: " + supervisorId));

        if (!supervisor.getService().getId().equals(serviceId)) {
            throw new APIException(HttpStatus.BAD_REQUEST, "Supervisor does not belong to the specified service.");
        }

        serviceSupervisorRepository.delete(supervisor);
        recalculateSupervisorLevels(serviceId);

        // Update the user supervisors hierarchy after deleting a supervisor
        userSupervisorService.initializeSupervisorsForService(serviceId);
    }

    private void recalculateSupervisorLevels(Long serviceId) {
        ServiceEntity service = serviceEntityRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

        List<ServiceSupervisor> supervisors = serviceSupervisorRepository.findByService(service);
        supervisors.sort(Comparator.comparing(ServiceSupervisor::getLvl));

        for (int i = 0; i < supervisors.size(); i++) {
            supervisors.get(i).setLvl(i + 1);  // Reassign levels starting from 1
            serviceSupervisorRepository.save(supervisors.get(i));
        }
    }
}
