const BASE_URL = 'http://localhost:9090/api/v1/flights';

class FlightRestService {

  async addFlight(flightData) {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flightData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add flight');
    }
    return response.json();
  }

  async getAllFlights() {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch flights');
    }
    return response.json();
  }

  async getByCode(code) {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(code)}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `No flight found with code: ${code}`);
    }
    return response.json();
  }

  async getByCarrier(carrier) {
    const response = await fetch(`${BASE_URL}/carrier/${encodeURIComponent(carrier)}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `No flights found for carrier: ${carrier}`);
    }
    return response.json();
  }

  async getByRoute(source, destination) {
    const response = await fetch(
      `${BASE_URL}/route?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'No flights found for this route');
    }
    return response.json();
  }

  async getByPriceRange(min, max) {
    const response = await fetch(`${BASE_URL}/price?min=${min}&max=${max}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'No flights found in this price range');
    }
    return response.json();
  }

  async deleteFlight(code) {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(code)}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Failed to delete flight: ${code}`);
    }
    return response.text();
  }
}

export default new FlightRestService();
