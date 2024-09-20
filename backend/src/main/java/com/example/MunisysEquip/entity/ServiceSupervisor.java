package com.example.MunisysEquip.entity;

import com.example.MunisysEquip.entity.Enum.Grade;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "service_supervisors")
public class ServiceSupervisor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    private ServiceEntity service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "supervisor_name", nullable = false)
    private String supervisorName;

    @Enumerated(EnumType.STRING)
    @Column(name = "grade")
    private Grade grade;

    // New field for level
    @Column(name = "lvl")
    private int lvl;
}
