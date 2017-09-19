import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Diary.css';

const SERVER_PREFIX = 'http://localhost:2000/'

class DiaryEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {entry: ''};
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.setState({ entry: e.target.value })
    // this.props.onInputChange(this.state.entry);
  }

  onSubmit(){
    this.props.addEntry(this.state.entry);
    this.setState({ entry: '' });
  }

  render() {
    return (
      <div className="diary-entry">
        <h1 className="diaryH1">Diary</h1>
        <textArea className="diaryTextArea"
          value={this.state.entry}
          onChange={this.onInputChange} />
          <button className="diaryButton"
            onClick={event => this.onSubmit()}
            onChange={event => this.onInputChange(event.target.value)}
            className="add-entry">
            Add Entry
          </button>
      </div>
    );
  }
}

const EntryList = (props) => {
  const entries = props.entries.map((entry) => {
    return (
      <div className="entry" key={entry.id}>
        <div className="date">{entry.date}</div>
        <div className="note">{entry.note}</div>
      </div>
    );
  });

  return (
    <ul className="">
      {entries}
    </ul>
  );
};

export default class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {},
      entries: []
    };
  }

  onDiaryEntryChange(entry) {
    this.setState({entry});
  }

  addEntry(entry){
    let entriesData = this.state.entries.slice();
    let id = entriesData.length;
    let date = moment().format("MMM Do YY");
    let entryTransformed = { id: id, date: date.toString(), note: entry };
    entriesData.push(entryTransformed);
    this.setState({ entries: entriesData });
  }

  render() {
    return (
      <div className="Diary">
        <DiaryEntry addEntry={(entry) => this.addEntry(entry)} />
        <EntryList entries={this.state.entries} />
      </div>
    );
  }
};
