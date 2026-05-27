import React, { Component } from 'react';
import FlightCard from '../components/FlightCard';
import FlightRestService from '../services/FlightRestService';

class AllFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      loading: true,
      error: '',
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const data = await FlightRestService.getAllFlights();
      this.setState({ flights: data, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  handleDelete(code) {
    this.setState((prev) => ({
      flights: prev.flights.filter((f) => f.code !== code),
    }));
  }

  render() {
    const { flights, loading, error } = this.state;

    return (
      <div className="page-container">
        <div className="page-header">
          <h2>All Flights</h2>
          <p>
            {!loading && !error
              ? `${flights.length} flight${flights.length !== 1 ? 's' : ''} registered`
              : 'Fetching all registered flights…'}
          </p>
        </div>

        {error && <div className="alert-error-custom mb-3">{error}</div>}

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
          </div>
        ) : flights.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✈</div>
            <p>No flights found. Add one to get started!</p>
          </div>
        ) : (
          <div className="cards-grid">
            {flights.map((flight) => (
              <FlightCard
                key={flight.code}
                flight={flight}
                onDelete={this.handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default AllFlights;
