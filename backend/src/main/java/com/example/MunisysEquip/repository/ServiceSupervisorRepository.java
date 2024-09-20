package com.example.MunisysEquip.repository;

import com.example.MunisysEquip.entity.Enum.Grade;
import com.example.MunisysEquip.entity.ServiceEntity;
import com.example.MunisysEquip.entity.ServiceSupervisor;
import com.example.MunisysEquip.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceSupervisorRepository extends JpaRepository<ServiceSupervisor, Long> {
    List<ServiceSupervisor> findByService(ServiceEntity service);

    Optional<ServiceSupervisor> findByServiceAndUser(ServiceEntity service, User user);
}
