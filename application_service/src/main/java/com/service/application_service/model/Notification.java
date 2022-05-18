package com.service.application_service.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Notification {
    String title;
    String description;
}
