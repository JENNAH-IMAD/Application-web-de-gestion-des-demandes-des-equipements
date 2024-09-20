package com.example.MunisysEquip.dto.superiors;

import com.example.MunisysEquip.entity.Enum.Grade;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SupervisorDto {
    private Long supervisorId;     // Supervisor ID (the ID from the ServiceSupervisor entity)
    private Long userId;           // User ID (the ID from the User entity)
    private String name;           // Supervisor name
    private String service;        // Service name or ID
    private Grade grade;           // Supervisor grade (e.g., MANAGER, ENGINEER)
    private int lvl;               // Supervisor level

    public SupervisorDto(Long supervisorId, Long userId, String name, Grade grade, int lvl, String service) {
        this.supervisorId = supervisorId;
        this.userId = userId;
        this.name = name;
        this.grade = grade;
        this.lvl = lvl;
        this.service = service;
    }
}
