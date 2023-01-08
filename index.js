class Snake {
  constructor() {
    this.blockSize = 25;
    this.rows = 20;
    this.cols = 20;
    this.board = document.getElementById("board");
    this.board.height = this.rows * this.blockSize; // 500
    this.board.width = this.cols * this.blockSize;
    this.context = board.getContext("2d");

    this.snakeX = this.blockSize * 5; // 125
    this.snakeY = this.blockSize * 5;

    this.velocityX = 0;
    this.velocityY = 0;

    this.snakeBody = [];

    this.foodX = 0;
    this.foodY = 0;

    this.speed = 7;

    this.gameOver = false;

    this.score = 0;
    this.highScore = localStorage.getItem('snake-high-score') || 0;

    this.soundScore = new Audio("score.wav");
  }

  gameLoop() {

    document.addEventListener("keydown", this.changeDirection.bind(this));


    this.update();
    setTimeout(this.gameLoop.bind(this), 1000/ this.speed);
  }

  update() {
    if(this.score >= 10) {
      this.speed = 15;
    } else if (this.score >= 5) {
      this.speed = 11;
    } else if (this.score >= 2) {
      this.speed = 9;
    }
    if(this.gameOver) {
      return;
    }

    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.board.width, this.board.height)

    this.context.fillStyle = "red";
    this.context.fillRect(this.foodX, this.foodY, this.blockSize, this.blockSize);


    if(this.snakeX === this.foodX && this.snakeY === this.foodY) {
      this.placeFood();
      this.snakeBody.push([this.foodX,this.foodY]);
      this.score++;
      this.soundScore.play();
      if(this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('snake-high-score', this.score);
      }
    }


    for(let i = this.snakeBody.length - 1; i > 0; i--) {
      this.snakeBody[i] = this.snakeBody[i - 1]; 
    }

    if (this.snakeBody.length) {
      this.snakeBody[0] = [this.snakeX, this.snakeY];
    }

    this.snakeX += this.velocityX * this.blockSize;
    this.snakeY += this.velocityY * this.blockSize; 
 
    this.context.fillStyle = "green";
    this.context.fillRect(this.snakeX, this.snakeY, this.blockSize, this.blockSize);

    for(let i=0; i < this.snakeBody.length; i++) {
      this.context.fillStyle = 'green';
      this.context.fillRect(this.snakeBody[i][0],this.snakeBody[i][1], this.blockSize, this.blockSize);
    }


    this.gameover();

    this.setScore();
  }

  gameover() {
    if(this.snakeX < 0 || this.snakeX >= this.cols * this.blockSize || this.snakeY < 0 || this.snakeY >= this.rows*this.blockSize) {
      this.gameOver = true;
      this.resetGame();
    }

    for(let i=0; i < this.snakeBody.length; i++) {
      if (this.snakeX === this.snakeBody[i][0] && this.snakeY === this.snakeBody[i][1]) {
        this.gameOver = true;
        this.resetGame();
      }
    }



  }

  changeDirection(event) {

    if (event.code === "ArrowUp" && this.velocityY != 1) {
      this.velocityX = 0;
      this.velocityY = -1;
    
    } else if (event.code === "ArrowDown" && this.velocityY != -1 ) {
      this.velocityX = 0;
      this.velocityY = 1;
    } else if (event.code === "ArrowLeft" && this.velocityX != 1) {
      this.velocityX = -1;
      this.velocityY = 0;
    } else if (event.code === "ArrowRight" && this.velocityX != -1) {
      this.velocityX = 1;
      this.velocityY = 0;
    }
  }

  placeFood() {
      this.foodX = Math.floor(Math.random() * this.cols) * this.blockSize;
      this.foodY = Math.floor(Math.random() * this.rows) * this.blockSize;

      for(let i=0; i < this.snakeBody.length; i++) {
        if (this.snakeX === this.snakeBody[i][0] && this.snakeY === this.snakeBody[i][1]) {
          console.log(this.snakeBody[i][1])
          this.placeFood();
        }
      }
  }

  setScore() {
    document.getElementById('score').textContent = `Score: ${this.score}`;
    document.getElementById('high-score').textContent = `High Score: ${this.highScore}`;
  }

  resetGame() {
    this.snakeX = this.blockSize * 5; // 125
    this.snakeY = this.blockSize * 5;

    this.velocityX = 0;
    this.velocityY = 0;

    this.snakeBody = [];

    this.foodX = 0;
    this.foodY = 0;

    this.speed = 7;

    this.gameOver = false;

    this.score = 0;
  }
  
}

const n = new Snake();
n.placeFood();
n.gameLoop();


