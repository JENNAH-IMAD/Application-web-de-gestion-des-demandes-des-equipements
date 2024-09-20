package com.example.MunisysEquip.controller;

import com.example.MunisysEquip.dto.request.RequestDto;
import com.example.MunisysEquip.dto.request.RequestResponseDto;
import com.example.MunisysEquip.entity.Request;

import com.example.MunisysEquip.service.RequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/requests")
@AllArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<String> createRequest(@PathVariable Long userId, @RequestBody RequestDto requestDto) {
        requestService.createRequest(requestDto, userId);
        return ResponseEntity.ok("Request created successfully");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RequestResponseDto>> getUserRequests(@PathVariable Long userId) {
        List<RequestResponseDto> requests = requestService.getUserRequests(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<RequestResponseDto>> getServiceRequests(@PathVariable Long serviceId) {
        List<RequestResponseDto> requests = requestService.getServiceRequests(serviceId);
        return ResponseEntity.ok(requests);
    }

    @PutMapping("/{requestId}/status")
    public ResponseEntity<Request> updateRequestStatus(@PathVariable Long requestId, @RequestBody String status) {
        Request updatedRequest = requestService.updateRequestStatus(requestId, status);
        return ResponseEntity.ok(updatedRequest);
    }

    @PostMapping("/current-user")
    public ResponseEntity<String> createRequestForCurrentUser(@RequestBody RequestDto requestDto) {
        requestService.createRequestForCurrentUser(requestDto);
        return new ResponseEntity<>("Votre demande a été créée avec succès!", HttpStatus.CREATED);
    }
    @GetMapping("/current-user")
    public ResponseEntity<List<RequestResponseDto>> getCurrentUserRequests() {
        List<RequestResponseDto> requests = requestService.getCurrentUserRequests();
        return ResponseEntity.ok(requests);
    }
}
