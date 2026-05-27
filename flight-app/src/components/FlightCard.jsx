import React, { Component } from 'react';
import FlightRestService from '../services/FlightRestService';

class FlightCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleting: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete() {
    const { flight, onDelete } = this.props;
    if (!window.confirm(`Delete flight ${flight.code}?`)) return;
    this.setState({ deleting: true });
    try {
      await FlightRestService.deleteFlight(flight.code);
      if (onDelete) onDelete(flight.code);
    } catch (err) {
      alert('Error deleting flight: ' + err.message);
      this.setState({ deleting: false });
    }
  }

  render() {
    const { flight, showDelete } = this.props;
    const { deleting } = this.state;

    return (
      <div className="flight-card">
        <div className="flight-code">{flight.code}</div>
        <div className="flight-carrier">✈ {flight.carrier}</div>
        <div className="divider" />
        <div className="flight-meta">
          <span>📍</span>
          <span className="route-arrow">
            <span>{flight.source}</span>
            <span className="arrow">→</span>
            <span>{flight.destination}</span>
          </span>
        </div>
        <div className="flight-cost">
          💰 ₹{flight.cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>
        {showDelete !== false && (
          <button
            className="btn-danger-custom w-100"
            onClick={this.handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting…' : '🗑 Delete'}
          </button>
        )}
      </div>
    );
  }
}

export default FlightCard;
