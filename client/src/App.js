import React, { Component } from 'react';

class App extends Component {
  state = {
    country: 'Dominique',
  }

  render() {
    const { country } = this.state;
    return (
      <div className="App">
        Trivia { country }
      </div>
    );
  }
}

export default App;
