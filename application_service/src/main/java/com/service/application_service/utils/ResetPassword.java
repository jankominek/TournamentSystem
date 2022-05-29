package com.service.application_service.utils;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResetPassword {
    private String email;
    private String token;
    private String password;
}
