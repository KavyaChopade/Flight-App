package com.rbu.flightservice.controller;

import com.rbu.flightservice.entity.Flight;
import com.rbu.flightservice.service.FlightService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/flights")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Flight API", description = "Endpoints for flight management")
public class FlightRestController {

    @Autowired
    private FlightService flightService;

    @PostMapping("/add")
    @Operation(summary = "Add a new flight")
    public ResponseEntity<Flight> addFlight(@RequestBody Flight flight) {
        Flight saved = flightService.save(flight);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    @Operation(summary = "Get all flights")
    public ResponseEntity<List<Flight>> getAllFlights() {
        List<Flight> flights = flightService.list();
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }

    @GetMapping("/{code}")
    @Operation(summary = "Find flight by code")
    public ResponseEntity<Flight> getByCode(@PathVariable String code) {
        Flight flight = flightService.findByCode(code);
        return new ResponseEntity<>(flight, HttpStatus.OK);
    }

    @GetMapping("/carrier/{carrier}")
    @Operation(summary = "Find flights by carrier")
    public ResponseEntity<List<Flight>> getByCarrier(@PathVariable String carrier) {
        List<Flight> flights = flightService.findByCarrier(carrier);
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }

    @GetMapping("/route")
    @Operation(summary = "Find flights by route (source and destination)")
    public ResponseEntity<List<Flight>> getByRoute(
            @RequestParam String source,
            @RequestParam String destination) {
        List<Flight> flights = flightService.findByRoute(source, destination);
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }

    @GetMapping("/price")
    @Operation(summary = "Find flights by price range")
    public ResponseEntity<List<Flight>> getByPriceRange(
            @RequestParam double min,
            @RequestParam double max) {
        List<Flight> flights = flightService.findByPriceRange(min, max);
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }

    @DeleteMapping("/{code}")
    @Operation(summary = "Delete a flight by code")
    public ResponseEntity<String> deleteFlight(@PathVariable String code) {
        flightService.delete(code);
        return new ResponseEntity<>("Flight with code " + code + " deleted successfully.", HttpStatus.OK);
    }
}
