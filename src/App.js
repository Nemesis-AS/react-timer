import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxTime: 10,
      timeLeft: 10,
      timeInput: 0
    };

    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
    this.stop = this.stop.bind(this);
    this.resume = this.resume.bind(this);
  }

  componentDidMount() {
    this.start(10);
  }

  count() {
    this.setState({timeLeft: this.state.timeLeft - 1});
    if (this.state.timeLeft <= 0) {
      this.setState({timeLeft: 0});
      this.stop();
    }
  }

  stop() {
    clearInterval(this.timerID);
    this.timerID = null;
  }

  start(time) {
    this.setState({maxTime: time, timeLeft: time});
    if (this.timerID) clearInterval(this.timerID);
    this.timerID = setInterval(() => this.count(), 1000);
  }

  resume() {
    if (this.timerID) return
    this.timerID = setInterval(() => this.count(), 1000);
  }

  reset() {
    this.setState({timeLeft: this.state.maxTime});
    this.resume();
  }

  render() {
    return (
      <div className="App">
        <div className="timer">
          <div className="timer-screen">{this.state.timeLeft}</div>
          <div className="option-dock">
            <div className="button-section">
              <button className="option-btn start" onClick={this.resume}>Start</button>
              <button className="option-btn stop" onClick={this.stop}>Stop</button>
              <button className="option-btn Reset" onClick={this.reset}>Reset</button>
            </div>
            <div className="set-time">
              <input type="number" placeholder="Set Timer Value" value={this.state.timeInput} onChange={e => this.setState({timeInput: e.target.value})} />
              <button className="option-btn set-time" onClick={() => this.start(this.state.timeInput)}>Set</button>
            </div>
          </div>
        </div>
        <div className="footer">
          Made by <a href="https://github.com/Nemesis-AS">Nemesis&trade;</a> using <a href="https://reactjs.org">ReactJS</a>
        </div>
      </div>
    );
  }
}

export default App;
