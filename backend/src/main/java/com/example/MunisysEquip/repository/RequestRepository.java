package com.example.MunisysEquip.repository;

import com.example.MunisysEquip.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findByUserId(Long userId);

    // Utiliser la relation entre Request et User, puis User et Service
    List<Request> findByUser_Service_Id(Long serviceId);
}
