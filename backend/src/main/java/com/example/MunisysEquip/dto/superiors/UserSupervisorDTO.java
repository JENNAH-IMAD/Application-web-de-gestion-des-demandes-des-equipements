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
public class UserSupervisorDTO {
    private Long userId;
    private String userName;
    private Grade userGrade;
    private Long supervisorId;
    private String supervisorName;
    private Grade supervisorGrade;
    private String service;


}
