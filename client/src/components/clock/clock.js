import React, { Component } from "react";
import { connect } from "react-redux";
import Clock from "react-clock";
import "./Clock.css";
import TimePicker from "react-time-picker";

class Watch extends Component {
  componentDidMount() {
    setInterval(() => this.props.updateState(), 1000);
  }
  render() {
    let assignedClass = "Page";

    let HH, MM, HHMM, CT;
    CT = this.props.time;
    HH = CT.getHours();
    MM = CT.getMinutes();
    HHMM = MM > 10 ? Number("" + HH + MM) : Number("" + HH + 0 + MM);
    HHMM = HH > 10 ? Number("" + HH + MM) : Number("" + 0 + HH + MM);
    if (this.props.alarmTime) {
      let hhmm, AT, arr;
      AT = this.props.alarmTime;
      arr = AT.split(":");
      hhmm = Number(arr[0] + arr[1]);
      if (HHMM >= hhmm) {
        assignedClass = ["Page", "Alert"].join(" ");
      }
    }

    return (
      <div className={assignedClass}>
        <h4>
          Current Time: <span>{this.props.time.toLocaleTimeString()}</span>
        </h4>
        <Clock
          className="Watch"
          hourHandLength={70}
          minuteHandLength={80}
          secondHandLength={85}
          hourHandOppositeLength={18}
          value={this.props.time}
          hourMarksLength={10}
          size={400}
        />
        <span>Alarm Time</span>
        <TimePicker
          value={this.props.alarmTime}
          onChange={this.props.updateAlarm}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    time: state.date,
    alarmTime: state.alarmTime
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateState: () => dispatch({ type: "SET_TIME" }),
    updateAlarm: time => dispatch({ type: "SET_ALARM", time })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Watch);
