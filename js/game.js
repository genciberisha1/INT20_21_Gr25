const board_border = 'white';
const board_background = "#1C3144";
const snake_col = '#FFBA08';
const snake_border = 'white';

let snake = [
  {x: 320, y: 300},
  {x: 300, y: 300},
  {x: 280, y: 300},
  {x: 260, y: 300},
  {x: 240, y: 300}, 
]


var score = 0;
let changingDirection = false;
let food_x;
let food_y;
let dx = 20;
let dy = 0; 




const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");
main();

genFood();
document.addEventListener("keydown", changeDirection);

function main() {

    if (game_end()) 
    return alert (" You Lost! \n" + " Your Maximum Score is: "+ score) ;
    

    changingDirection = false;
    setTimeout(function onTick(){
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    main();
},100)
}

function clearCanvas() {
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokestyle = board_border;
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnake() {
  snake.forEach(drawSnakePart)
}

function drawFood()
{
    snakeboard_ctx.fillStyle = " #D00000 ";
    snakeboard_ctx.strokestyle = " #A2AEBB";
    snakeboard_ctx.fillRect(food_x, food_y, 20, 20);
    snakeboard_ctx.strokeRect(food_x, food_y, 20, 20);
}

function drawSnakePart(snakePart) {
  snakeboard_ctx.fillStyle = snake_col;
  snakeboard_ctx.strokestyle = snake_border;
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}
function game_end()
{
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    
    const left_wall = snake[0].x < 0;
    const right_wall = snake[0].x > snakeboard.width -20;
    const top_wall = snake[0].y < 0;
    const bottom_wall = snake[0].y > snakeboard.height -20;
    return  left_wall || right_wall || top_wall || bottom_wall
}


function randomFood(min, max){
    return Math.round((Math.random() * (max-min) + min) / 20) * 20;
}
function genFood(){
    food_x = randomFood (0, snakeboard.width - 20);
    food_y = randomFood (0, snakeboard.height - 20);
    snake.forEach(function has_snake_eaten_food(part){
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) genFood();
    });
}


function changeDirection(event)
{
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changingDirection) return;
    changingDirection = true;
    const keyPress = event.keyCode;
    const d_up = dy === -20;
    const d_down = dy === 20;
    const d_right = dx === 20;
    const d_left = dx === -20;

    if (keyPress === LEFT_KEY && !d_right)
    {
        dx = -20;
        dy = 0;
    }

    if (keyPress === UP_KEY && !d_down)
    {
        dx = 0;
        dy = -20;
    }

    if (keyPress === RIGHT_KEY && !d_left)
    {
        dx = 20;
        dy = 0;
    }

    if (keyPress === DOWN_KEY && !d_up)
    {
        dx = 0;
        dy = 20;
    }
}
    
    function moveSnake()
    {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        const has_eaten_Food = snake[0].x === food_x && snake[0].y === food_y;
      if (has_eaten_Food) {
        score += 10;
        document.getElementById('score').innerHTML = score ;
        
        genFood();
      }else {
        snake.pop();
        
    }
    

   

}

