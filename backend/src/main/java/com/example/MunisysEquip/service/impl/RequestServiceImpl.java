package com.example.MunisysEquip.service.impl;

import com.example.MunisysEquip.dto.request.RequestDto;
import com.example.MunisysEquip.dto.request.RequestResponseDto;
import com.example.MunisysEquip.entity.Request;
import com.example.MunisysEquip.entity.User;
import com.example.MunisysEquip.exception.ResourceNotFoundException;
import com.example.MunisysEquip.repository.RequestRepository;
import com.example.MunisysEquip.repository.UserRepository;

import com.example.MunisysEquip.service.RequestService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final UserRepository userRepository;

    @Override
    public Request createRequest(RequestDto requestDto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Request request = new Request();
        request.setEquipmentType(requestDto.getEquipmentType());
        request.setDescription(requestDto.getDescription());
        request.setStatus("In Progress");
        request.setUser(user);
        return requestRepository.save(request);
    }

    @Override
    public List<RequestResponseDto> getUserRequests(Long userId) {
        return requestRepository.findByUserId(userId).stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RequestResponseDto> getServiceRequests(Long serviceId) {
        return requestRepository.findByUser_Service_Id(serviceId).stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public Request updateRequestStatus(Long requestId, String status) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found with id: " + requestId));

        request.setStatus(status);
        return requestRepository.save(request);
    }

    @Override
    public Request createRequestForCurrentUser(RequestDto requestDto) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + currentUsername));

        Request request = new Request();
        request.setEquipmentType(requestDto.getEquipmentType());
        request.setDescription(requestDto.getDescription());
        request.setStatus("In Progress");
        request.setUser(user);
        return requestRepository.save(request);
    }

    private RequestResponseDto convertToResponseDto(Request request) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        return new RequestResponseDto(
                request.getUser().getName(),
                request.getEquipmentType(),
                request.getDescription(),
                request.getUser().getService().getName(),
                request.getRequestDate().format(formatter),
                request.getStatus()
        );
    }
    @Override
    public List<RequestResponseDto> getCurrentUserRequests() {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + currentUsername));

        return requestRepository.findByUserId(user.getId()).stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

}
