/*global TagCanvas */

import React, {Component} from 'react';

export class TagCanvasComponent extends Component {
  componentDidMount() {
    TagCanvas.Start('myCanvas','tags', {
      textColour: '#16a085',
      outlineColour: '#69b26b',
      reverse: true,
      depth: 0.8,
      maxSpeed: 0.05
    });
  }

  componentDidUpdate() {
    TagCanvas.Reload('myCanvas');
  }

  render (){
    return (
      <div className='wrapper'>
        <div id="myCanvasContainer">
          <canvas width="700" height="700" id="myCanvas">
            <p>Anything in here will be replaced on browsers that support the canvas element</p>
            </canvas>
        </div>
        <div id="tags">
        <ul>
          {this.props.words.map((word) => {
            return (
              <li key={word}><a href="moods">{word}</a></li>
            );
          })}
        </ul>
      </div>
    </div>
    );
  }
}
