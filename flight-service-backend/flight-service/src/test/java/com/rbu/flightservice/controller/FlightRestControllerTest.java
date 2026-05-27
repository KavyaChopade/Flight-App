package com.rbu.flightservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rbu.flightservice.entity.Flight;
import com.rbu.flightservice.exception.FlightNotFoundException;
import com.rbu.flightservice.service.FlightService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FlightRestController.class)
class FlightRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FlightService flightService;

    @Autowired
    private ObjectMapper objectMapper;

    private Flight flight1;
    private Flight flight2;

    @BeforeEach
    void setUp() {
        flight1 = new Flight("AI101", "Air India", "Mumbai", "Delhi", 4500.00);
        flight2 = new Flight("6E201", "IndiGo", "Mumbai", "Delhi", 3800.00);
    }

    @Test
    void testAddFlight_success() throws Exception {
        when(flightService.save(any(Flight.class))).thenReturn(flight1);

        mockMvc.perform(post("/api/v1/flights/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(flight1)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.code").value("AI101"))
                .andExpect(jsonPath("$.carrier").value("Air India"));
    }

    @Test
    void testGetAllFlights() throws Exception {
        when(flightService.list()).thenReturn(Arrays.asList(flight1, flight2));

        mockMvc.perform(get("/api/v1/flights/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void testGetByCode_found() throws Exception {
        when(flightService.findByCode("AI101")).thenReturn(flight1);

        mockMvc.perform(get("/api/v1/flights/AI101"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("AI101"));
    }

    @Test
    void testGetByCode_notFound() throws Exception {
        when(flightService.findByCode("XX999"))
                .thenThrow(new FlightNotFoundException("Flight not found with code: XX999"));

        mockMvc.perform(get("/api/v1/flights/XX999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Flight not found with code: XX999"));
    }

    @Test
    void testGetByCarrier() throws Exception {
        when(flightService.findByCarrier("Air India")).thenReturn(List.of(flight1));

        mockMvc.perform(get("/api/v1/flights/carrier/Air India"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void testGetByRoute() throws Exception {
        when(flightService.findByRoute("Mumbai", "Delhi"))
                .thenReturn(Arrays.asList(flight1, flight2));

        mockMvc.perform(get("/api/v1/flights/route")
                        .param("source", "Mumbai")
                        .param("destination", "Delhi"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void testGetByPriceRange() throws Exception {
        when(flightService.findByPriceRange(3000.00, 5000.00))
                .thenReturn(Arrays.asList(flight1, flight2));

        mockMvc.perform(get("/api/v1/flights/price")
                        .param("min", "3000.00")
                        .param("max", "5000.00"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void testDeleteFlight_success() throws Exception {
        mockMvc.perform(delete("/api/v1/flights/AI101"))
                .andExpect(status().isOk())
                .andExpect(content().string("Flight with code AI101 deleted successfully."));
    }

    @Test
    void testDeleteFlight_notFound() throws Exception {
        doThrow(new FlightNotFoundException("Flight not found with code: XX999"))
                .when(flightService).delete("XX999");

        mockMvc.perform(delete("/api/v1/flights/XX999"))
                .andExpect(status().isNotFound());
    }
}
