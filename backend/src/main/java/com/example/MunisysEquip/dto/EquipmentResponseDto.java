package com.example.MunisysEquip.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EquipmentResponseDto {
    private Long id;
    private String name;
    private String type;
    private String status;
    private String series;
    private LocalDate dateOfReceipt;


}
