package com.example.MunisysEquip.repository;

import com.example.MunisysEquip.entity.UserSupervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSupervisorRepository extends JpaRepository<UserSupervisor, Long> {
    List<UserSupervisor> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}
