import React from "react";

import "./index.css";

const tetrisBoard = Array(20)
  .fill(0)
  .map(y => {
    return Array(20).fill(0);
  });

var initialState = {
  shapePositions: [
    [
      // tPositions
      [
        { x: 9, y: 0 },
        { x: 10, y: 0 },
        { x: 11, y: 0 },
        { x: 10, y: 1 }
      ],
      [ 
        { x: 11, y: 0 },
        { x: 10, y: 1 },
        { x: 11, y: 1 },
        { x: 11, y: 2 }
      ],
      [
        { x: 10, y: 0 },
        { x: 9, y: 1 },
        { x: 10, y: 1 },
        { x: 11, y: 1 }
      ],
      [
        { x: 9, y: 0 },
        { x: 10, y: 1 },
        { x: 9, y: 1 },
        { x: 9, y: 2 }
      ]
    ], 
    [
      // lPositions 
      [
        { x: 10, y: 0 },
        { x: 11, y: 0 },
        { x: 10, y: 1 },
        { x: 10, y: 2 }
      ],
      [
        { x: 11, y: 0 },
        { x: 11, y: 1 },
        { x: 10, y: 0 },
        { x: 9, y: 0 }
      ],
      [
        { x: 11, y: 0 },
        { x: 11, y: 1 },
        { x: 11, y: 2 },
        { x: 10, y: 0 }
      ],
      [
        { x: 9, y: 0 },
        { x: 9, y: 1 },
        { x: 10, y: 1 },
        { x: 11, y: 1 }
      ],
    ],
    [
      // lPositions2 
      [
        { x: 9, y: 0 },
        { x: 10, y: 0 },
        { x: 10, y: 1 },
        { x: 10, y: 2 }
      ],
      [
        { x: 11, y: 1 },
        { x: 11, y: 0 },
        { x: 10, y: 1 },
        { x: 9, y: 1 }
      ],
      [
        { x: 10, y: 0 },
        { x: 10, y: 1 },
        { x: 10, y: 2 },
        { x: 11, y: 2 }
      ],
      [
        { x: 9, y: 1 },
        { x: 9, y: 0 },
        { x: 10, y: 0 },
        { x: 11, y: 0 }
      ],
    ],
    [
      // iPositions
      [
        { x: 10, y: 0 },
        { x: 10, y: 1 },
        { x: 10, y: 2 },
        { x: 10, y: 3 }
      ],
      [
        { x: 8, y: 0 },
        { x: 19, y: 0 },
        { x: 10, y: 0 },
        { x: 11, y: 0 }
      ]  
    ],
    [
      // zPositions1
      [
        { x: 10, y: 0 },
        { x: 11, y: 0 },
        { x: 11, y: 1 },
        { x: 12, y: 1 }
      ],
      [
        { x: 11, y: 0 },
        { x: 11, y: 1 },
        { x: 10, y: 1 },
        { x: 10, y: 2 }
      ],     
    ],
    [
      // zPositions2
      [
        { x: 10, y: 0 },
        { x: 11, y: 0 },
        { x: 10, y: 1 },
        { x: 9, y: 1 }
      ],
      [
        { x: 10, y: 0 },
        { x: 10, y: 1 },
        { x: 11, y: 1 },
        { x: 11, y: 2 }
      ],     
    ],
    [
      // squarePositions
      [
        { x: 10, y: 0 },
        { x: 11, y: 0 },
        { x: 10, y: 1 },
        { x: 11, y: 1 }
      ]
    ]
  ],
  currentShape: [],
  currentShapeIndex: 0,
  buildUp: [],
  paused: false,
  gameOver: false,
  score: 0,
  level: 0
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { ...initialState };
  }

  componentDidMount() {
    this.setState({
      velocity: setInterval(this.moveShapes, 400)
    });

    this.randomizeShape();
    window.addEventListener("keydown", this.redirectShapes);
  }

  rotateShapes = e => {
    var shape = JSON.parse(JSON.stringify(this.state.currentShape));
    if (e.shiftKey) {
      return;
    }
  }

  redirectShapes = event => {
    var shape = this.state.currentShape;
    var buildUp = this.state.buildUp;
    // console.log("arrow");

    var shapeStopXRight = shape.some(coords => {
      const shapeLimit = buildUp.some(buildUpCoords => {
        return ((buildUpCoords.x === (coords.x + 1) && buildUpCoords.y === (coords.y + 1)) ) 
      })
      if (shapeLimit || coords.x === 19 ) return true;
      else return false;
    });

    var shapeStopXLeft = shape.some(coords => {
      const shapeLimit = buildUp.some(buildUpCoords => {
        return ((buildUpCoords.x === (coords.x + 1) && buildUpCoords.y === (coords.y + 1)) ) 
      })
      if (shapeLimit  || coords.x === 0) return true;
      else return false;
    });
  
    if (event.key === "d" || event.key === "ArrowRight") {
      if (!shapeStopXRight) {
        shape.map(coord => {
          coord.x++;
          return coord
        })
      }
    } else if (event.key === "a" || event.key === "ArrowLeft") {
      if (!shapeStopXLeft) {
        shape.map(coord => {
          coord.x--;
          return coord
        })
      }
    }
    //  else return;

    this.setState({
      shape
    });
  };

  randomizeShape = () => {
    var random = Math.floor(Math.random() * 7);
    // console.log(random);
    // var currentShape = " ";
    // if (random === 0) {
    //   currentShape = "tPositions";
    // } else if (random === 1) {
    //   currentShape = "lPositions";
    // } else if (random === 2) {
    //   currentShape = "iPositions";
    // } else if (random === 3) {
    //   currentShape = "zPositions";
    // } else if (random === 4) {
    //   currentShape = "cornerPositions";
    // } else if (random === 5) {
    //   currentShape = "squarePositions";
    // }
    console.log(...this.state.shapePositions[random])

    this.setState({
      currentShape: [...this.state.shapePositions[random]]
    })
  }

  moveShapes = () => { 
  // if(this.state.currentShape.length < 1) return;
    // if(this.state.currentShape === undefined) {
    //   this.randomizeShape();
    // }
    console.log(this.state.currentShape[0])
    var shapePositions = this.state.currentShape;
    var shape = JSON.parse(JSON.stringify(this.state.currentShape[this.state.currentShapeIndex]));
    var buildUp = this.state.buildUp;
    var limit = () => { 
      return shape.some( coords => {
        const shapeLimit = buildUp.some(buildUpCoords => {
          return (buildUpCoords.x === coords.x && buildUpCoords.y === (coords.y + 1) && coords.y !== 19) 
        })
        if (shapeLimit) return true;
        else return false;
      }) 
    } 
    console.log(shape)
    var shapeStopY = shape.some(coords => {
               return limit() === true || coords.y === 19
              }) 

    var gameOver = buildUp.some(coords => {
      return coords.y === 0
    })
  
    if (!gameOver) {
      if (!shapeStopY) {
        var newShape = shapePositions.map(position => {
          position.map(coord => {
            coord.y++;
            return coord;
          })
          // nu merge return coord.y++ ca imi returna doar y
        })
        this.setState({
          currentShape: newShape
        })
      } else {
        buildUp.push(...shape);
        this.setState({
          buildUp
        })
        this.randomizeShape();
      }
    } else {  
      clearInterval(this.state.velocity)

      this.setState({
        gameOver: true
      })
    }
  }

  getClassName = (indexX, indexY) => {
    var currentShape = this.state.currentShape[this.state.currentShapeIndex];
    var buildUp = this.state.buildUp
    var isShape = currentShape && currentShape.some(coords => {
      return (
        coords.x === indexX &&
        coords.y === indexY 
      )
    })

    var isBuildUp = buildUp.some(coords => {
      return (
        coords.x === indexX &&
        coords.y === indexY 
      )
    })

    if (isShape) {
      return 'shapeStyle'
    } else if(isBuildUp) {
      return 'buildUp'
    }
    else {
      return 'mapCell'
    }
    // var tShape = this.state.shapePositions.tPositions.some(element => {
    //   return (
    //     element.x === indexX &&
    //     element.y === indexY &&
    //     currentShape === "tPositions"
    //   );
    // });
    // var tPositions = this.state.shapePositions.tPositions;

    // var lShape = this.state.shapePositions.lPositions.some(element => {
    //   return (
    //     element.x === indexX &&
    //     element.y === indexY &&
    //     currentShape === "lPositions"
    //   );
    // });
    // var lPositions = this.state.shapePositions.lPositions;

    // var iShape = this.state.shapePositions.iPositions.some(element => {
    //   return (
    //     element.x === indexX &&
    //     element.y === indexY &&
    //     currentShape === "iPositions"
    //   );
    // });
    // var iPositions = this.state.shapePositions.iPositions;

    // var squareShape = this.state.shapePositions.squarePositions.some(
    //   element => {
    //     return (
    //       element.x === indexX &&
    //       element.y === indexY &&
    //       currentShape === "squarePositions"
    //     );
    //   }
    // );
    // var squarePositions = this.state.shapePositions.squarePositions;

    // var zShape = this.state.shapePositions.zPositions.some(element => {
    //   return (
    //     element.x === indexX &&
    //     element.y === indexY &&
    //     currentShape === "zPositions"
    //   );
    // });
    // var zPositions = this.state.shapePositions.zPositions;

    // var cornerShape = this.state.shapePositions.cornerPositions.some(
    //   element => {
    //     return (
    //       element.x === indexX &&
    //       element.y === indexY &&
    //       currentShape === "cornerPositions"
    //     );
    //   }
    // );
    // var cornerPositions = this.state.shapePositions.cornerPositions;

    // if (tShape) {
    //   return "tShapeStyle shapeStyle";
    // } else if (lShape) {
    //   return "lShapeStyle shapeStyle";
    // } else if (iShape) {
    //   return "iShapeStyle shapeStyle";
    // } else if (zShape) {
    //   return "zShapeStyle shapeStyle";
    // } else if (squareShape) {
    //   return "squareShapeStyle shapeStyle";
    // } else if (cornerShape) {
    //   return "cornerShapeStyle shapeStyle";
    // }
    // return "mapCell";
  };

  restartGame = () => {
    clearInterval(this.state.velocity)
    this.randomizeShape();  
    this.moveShapes();

    this.setState({
      velocity: setInterval(this.moveShapes, 400),
      buildUp: [],
      gameOver: false,
      score: 0, 
      level: 0
    })
  }

  pauseGame = () => {
    this.state.paused 
    ? this.setState({
      velocity: setInterval(this.moveShapes, 400),
      paused:false
       })
    : this.setState({
      velocity: clearInterval(this.state.velocity),
      paused:true
       })
  }

  render() {
    return (
      <div className="App">
        <div id='gameOverModal' style={{display: this.state.gameOver ? 'table' : 'none'}}>
          Gg but... not good enough
          <button onClick={() => this.restartGame()}>
            Restart
          </button>
        </div>

        <h1>Tetris</h1>
        <h4>Score: {this.state.score}</h4>
        <h4>Level: {this.state.level}</h4>

        <div className="tetrisBoard">
          {tetrisBoard.map((y, indexY) => {
            return (
              <div className="mapRow">
                {y.map((x, indexX) => {
                  return <div className={this.getClassName(indexX, indexY)} />
                })}
              </div>
            );
          })}
        </div>
        <button onClick={() =>  this.pauseGame()}>
        { this.state.paused ? 'Resume' : 'Pause'}
        </button> 
      </div>
    );
  }
}

export default App;
