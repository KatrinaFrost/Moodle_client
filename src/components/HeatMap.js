import React from 'react';
import {Calendar} from 'react-yearly-calendar'

export function HeatMap(props) {
  return ( <Calendar year = {2017} customClasses = {
      (calendarDay) => {
        let entriesToday = props.moodEntries.filter((moodEntry) => {
          // .isSame is moment.js function that compares between two days or dates or months
          return calendarDay.isSame(moodEntry.when, 'day');
        });
        return entriesToday.length ? 'mood-' + entriesToday[0].mood : '';
      }
    } />
  )
}
