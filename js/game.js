const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/777.png";

const foodImg = new Image();
foodImg.src = "img/apple.png";

let box = 32;

let score = 0;

// Задаем рандомное появление еды в нашем поле
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

// Задаем первоначальное положение змейки
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

//Создаем обработчик события "keydown" и вешаем его на весь документ
document.addEventListener("keydown", direction);

let dir;

//Прописываем управление с клавиатуры
function direction(event) {
  if (event.keyCode == 37 && dir != "right") dir = "left";
  if (event.keyCode == 38 && dir != "down") dir = "up";
  if (event.keyCode == 39 && dir != "left") dir = "right";
  if (event.keyCode == 40 && dir != "up") dir = "down";
}

//Если змея врежется в саму себя, то игра остановится
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) clearInterval(game);
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    //Рисуем голову змейки по центру
    ctx.fillStyle = i == 0 ? "green" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Пропишем текст в табло
  let scoreboard = `Ваш результат: ${score}`;
  ctx.fillStyle = "white";
  ctx.font = "50px Areal";
  ctx.fillText(scoreboard, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }
  // Прописываем условие если мы выйдем за границы поля, то игра заканчивается
  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * box ||
    snakeY > box * 17
  )
    clearInterval(game);

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

// Без setInterval ф-я drawGame не отображаетсяю Мы вызываем эту ф- через каждые 350мс
//Она регулирует скорость змейки

let game = setInterval(drawGame, 350);
