# ✈ Flight Management App

A full-stack Flight Management System built with **Spring Boot** (backend) and **React** (frontend), allowing users to add, view, search, and delete flight records.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17, Spring Boot 3.2, Spring Data JPA, Hibernate |
| Database | MySQL 8 |
| API Docs | SpringDoc OpenAPI (Swagger UI) |
| Frontend | React 18, Vite, React Router v6 |
| Styling | Bootstrap 5 (CDN) |
| Build Tool | Maven |

---

## 📁 Project Structure

```
Flight-App/
├── flight-app/                          ← React Frontend
│   ├── index.html                       ← Bootstrap 5 loaded via CDN
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── FlightCard.jsx
│       ├── pages/
│       │   ├── AddFlight.jsx
│       │   ├── AllFlights.jsx
│       │   ├── FindByCode.jsx
│       │   ├── FindByCarrier.jsx
│       │   ├── FindByRoute.jsx
│       │   └── FindByPrice.jsx
│       └── services/
│           └── FlightRestService.js     ← All API calls centralized here
│
└── flight-service-backend/
    └── flight-service/                  ← Spring Boot Backend
        ├── pom.xml
        ├── Dockerfile
        └── src/main/java/com/rbu/
            ├── config/
            │   └── CorsConfig.java
            └── flightservice/
                ├── FlightServiceApplication.java
                ├── controller/FlightRestController.java
                ├── entity/Flight.java
                ├── exception/
                │   ├── FlightNotFoundException.java
                │   └── GlobalExceptionHandler.java
                ├── repository/FlightRepository.java
                └── service/
                    ├── FlightService.java
                    └── FlightServiceImpl.java
```

---

## ✈ Flight Entity

| Field | Type | Description |
|-------|------|-------------|
| `code` | String (PK) | Unique flight code e.g. `AI101` |
| `carrier` | String | Airline name e.g. `Air India` |
| `source` | String | Departure city |
| `destination` | String | Arrival city |
| `cost` | double | Ticket price in ₹ |

---

## 🔗 API Endpoints

Base URL: `http://localhost:9090/api/v1/flights`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add` | Add a new flight |
| GET | `/all` | Get all flights |
| GET | `/{code}` | Find flight by code |
| GET | `/carrier/{carrier}` | Find flights by carrier |
| GET | `/route?source=X&destination=Y` | Find flights by route |
| GET | `/price?min=X&max=Y` | Find flights by price range |
| DELETE | `/{code}` | Delete a flight |

Swagger UI available at: `http://localhost:9090/swagger-ui.html`

---

## ⚙️ Prerequisites

- Java JDK 17+
- Apache Maven 3.8+
- MySQL 8+
- Node.js 18+
- npm 9+
- Eclipse IDE (or IntelliJ)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/KavyaChopade/Flight-App.git
cd Flight-App
```

### 2. MySQL Database Setup

Open MySQL Workbench and run:

```sql
CREATE DATABASE IF NOT EXISTS training;
```

### 3. Configure Backend

Open the file:
```
flight-service-backend/flight-service/src/main/resources/application.properties
```

Update your MySQL password:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 4. Run the Backend

```bash
cd flight-service-backend/flight-service
mvn spring-boot:run
```

Backend starts at: `http://localhost:9090`

### 5. Run the Frontend

Open a new terminal:

```bash
cd flight-app
npm install
npm run dev
```

Frontend starts at: `http://localhost:5173`

---

## 🖥️ Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| Add Flight | `/add` | Form to register a new flight |
| All Flights | `/list` | View all flights as cards with delete option |
| Find by Code | `/code` | Search a single flight by its code |
| Find by Carrier | `/carrier` | View all flights of a selected airline |
| Find by Route | `/route` | Search flights between two cities |
| Find by Price | `/price` | Search flights within a price range |

---

## 🧪 Running Tests

```bash
cd flight-service-backend/flight-service
mvn test
```

Tests included for:
- Repository layer (DataJpaTest + H2 in-memory DB)
- Service layer (Mockito)
- Controller layer (MockMvc)

---

## 🔧 CORS Configuration

The backend allows requests from `http://localhost:5173` via `CorsConfig.java`.

If you see CORS errors, add this annotation to `FlightRestController.java`:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

---

## 📸 Sample Data

Use the Add Flight form or Swagger UI to insert test data:

```json
{ "code": "AI101", "carrier": "Air India", "source": "Mumbai", "destination": "Delhi", "cost": 4500.00 }
{ "code": "6E201", "carrier": "IndiGo", "source": "Mumbai", "destination": "Delhi", "cost": 3800.00 }
{ "code": "SG301", "carrier": "SpiceJet", "source": "Chennai", "destination": "Kolkata", "cost": 4100.00 }
{ "code": "UK401", "carrier": "Vistara", "source": "Delhi", "destination": "Bangalore", "cost": 5200.00 }
{ "code": "G8501", "carrier": "GoAir", "source": "Hyderabad", "destination": "Pune", "cost": 3200.00 }
```

---

## 👩‍💻 Author

**Kavya Chopade**  
GitHub: [@KavyaChopade](https://github.com/KavyaChopade)
