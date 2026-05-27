import React, { Component } from 'react';
import FlightRestService from '../services/FlightRestService';

const CARRIERS = ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'GoAir'];
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];

class AddFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      carrier: '',
      source: '',
      destination: '',
      cost: '',
      successMsg: '',
      errorMsg: '',
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, successMsg: '', errorMsg: '' });
  }

  clearForm() {
    this.setState({
      code: '',
      carrier: '',
      source: '',
      destination: '',
      cost: '',
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { code, carrier, source, destination, cost } = this.state;

  // Explicit individual field checks with clear messages
    if (!code || !code.trim()) {
      this.setState({ errorMsg: 'Flight code is required.', successMsg: '' });
      return;
    }
    if (!carrier) {
      this.setState({ errorMsg: 'Please select a carrier.', successMsg: '' });
      return;
    }
    if (!source) {
      this.setState({ errorMsg: 'Please select a source city.', successMsg: '' });
      return;
    }
    if (!destination) {
      this.setState({ errorMsg: 'Please select a destination city.', successMsg: '' });
      return;
    }
    if (!cost) {
      this.setState({ errorMsg: 'Please enter the cost.', successMsg: '' });
      return;
    }
    if (source === destination) {
      this.setState({ errorMsg: 'Source and destination cannot be the same.', successMsg: '' });
      return;
    }

    const flightData = {
      code: String(code).trim().toUpperCase(),
      carrier: String(carrier).trim(),
      source: String(source).trim(),
      destination: String(destination).trim(),
      cost: parseFloat(cost),
    };

  // Log to confirm what is being sent
    console.log('Sending flight data:', JSON.stringify(flightData));

    this.setState({ loading: true, successMsg: '', errorMsg: '' });
    try {
      await FlightRestService.addFlight(flightData);
      this.setState({
        successMsg: `Flight ${flightData.code} added successfully!`,
        loading: false,
      });
      this.clearForm();
    } catch (err) {
      this.setState({ errorMsg: err.message || 'Failed to add flight.', loading: false });
    }
  }

  render() {
    const { code, carrier, source, destination, cost, successMsg, errorMsg, loading } = this.state;

    return (
      <div className="page-container">
        <div className="page-header">
          <h2>Add New Flight</h2>
          <p>Fill in the details below to register a new flight route.</p>
        </div>

        {successMsg && (
          <div className="alert-success-custom mb-3">{successMsg}</div>
        )}
        {errorMsg && (
          <div className="alert-error-custom mb-3">{errorMsg}</div>
        )}

        <div className="form-card">
          <form onSubmit={this.handleSubmit} noValidate>
            {/* Flight Code */}
            <div className="mb-3">
              <label className="form-label">Flight Code</label>
              <input
                type="text"
                className="form-control"
                name="code"
                value={code}
                onChange={this.handleChange}
                placeholder="e.g. AI101"
              />
            </div>

            {/* Carrier */}
            <div className="mb-3">
              <label className="form-label">Carrier (Airline)</label>
              <select
                className="form-select"
                name="carrier"
                value={carrier}
                onChange={this.handleChange}
              >
                <option value="">-- Select Carrier --</option>
                {CARRIERS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div className="mb-3">
              <label className="form-label">Source City</label>
              <select
                className="form-select"
                name="source"
                value={source}
                onChange={this.handleChange}
              >
                <option value="">-- Select Source --</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div className="mb-3">
              <label className="form-label">Destination City</label>
              <select
                className="form-select"
                name="destination"
                value={destination}
                onChange={this.handleChange}
              >
                <option value="">-- Select Destination --</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Cost */}
            <div className="mb-4">
              <label className="form-label">Cost (₹)</label>
              <input
                type="number"
                className="form-control"
                name="cost"
                value={cost}
                onChange={this.handleChange}
                placeholder="e.g. 4500"
                min="0"
                step="0.01"
              />
            </div>

            <button
              type="submit"
              className="btn-primary-custom w-100"
              disabled={loading}
            >
              {loading ? 'Saving…' : '✈ Add Flight'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddFlight;
