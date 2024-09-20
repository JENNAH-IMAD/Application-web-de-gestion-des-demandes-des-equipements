package com.example.MunisysEquip.repository;



import com.example.MunisysEquip.entity.Enum.Grade;
import com.example.MunisysEquip.entity.ServiceEntity;
import com.example.MunisysEquip.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);
    List<User> findByServiceAndGrade(ServiceEntity service, Grade grade);

    List<User> findByService_Id(Long serviceId);
}
