package com.rbu.flightservice.repository;

import com.rbu.flightservice.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, String> {

    List<Flight> findByCarrier(String carrier);

    List<Flight> findBySourceAndDestination(String source, String destination);

    List<Flight> findByCostBetween(double min, double max);
}
