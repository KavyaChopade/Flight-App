import React, { Component } from 'react';
import FlightCard from '../components/FlightCard';
import FlightRestService from '../services/FlightRestService';

class FindByPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: '',
      max: '',
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
    const { min, max } = this.state;
    if (min === '' || max === '') {
      this.setState({ warning: 'Please enter both min and max price.' });
      return;
    }
    if (parseFloat(min) > parseFloat(max)) {
      this.setState({ warning: 'Min price cannot exceed max price.' });
      return;
    }
    this.setState({ loading: true, flights: [], warning: '', searched: false });
    try {
      const data = await FlightRestService.getByPriceRange(parseFloat(min), parseFloat(max));
      this.setState({ flights: data, loading: false, searched: true });
    } catch (err) {
      this.setState({ warning: err.message, loading: false, searched: true });
    }
  }

  render() {
    const { min, max, flights, searched, warning, loading } = this.state;

    return (
      <div className="page-container">
        <div className="page-header">
          <h2>Search by Price Range</h2>
          <p>Find flights within a specific cost range (₹).</p>
        </div>

        <div className="search-bar-card">
          <form onSubmit={this.handleSearch} className="d-flex gap-3 align-items-end flex-wrap">
            <div style={{ flex: 1, minWidth: '140px' }}>
              <label className="form-label">Min Price (₹)</label>
              <input
                type="number"
                className="form-control"
                name="min"
                value={min}
                onChange={this.handleChange}
                placeholder="e.g. 2000"
                min="0"
              />
            </div>
            <div style={{ flex: 1, minWidth: '140px' }}>
              <label className="form-label">Max Price (₹)</label>
              <input
                type="number"
                className="form-control"
                name="max"
                value={max}
                onChange={this.handleChange}
                placeholder="e.g. 8000"
                min="0"
              />
            </div>
            <button type="submit" className="btn-primary-custom" disabled={loading}>
              {loading ? 'Searching…' : '💰 Search'}
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
            <div className="empty-icon">💰</div>
            <p>No flights found in this price range.</p>
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

export default FindByPrice;
