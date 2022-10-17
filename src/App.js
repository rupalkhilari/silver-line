import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isFetched: false
    };
  }

  componentDidMount() {
    fetch("https://tinyurl.com/pg-parks")
    .then((data) => (data.json()))
    .then((jsonData) => {
      this.setState({
        data: jsonData,
        isFetched: true
      });
    })
    .catch((error) => {
      console.error("Failed to fetch data" + error);
    })
  }

  displayResults = (event) => {
    // Should have used filter here!
    const filteredData = this.state.data.map((item) => {
      if (item.name.startsWith(event.target.value)) {
        return item;
      }
    });
    console.log(filteredData);
    this.setState({
      data: filteredData
    });
  }

  render() {
    let item;
    if (this.state.isFetched) {
      const rows = this.state.data.map(row => (
        <tr key={row.name}>
          <td><img src={row.photo} width="200" height="200"/></td>
          <td>{row.name}</td>
          <td>{row.location}</td>
          <td>{row.dateFounded}</td>
          <td>{row.area}</td>
          <td>{row.visitors}</td>
        </tr>
      ));
      item = (
        <div>
          <table>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Location</th>
              <th>Date Founded</th>
              <th>Area</th>
              <th>Visitors</th>
            </tr>
            {rows}
          </table>
        </div>
      )
    }
    else {
      item = <div>Loading..</div>
    }

    return (
      <div className="App">
        <input type="text" placeholder="Search for national park" onChange={this.displayResults} />
        {item}
      </div>
    );
  }
}

export default App;
