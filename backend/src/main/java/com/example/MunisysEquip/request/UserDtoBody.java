package com.example.MunisysEquip.request;

import com.example.MunisysEquip.entity.Enum.Grade;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDtoBody {
    private Long id;
    private String name;

    private String username;

    private String password;

    private Grade grade;

    private String service;

    private String role;

}
