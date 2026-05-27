import React, { Component } from 'react';
import FlightCard from '../components/FlightCard';
import FlightRestService from '../services/FlightRestService';

class FindByCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      flight: null,
      warning: '',
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({ code: e.target.value, flight: null, warning: '' });
  }

  async handleSearch(e) {
    e.preventDefault();
    const { code } = this.state;
    if (!code.trim()) {
      this.setState({ warning: 'Please enter a flight code.' });
      return;
    }
    this.setState({ loading: true, flight: null, warning: '' });
    try {
      const data = await FlightRestService.getByCode(code.trim().toUpperCase());
      this.setState({ flight: data, loading: false });
    } catch (err) {
      this.setState({ warning: err.message, loading: false });
    }
  }

  render() {
    const { code, flight, warning, loading } = this.state;

    return (
      <div className="page-container">
        <div className="page-header">
          <h2>Search by Code</h2>
          <p>Enter a flight code to look up its details.</p>
        </div>

        <div className="search-bar-card">
          <form onSubmit={this.handleSearch} className="d-flex gap-3 align-items-end flex-wrap">
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label className="form-label">Flight Code</label>
              <input
                type="text"
                className="form-control"
                value={code}
                onChange={this.handleChange}
                placeholder="e.g. AI101"
              />
            </div>
            <button type="submit" className="btn-primary-custom" disabled={loading}>
              {loading ? 'Searching…' : '🔍 Search'}
            </button>
          </form>
        </div>

        {warning && <div className="alert-warning-custom mb-3">{warning}</div>}

        {flight && (
          <div style={{ maxWidth: '320px' }}>
            <FlightCard flight={flight} showDelete={false} />
          </div>
        )}
      </div>
    );
  }
}

export default FindByCode;
