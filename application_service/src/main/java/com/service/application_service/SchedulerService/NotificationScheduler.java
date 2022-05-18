package com.service.application_service.SchedulerService;

import com.service.application_service.model.Appointment;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@Service
public class NotificationScheduler {

    CloseableHttpClient httpClient;
    HttpPost request;
    List<StringEntity> paramList;


    public NotificationScheduler() throws IOException {

    }

    public void send(Appointment appointment, String token) throws IOException {
        httpClient = HttpClientBuilder.create().build();
        request = new HttpPost("https://exp.host/--/api/v2/push/send");
        request.addHeader("content-type", "application/json");
        JSONObject json = new JSONObject();
        json.put("to",token);
        json.put("title", appointment.getAppointmentTitle());
        json.put("body", appointment.getAppoinmentDescription());
        StringEntity paramss = new StringEntity(json.toString());

        request.setEntity(paramss);
        httpClient.execute(request);
    }
}
