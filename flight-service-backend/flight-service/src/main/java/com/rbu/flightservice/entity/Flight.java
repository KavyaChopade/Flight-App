package com.rbu.flightservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "flights")
public class Flight {

    @Id
    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String carrier;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private double cost;

    // No-args constructor
    public Flight() {}

    // All-args constructor
    public Flight(String code, String carrier, String source, 
                  String destination, double cost) {
        this.code = code;
        this.carrier = carrier;
        this.source = source;
        this.destination = destination;
        this.cost = cost;
    }

    // Getters
    public String getCode() { return code; }
    public String getCarrier() { return carrier; }
    public String getSource() { return source; }
    public String getDestination() { return destination; }
    public double getCost() { return cost; }

    // Setters
    public void setCode(String code) { this.code = code; }
    public void setCarrier(String carrier) { this.carrier = carrier; }
    public void setSource(String source) { this.source = source; }
    public void setDestination(String destination) { this.destination = destination; }
    public void setCost(double cost) { this.cost = cost; }

    @Override
    public String toString() {
        return "Flight{code='" + code + "', carrier='" + carrier + 
               "', source='" + source + "', destination='" + destination + 
               "', cost=" + cost + "}";
    }
}