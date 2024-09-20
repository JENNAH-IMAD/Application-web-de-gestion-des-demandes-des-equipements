package com.example.MunisysEquip.service;

import com.example.MunisysEquip.entity.Enum.Grade;
import com.example.MunisysEquip.entity.ServiceEntity;

public interface SupervisorInitializationService {
    void initializeSupervisors();
    void assignSupervisors(ServiceEntity service);
    void addSupervisor(Long serviceId, Long userId);
    void updateSupervisor(Long serviceId, Long supervisorId, Long userId);
    void deleteSupervisor(Long serviceId, Long supervisorId);
    void assignSupervisor(ServiceEntity service, Grade grade);
    boolean hasAllGrades(ServiceEntity service);
    boolean hasSupervisors(ServiceEntity service);
}
