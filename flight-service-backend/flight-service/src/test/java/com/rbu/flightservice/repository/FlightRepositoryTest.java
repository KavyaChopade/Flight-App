package com.rbu.flightservice.repository;

import com.rbu.flightservice.entity.Flight;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class FlightRepositoryTest {

    @Autowired
    private FlightRepository flightRepository;

    @BeforeEach
    void setUp() {
        flightRepository.deleteAll();
        flightRepository.save(new Flight("AI101", "Air India", "Mumbai", "Delhi", 4500.00));
        flightRepository.save(new Flight("AI102", "Air India", "Delhi", "Bangalore", 5200.00));
        flightRepository.save(new Flight("6E201", "IndiGo", "Mumbai", "Delhi", 3800.00));
        flightRepository.save(new Flight("SG301", "SpiceJet", "Chennai", "Kolkata", 4100.00));
    }

    @Test
    void testFindByCarrier_returnsMatchingFlights() {
        List<Flight> results = flightRepository.findByCarrier("Air India");
        assertThat(results).hasSize(2);
        assertThat(results).allMatch(f -> f.getCarrier().equals("Air India"));
    }

    @Test
    void testFindByCarrier_noMatch_returnsEmptyList() {
        List<Flight> results = flightRepository.findByCarrier("GoAir");
        assertThat(results).isEmpty();
    }

    @Test
    void testFindBySourceAndDestination() {
        List<Flight> results = flightRepository.findBySourceAndDestination("Mumbai", "Delhi");
        assertThat(results).hasSize(2);
    }

    @Test
    void testFindByCostBetween() {
        List<Flight> results = flightRepository.findByCostBetween(3500.00, 4500.00);
        assertThat(results).hasSize(3);
    }

    @Test
    void testSaveAndFindById() {
        Flight flight = new Flight("VT401", "Vistara", "Hyderabad", "Pune", 3200.00);
        flightRepository.save(flight);
        assertThat(flightRepository.findById("VT401")).isPresent();
    }

    @Test
    void testDelete() {
        flightRepository.deleteById("AI101");
        assertThat(flightRepository.findById("AI101")).isNotPresent();
    }
}
