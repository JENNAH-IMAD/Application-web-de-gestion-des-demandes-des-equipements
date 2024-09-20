package com.example.MunisysEquip.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RequestResponseDto {
    private String userName;
    private String equipmentType;
    private String description;
    private String serviceName;
    private String requestDate; // Format: "dd-MM-yyyy"
    private String status;
}
