package com.example.MunisysEquip.service.impl;


import com.example.MunisysEquip.dto.JwtAuthResponse;
import com.example.MunisysEquip.dto.LoginDto;
import com.example.MunisysEquip.dto.RegisterDto;
import com.example.MunisysEquip.entity.Enum.Grade;
import com.example.MunisysEquip.entity.Role;
import com.example.MunisysEquip.entity.ServiceEntity;
import com.example.MunisysEquip.entity.User;
import com.example.MunisysEquip.exception.APIException;
import com.example.MunisysEquip.repository.RoleRepository;
import com.example.MunisysEquip.repository.ServiceEntityRepository;
import com.example.MunisysEquip.repository.UserRepository;
import com.example.MunisysEquip.security.JwtTokenProvider;
import com.example.MunisysEquip.service.AuthService;
import com.example.MunisysEquip.utils.VALUE_UTIL;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private ServiceEntityRepository serviceEntityRepository;

    @Override
    public String register(RegisterDto registerDto) {

        // check username is already exists in database
        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new APIException(HttpStatus.BAD_REQUEST, VALUE_UTIL.USER_EXIST);
        }
        // Trouver le service par son nom
        Optional<ServiceEntity> serviceOpt = serviceEntityRepository.findByName(registerDto.getService());
        if (!serviceOpt.isPresent()) {
            throw new APIException(HttpStatus.BAD_REQUEST, "Service not found");
        }

        ServiceEntity service = serviceOpt.get();

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setGrade(Grade.valueOf(registerDto.getGrad()));
        user.setService(service);  // Associer le service à l'utilisateur




        Set<Role> roles = new HashSet<>();
        Optional<Role> userRole = roleRepository.findByName("ROLE_ADMIN_SUPERVISOR");
        roles.add(userRole.get());

        user.setRoles(roles);

        userRepository.save(user);

        return "User Registered Successfully!.";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(),
                loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        Optional<User> userOptional = userRepository.findByUsername(loginDto.getUsername());

        String role = null;
        if(userOptional.isPresent()){
            User loggedInUser = userOptional.get();
            Optional<Role> optionalRole = loggedInUser.getRoles().stream().findFirst();

            if(optionalRole.isPresent()){
                Role userRole = optionalRole.get();
                role = userRole.getName();
            }
        }

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setRole(role);
        jwtAuthResponse.setAccessToken(token);
        return jwtAuthResponse;
    }
}
