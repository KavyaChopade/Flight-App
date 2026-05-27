package com.rbu.flightservice.service;

import com.rbu.flightservice.entity.Flight;

import java.util.List;

public interface FlightService {

    Flight save(Flight flight);

    Flight findByCode(String code);

    List<Flight> findByCarrier(String carrier);

    List<Flight> findByRoute(String source, String destination);

    List<Flight> findByPriceRange(double min, double max);

    List<Flight> list();

    void delete(String code);
}
