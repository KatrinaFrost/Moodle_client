import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

// TO RUN: rails server -p 5000
const SERVER_URL = 'http://localhost:5000/flights.json';


// <FlightsList />
class FlightsList extends Component {
  render() {
    return (
      <div>
        { this.props.flights.map( (f) => <p key={f.id}>{"From"} {f.origin} {"to"} {f.destination} </p> ) }
      </div>
    );
  }
}


class Flights extends Component {
  constructor(props){
    super(props);
    this.state = { flight: [] };

    const fetchFlight = () => {
      axios.get(SERVER_URL).then(function(results) {
        console.log(results);
        this.setState({flight: results.data});
      }.bind(this));
      setTimeout( fetchFlight, 5000 );
    }
    fetchFlight();
  }

  render() {
    return (
      <div>
        <h1>Book Your Flight here</h1>
        <FlightsList flights={this.state.flight} />
      </div>
    )
  }
}


export default Flights;
