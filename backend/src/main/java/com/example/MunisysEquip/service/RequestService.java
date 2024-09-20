package com.example.MunisysEquip.service;

import com.example.MunisysEquip.dto.request.RequestDto;
import com.example.MunisysEquip.dto.request.RequestResponseDto;
import com.example.MunisysEquip.entity.Request;


import java.util.List;

public interface RequestService {
    Request createRequest(RequestDto requestDto, Long userId);

    List<RequestResponseDto> getUserRequests(Long userId);

    List<RequestResponseDto> getServiceRequests(Long serviceId);

    Request updateRequestStatus(Long requestId, String status);

    Request createRequestForCurrentUser(RequestDto requestDto);
    List<RequestResponseDto> getCurrentUserRequests();

}
