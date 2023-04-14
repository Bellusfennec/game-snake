import "./assets/scss/style.css";

class Graphics {
  constructor() {
    this.board = [
      "####################",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "#                  #",
      "####################",
    ];
    this.snake = {
      parts: [
        { x: 4, y: 2 },
        { x: 3, y: 2 },
        { x: 2, y: 2 },
      ],
      facing: "E",
    };
    this.squareSize = 30;
    this.tickNumber = 0;
    this.timer = 0;
  }
  drawGame() {
    const canvas = document.querySelector("#canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBoard(ctx);
    this.drawSnake(ctx);
    this.startGame();
  }
  startGame() {
    window.addEventListener(
      "keypress",
      (event) => {
        console.log(event.key);
        this.processInput(event);
      },
      false
    );
  }
  processInput(keyPressed) {
    // console.log("key", keyPressed);
    let key = keyPressed.key.toLowerCase();

    let targetDirection = this.snake.facing;
    if (key === "w") targetDirection = "N";
    if (key === "a") targetDirection = "W";
    if (key === "s") targetDirection = "S";
    if (key === "d") targetDirection = "E";
    this.snake.facing = targetDirection;
    this.tick();
  }
  tick() {
    clearTimeout(this.timer);

    this.tickNumber++;
    console.log(this.snake.parts);
    this.moveSnake();
    this.drawGame();
    this.timer = setTimeout(() => this.tick(), 500);
  }
  createCanvas() {
    const root = document.querySelector("#root");
    root.insertAdjacentHTML(
      "beforeend",
      `
        <canvas id='canvas' width="600" height="600"></canvas><br />
        <input class="draw" type="button" value="Draw" /><br />
        <input class="clear" type="button" value="Clear" /><br />
        `
    );
    // const drawBtn = document.querySelector(".draw");
    // const clearBtn = document.querySelector(".clear");
    // drawBtn.addEventListener("click", () => this.draw(this.ctx));
    // clearBtn.addEventListener("click", () => this.clear(this.ctx));
  }
  // draw(ctx) {
  //   ctx.fillStyle = "black";
  //   ctx.fillRect(0, 0, 30, 30);
  // }
  // clear(ctx) {
  //   ctx.clearRect(0, 0, 600, 600);
  // }
  drawBoard(ctx) {
    let currentYoffset = 0;
    this.board.forEach((line) => {
      line = line.split("");
      let currentXoffset = 0;
      line.forEach((character) => {
        if (character === "#") {
          ctx.fillStyle = "black";
          ctx.fillRect(
            currentXoffset,
            currentYoffset,
            this.squareSize,
            this.squareSize
          );
        }
        currentXoffset += this.squareSize;
      });
      currentYoffset += this.squareSize;
    });
  }
  drawSnake(ctx) {
    this.snake.parts.forEach((part) => {
      let partXlocation = part.x * this.squareSize;
      let partYlocation = part.y * this.squareSize;
      ctx.fillStyle = "green";
      ctx.fillRect(
        partXlocation,
        partYlocation,
        this.squareSize,
        this.squareSize
      );
    });
  }
  moveSnake() {
    let location = this.nextLocationSnake();
    this.snake.parts.unshift(location);
    this.snake.parts.pop();
  }
  nextLocationSnake() {
    let snakeHead = this.snake.parts[0];
    let targetX = snakeHead.x;
    let targetY = snakeHead.y;
    console.log(targetX, targetY);
    targetY = this.snake.facing === "N" ? targetY - 1 : targetY;
    targetY = this.snake.facing === "S" ? targetY + 1 : targetY;
    targetX = this.snake.facing === "W" ? targetX - 1 : targetX;
    targetX = this.snake.facing === "E" ? targetX + 1 : targetX;
    return { x: targetX, y: targetY };
  }
}
const start = new Graphics();
start.createCanvas();
start.tick();
