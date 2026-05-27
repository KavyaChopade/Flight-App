import React, { Component } from 'react';
import FlightCard from '../components/FlightCard';
import FlightRestService from '../services/FlightRestService';

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];

class FindByRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: '',
      destination: '',
      flights: [],
      searched: false,
      warning: '',
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, flights: [], searched: false, warning: '' });
  }

  async handleSearch(e) {
    e.preventDefault();
    const { source, destination } = this.state;
    if (!source || !destination) {
      this.setState({ warning: 'Please select both source and destination.' });
      return;
    }
    if (source === destination) {
      this.setState({ warning: 'Source and destination cannot be the same.' });
      return;
    }
    this.setState({ loading: true, flights: [], warning: '', searched: false });
    try {
      const data = await FlightRestService.getByRoute(source, destination);
      this.setState({ flights: data, loading: false, searched: true });
    } catch (err) {
      this.setState({ warning: err.message, loading: false, searched: true });
    }
  }

  render() {
    const { source, destination, flights, searched, warning, loading } = this.state;

    return (
      <div className="page-container">
        <div className="page-header">
          <h2>Search by Route</h2>
          <p>Find flights between two cities.</p>
        </div>

        <div className="search-bar-card">
          <form onSubmit={this.handleSearch} className="d-flex gap-3 align-items-end flex-wrap">
            <div style={{ flex: 1, minWidth: '160px' }}>
              <label className="form-label">Source City</label>
              <select className="form-select" name="source" value={source} onChange={this.handleChange}>
                <option value="">-- From --</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '160px' }}>
              <label className="form-label">Destination City</label>
              <select className="form-select" name="destination" value={destination} onChange={this.handleChange}>
                <option value="">-- To --</option>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" className="btn-primary-custom" disabled={loading}>
              {loading ? 'Searching…' : '📍 Search'}
            </button>
          </form>
        </div>

        {warning && <div className="alert-warning-custom mb-3">{warning}</div>}

        {loading && (
          <div className="spinner-wrapper">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
          </div>
        )}

        {searched && !loading && flights.length === 0 && !warning && (
          <div className="empty-state">
            <div className="empty-icon">📍</div>
            <p>No flights found for this route.</p>
          </div>
        )}

        {flights.length > 0 && (
          <div className="cards-grid">
            {flights.map((flight) => (
              <FlightCard key={flight.code} flight={flight} showDelete={false} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default FindByRoute;
