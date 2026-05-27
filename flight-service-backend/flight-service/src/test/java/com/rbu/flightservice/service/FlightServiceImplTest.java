package com.rbu.flightservice.service;

import com.rbu.flightservice.entity.Flight;
import com.rbu.flightservice.exception.FlightNotFoundException;
import com.rbu.flightservice.repository.FlightRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FlightServiceImplTest {

    @Mock
    private FlightRepository flightRepository;

    @InjectMocks
    private FlightServiceImpl flightService;

    private Flight flight1;
    private Flight flight2;

    @BeforeEach
    void setUp() {
        flight1 = new Flight("AI101", "Air India", "Mumbai", "Delhi", 4500.00);
        flight2 = new Flight("6E201", "IndiGo", "Mumbai", "Delhi", 3800.00);
    }

    @Test
    void testSave() {
        when(flightRepository.save(flight1)).thenReturn(flight1);
        Flight saved = flightService.save(flight1);
        assertThat(saved.getCode()).isEqualTo("AI101");
        verify(flightRepository, times(1)).save(flight1);
    }

    @Test
    void testFindByCode_found() {
        when(flightRepository.findById("AI101")).thenReturn(Optional.of(flight1));
        Flight result = flightService.findByCode("AI101");
        assertThat(result.getCarrier()).isEqualTo("Air India");
    }

    @Test
    void testFindByCode_notFound_throwsException() {
        when(flightRepository.findById("XX999")).thenReturn(Optional.empty());
        assertThrows(FlightNotFoundException.class, () -> flightService.findByCode("XX999"));
    }

    @Test
    void testFindByCarrier_found() {
        when(flightRepository.findByCarrier("Air India")).thenReturn(List.of(flight1));
        List<Flight> results = flightService.findByCarrier("Air India");
        assertThat(results).hasSize(1);
    }

    @Test
    void testFindByCarrier_notFound_throwsException() {
        when(flightRepository.findByCarrier("GoAir")).thenReturn(Collections.emptyList());
        assertThrows(FlightNotFoundException.class, () -> flightService.findByCarrier("GoAir"));
    }

    @Test
    void testFindByRoute_found() {
        when(flightRepository.findBySourceAndDestination("Mumbai", "Delhi"))
                .thenReturn(Arrays.asList(flight1, flight2));
        List<Flight> results = flightService.findByRoute("Mumbai", "Delhi");
        assertThat(results).hasSize(2);
    }

    @Test
    void testFindByRoute_notFound_throwsException() {
        when(flightRepository.findBySourceAndDestination("Pune", "Kolkata"))
                .thenReturn(Collections.emptyList());
        assertThrows(FlightNotFoundException.class, () -> flightService.findByRoute("Pune", "Kolkata"));
    }

    @Test
    void testFindByPriceRange_found() {
        when(flightRepository.findByCostBetween(3000.00, 5000.00))
                .thenReturn(Arrays.asList(flight1, flight2));
        List<Flight> results = flightService.findByPriceRange(3000.00, 5000.00);
        assertThat(results).hasSize(2);
    }

    @Test
    void testList() {
        when(flightRepository.findAll()).thenReturn(Arrays.asList(flight1, flight2));
        List<Flight> results = flightService.list();
        assertThat(results).hasSize(2);
    }

    @Test
    void testDelete_found() {
        when(flightRepository.findById("AI101")).thenReturn(Optional.of(flight1));
        flightService.delete("AI101");
        verify(flightRepository, times(1)).delete(flight1);
    }

    @Test
    void testDelete_notFound_throwsException() {
        when(flightRepository.findById("XX999")).thenReturn(Optional.empty());
        assertThrows(FlightNotFoundException.class, () -> flightService.delete("XX999"));
    }
}
