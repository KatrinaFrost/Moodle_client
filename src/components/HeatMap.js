import React, {Component} from 'react';
import {Calendar} from 'react-yearly-calendar'

function HeatMapCalendar (props) {
  if (!props.calenderView) {
    return null;
  }

  return ( <Calendar year = {2017} customClasses = {
      (calendarDay) => {
        let entriesToday = props.moodEntries.filter((moodEntry) => {
          // .isSame is moment.js function that compares between two days or dates or months
          return calendarDay.isSame(moodEntry.when, 'day');
        });
        return entriesToday.length ? 'mood-' + entriesToday[0].mood : '';
      }
    } />
  );
}

export class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {showCalender: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showCalender: !prevState.showCalender
    }));
  }
  render() {
    return (
      <div className='heat_map_calendar'>
        <button onClick={this.handleToggleClick} >
          {this.state.showCalender ? 'Hide Moods Calendar' : 'Get an overview of your mood'}
        </button>
        <HeatMapCalendar calenderView={this.state.showCalender} moodEntries={this.props.moodEntries}/>
      </div>
    );
  }
}
