import React, { Component } from 'react';
import FlightCard from '../components/FlightCard';
import FlightRestService from '../services/FlightRestService';

const CARRIERS = ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'GoAir'];

class FindByCarrier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carrier: '',
      flights: [],
      searched: false,
      warning: '',
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({ carrier: e.target.value, flights: [], searched: false, warning: '' });
  }

  async handleSearch(e) {
    e.preventDefault();
    const { carrier } = this.state;
    if (!carrier) {
      this.setState({ warning: 'Please select a carrier.' });
      return;
    }
    this.setState({ loading: true, flights: [], warning: '', searched: false });
    try {
      const data = await FlightRestService.getByCarrier(carrier);
      this.setState({ flights: data, loading: false, searched: true });
    } catch (err) {
      this.setState({ warning: err.message, loading: false, searched: true });
    }
  }

  render() {
    const { carrier, flights, searched, warning, loading } = this.state;

    return (
      <div className="page-container">
        <div className="page-header">
          <h2>Search by Carrier</h2>
          <p>Select an airline to view all its flights.</p>
        </div>

        <div className="search-bar-card">
          <form onSubmit={this.handleSearch} className="d-flex gap-3 align-items-end flex-wrap">
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label className="form-label">Airline / Carrier</label>
              <select className="form-select" value={carrier} onChange={this.handleChange}>
                <option value="">-- Select Carrier --</option>
                {CARRIERS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-primary-custom" disabled={loading}>
              {loading ? 'Searching…' : '✈ Search'}
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
            <div className="empty-icon">✈</div>
            <p>No flights found for this carrier.</p>
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

export default FindByCarrier;
