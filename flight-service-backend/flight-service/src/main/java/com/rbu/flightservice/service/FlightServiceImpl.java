package com.rbu.flightservice.service;

import com.rbu.flightservice.entity.Flight;
import com.rbu.flightservice.exception.FlightNotFoundException;
import com.rbu.flightservice.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Override
    public Flight save(Flight flight) {
        return flightRepository.save(flight);
    }

    @Override
    public Flight findByCode(String code) {
        return flightRepository.findById(code)
                .orElseThrow(() -> new FlightNotFoundException("Flight not found with code: " + code));
    }

    @Override
    public List<Flight> findByCarrier(String carrier) {
        List<Flight> flights = flightRepository.findByCarrier(carrier);
        if (flights.isEmpty()) {
            throw new FlightNotFoundException("No flights found for carrier: " + carrier);
        }
        return flights;
    }

    @Override
    public List<Flight> findByRoute(String source, String destination) {
        List<Flight> flights = flightRepository.findBySourceAndDestination(source, destination);
        if (flights.isEmpty()) {
            throw new FlightNotFoundException("No flights found from " + source + " to " + destination);
        }
        return flights;
    }

    @Override
    public List<Flight> findByPriceRange(double min, double max) {
        List<Flight> flights = flightRepository.findByCostBetween(min, max);
        if (flights.isEmpty()) {
            throw new FlightNotFoundException("No flights found in price range: " + min + " - " + max);
        }
        return flights;
    }

    @Override
    public List<Flight> list() {
        return flightRepository.findAll();
    }

    @Override
    public void delete(String code) {
        Flight flight = flightRepository.findById(code)
                .orElseThrow(() -> new FlightNotFoundException("Flight not found with code: " + code));
        flightRepository.delete(flight);
    }
}
