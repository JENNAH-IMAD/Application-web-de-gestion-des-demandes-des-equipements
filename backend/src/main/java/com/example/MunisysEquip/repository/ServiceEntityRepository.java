    package com.example.MunisysEquip.repository;

    import com.example.MunisysEquip.entity.ServiceEntity;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    import java.util.Optional;
    @Repository
    public interface ServiceEntityRepository extends JpaRepository<ServiceEntity,Long> {
        Optional<ServiceEntity> findByName(String name);

    }
