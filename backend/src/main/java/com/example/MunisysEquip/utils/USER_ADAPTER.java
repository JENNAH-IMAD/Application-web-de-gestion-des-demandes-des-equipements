package com.example.MunisysEquip.utils;


import com.example.MunisysEquip.entity.Role;
import com.example.MunisysEquip.entity.User;
import com.example.MunisysEquip.request.UserDtoBody;

import java.util.Iterator;

public class USER_ADAPTER {

    public static UserDtoBody asUserDtoBody(User user){

        String serviceName = user.getService().getName();

        Iterator<Role> roleIterator = user.getRoles().iterator();
        Role current=new Role();
        if (roleIterator.hasNext()) {
             current = roleIterator.next();
        }
        return UserDtoBody.builder()
                .id(user.getId())
                .name(user.getName())
                .role(current.getName())
                .service(serviceName)
                .grade(user.getGrade())
                .password(null)
                .username(user.getUsername())
                .build();
    }

}
