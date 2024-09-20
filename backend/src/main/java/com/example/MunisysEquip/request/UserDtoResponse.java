package com.example.MunisysEquip.request;


import com.example.MunisysEquip.entity.Enum.Grade;
import com.example.MunisysEquip.entity.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDtoResponse {

    private User user;

    private String message;

    private Grade grade;
}
