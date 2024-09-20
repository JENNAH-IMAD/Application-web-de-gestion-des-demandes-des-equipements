package com.example.MunisysEquip.service;


import com.example.MunisysEquip.dto.JwtAuthResponse;
import com.example.MunisysEquip.dto.LoginDto;
import com.example.MunisysEquip.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    JwtAuthResponse login(LoginDto loginDto);
}
