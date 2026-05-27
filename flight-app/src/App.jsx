import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddFlight from './pages/AddFlight';
import AllFlights from './pages/AllFlights';
import FindByCode from './pages/FindByCode';
import FindByCarrier from './pages/FindByCarrier';
import FindByRoute from './pages/FindByRoute';
import FindByPrice from './pages/FindByPrice';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/add" element={<AddFlight />} />
          <Route path="/list" element={<AllFlights />} />
          <Route path="/code" element={<FindByCode />} />
          <Route path="/carrier" element={<FindByCarrier />} />
          <Route path="/route" element={<FindByRoute />} />
          <Route path="/price" element={<FindByPrice />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
