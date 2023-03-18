const board = document.getElementById('board');
const user = document.getElementById('user');
const ai = document.getElementById('ai');
const ball = document.getElementById('ball');
const net = document.getElementById('net');
const userScore = document.getElementById('user-score');
const aiScore = document.getElementById('ai-score');

// Set initial positions for the user, AI paddles, and the ball
user.style.top = '160px';
ai.style.top = '160px';
ball.style.left = '290px';
ball.style.top = '190px';

let userPoints = 0;
let aiPoints = 0;

let ballSpeed = 5;
let ballXSpeed = ballSpeed;
let ballYSpeed = ballSpeed;

let messageTimeout; // Add this line at the beginning of the script

function showMessage(message) {
  // Remove any existing message
  const existingMessage = document.getElementById('game-message');
  if (existingMessage) {
    clearTimeout(messageTimeout); // Clear the existing timeout
    board.removeChild(existingMessage);
  }

  const messageDiv = document.createElement('div');
  messageDiv.id = 'game-message'; // Add an id for the message div
  messageDiv.innerHTML = message;
  messageDiv.style.position = 'absolute';
  messageDiv.style.width = '100%';
  messageDiv.style.textAlign = 'center';
  messageDiv.style.color = 'white';
  messageDiv.style.fontSize = '24px';
  messageDiv.style.top = '50%';
  board.appendChild(messageDiv);

  messageTimeout = setTimeout(() => { // Use the messageTimeout variable here
    board.removeChild(messageDiv);
  }, 2000);
}


function moveBall() {
  let ballX = parseInt(ball.style.left);
  let ballY = parseInt(ball.style.top);

  if (ballY <= 0 || ballY >= 380) {
    ballYSpeed = -ballYSpeed;
  }

  if (ballX <= 30 && ballX >= 20 && ballY + 20 >= parseInt(user.style.top) && ballY <= parseInt(user.style.top) + 80) {
    ballXSpeed = ballSpeed;
  } else if (ballX >= 560 && ballX <= 570 && ballY + 20 >= parseInt(ai.style.top) && ballY <= parseInt(ai.style.top) + 80) {
    ballXSpeed = -ballSpeed;
  }

  if (ballX <= 0) {
    aiPoints++;
    aiScore.innerHTML = aiPoints;
    ball.style.left = '290px';
    ballXSpeed = ballSpeed;
    ballYSpeed = ballSpeed;
    showMessage('AI got a point');
  } else if (ballX >= 600) {
    userPoints++;
    userScore.innerHTML = userPoints;
    ball.style.left = '290px';
    ballXSpeed = -ballSpeed;
    ballYSpeed = -ballSpeed;
    showMessage('User got a point');
  }

  ball.style.left = ballX + ballXSpeed + 'px';
  ball.style.top = ballY + ballYSpeed + 'px';
}

function moveAI() {
    let aiY = parseInt(ai.style.top);
    let ballY = parseInt(ball.style.top);
  
    // Adjust AI paddle speed here
    let aiSpeed = 4;
  
    // Move the paddle toward the ball
    if (ballY > aiY + 40) {
      aiY += aiSpeed;
    } else if (ballY < aiY + 40) {
      aiY -= aiSpeed;
    }
  
    // Keep the paddle on the board
    if (aiY < 0) {
      aiY = 0;
    } else if (aiY > 320) {
      aiY = 320;
    }
  
    ai.style.top = aiY + 'px';
  }

document.addEventListener('keydown', function(event) {
  let userY = parseInt(user.style.top);

  if (event.code === 'ArrowUp') {
    userY -= 10;
  } else if (event.code === 'ArrowDown') {
    userY += 10;
  }

  if (userY < 0) {
    userY = 0;
  } else if (userY > 320) {
    userY = 320;
  }

  user.style.top = userY + 'px';
});

let gameLoop = setInterval(function () {
    moveBall();
    moveAI();

    if (userPoints >= 20) {
        clearInterval(gameLoop);
        showMessage('User wins');
      } else if (aiPoints >= 20) {
        clearInterval(gameLoop);
        showMessage('AI wins');
      }
    }, 30);