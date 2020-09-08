const score = document.querySelector('.score'), 
game = document.querySelector('.game'), 
start = document.querySelector('.start'), 
gameArea = document.querySelector('.gameArea'), 
car = document.createElement('div'); // создали элемент на странице
car.classList.add('car'); // добавили класс car

// start.onclick = function() {
//   start.classList.add('hide'); 
// } =====> устаревший способ. При добавлении еще одной ф-ции, старая перезапишется 

start.addEventListener('click', startGame); 

function startGame () { // ф-ция при нажатии на start
  start.classList.add('hide');
  gameArea.appendChild(car); // вставили элемент car в gameArea
  requestAnimationFrame(playGame); // ф-ция для выполнения анимации
}; 

document.addEventListener('keydown', startRun);
document.addEventListener('keyup',stopRun);

const keys = { // клавиши - стрелки
  ArrowAp : false, 
  ArrowDown : false, 
  ArrowRight : false, 
  ArrowLeft : false
};

const setting = {
  start : false, 
  score: 0, 
  speed: 3
};

function startRun (event) { // ф-ция при нажатии на кнопку
  event.preventDefault(); // отменили скрол при нажатии на стрелку
  keys[event.key] = true; // если нажатая клавиша соответствует ключу из обекта keys, этому ключу присвоить значение true
  setting.start = true; 
}; 

function stopRun (event) { // ф-ция при отпускании кнопки
  event.preventDefault(); // отменили скрол при нажатии на стрелку
  keys[event.key] = false; // если отпущенная клавиша соответствует ключу из обекта keys, этому ключу присвоить значение true

};

function playGame() {
  if (setting.start === true) {
    requestAnimationFrame(playGame); // ф-ция для выполнения анимации рекурсия
  }
};