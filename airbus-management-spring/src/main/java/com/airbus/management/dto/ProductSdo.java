package com.airbus.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductSdo {
    private String productId;
    private String productName;
    private String productCategory;
    private String productDescription;
    private int units;
}
