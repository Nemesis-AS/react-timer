import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxTime: 10,
      timeLeft: 10,
      timeInput: 0,
      paused: false
    };

    this.setTime = this.setTime.bind(this);
    this.reset = this.reset.bind(this);
    this.stop = this.stop.bind(this);
    this.resume = this.resume.bind(this);
  }

  componentDidMount() {
    this.setTime(10);
    this.resume();
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
    this.setState({paused: true});
  }

  setTime(time) {
    this.setState({maxTime: time, timeLeft: time});
    this.stop();
  }

  resume() {
    if (this.timerID) return
    this.timerID = setInterval(() => this.count(), 1000);
    this.setState({paused: false});
  }

  reset() {
    this.setState({timeLeft: this.state.maxTime});
    this.stop();
  }

  styleTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = time % 60;

    if (time < 60) {
      return `${seconds}`;
    } else if (time < 3600) {
      if (String(seconds).length === 1) seconds = `0${String(seconds)}`;
      return `${minutes}:${seconds}`;
    } else {
      if (String(minutes).length === 1) minutes = `0${String(minutes)}`;
      if (String(seconds).length === 1) seconds = `0${String(seconds)}`;
      return `${hours}:${minutes}:${seconds}`;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="timer">
          <div className="timer-screen">{this.styleTime(this.state.timeLeft)}</div>
          <div className="option-dock">
            <div className="button-section">
              {
                this.state.paused
                ? <button className="option-btn start" onClick={this.resume}>Start</button>
                :<button className="option-btn stop" onClick={this.stop}>Stop</button>
              }
              <button className="option-btn Reset" onClick={this.reset}>Reset</button>
            </div>
            <div className="set-time">
              <input type="number" placeholder="Set Timer Value" value={this.state.timeInput} onChange={e => this.setState({timeInput: e.target.value})} max="86400" />
              <button className="option-btn set-time" onClick={() => this.setTime(this.state.timeInput)}>Set</button>
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
