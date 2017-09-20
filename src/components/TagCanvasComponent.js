/*global TagCanvas */

import React, {Component} from 'react';

export class TagCanvasComponent extends Component {
  componentDidMount() {
    TagCanvas.Start('myCanvas','tags', {
      textColour: '#ff0000',
      outlineColour: '#ff00ff',
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
          <canvas width="500" height="500" id="myCanvas">
            <p>Anything in here will be replaced on browsers that support the canvas element</p>
            </canvas>
        </div>
        <div id="tags">
        <ul>
          {this.props.words.map((word) => {
            return (
              <li><a href="moods">{word}</a></li>
            );
          })}
        </ul>
      </div>
    </div>
    );
  }
}
