import React, { Component } from 'react';
import sentiment from 'sentiment';

class checkWords extends Component {
  const _sentiment = sentiment(sentimentEntry);
  const _score = _sentiment.score;
  this.setState ({
    score: _score
  });
  console.log('event recieved', _score);
};

export default scoreWords;
