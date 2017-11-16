import React from 'react';
import './App.css';
import BusinessList from './components/businesslist/businesslist';
import SearchBar from './components/searchbar/searchbar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar />
        <BusinessList />
      </div>
    );
  }
}

export default App;
