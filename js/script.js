const score = document.querySelector('.score'), 
game = document.querySelector('.game'), 
start = document.querySelector('.start'), 
gameArea = document.querySelector('.gameArea'), 
car = document.createElement('div'); // создали элемент на странице
let line, enemy; // создали линии разметки, чужие машины

car.classList.add('car'); // добавили класс car

// start.onclick = function() {
//   start.classList.add('hide'); 
// } =====> устаревший способ. При добавлении еще одной ф-ции, старая перезапишется 

start.addEventListener('click', startGame); 
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
  speed: 0.1, 
  traffic: 3
};

function getQuantityElements(heightElement) { // вычисляем, сколько линий разметки нужно для дороги
  return document.documentElement.clientHeight / heightElement + 1 // высота экрана / высота элемента + 1
};

function startGame () { // ф-ция при нажатии на start
  start.classList.add('hide');

  for (let i = 0; i < getQuantityElements(100); i++) { // добавляем линии разметки на дорогу
    line = document.createElement('div');  // создали элемент
    line.classList.add('line'); // добавили ему класс
    line.style.top = (i * 100) + 'px'; // указали расположение 
    line.y = i * 100; // добавили обьекту line свойство y
    gameArea.appendChild(line); // добавили на дорогу
  }

  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) { // добавляем чужие автомобили
    enemy = document.createElement('div');
    enemy.classList.add('enemy');

    enemy.y = -100 * setting.traffic * (i+1); // расстояние между автомобилями (из-за -100 они выше дороги и после будут к нам приближаться)
    enemy.style.top = enemy.y + 'px'; 
     
    enemy.x = Math.floor(Math.random() * (gameArea.offsetWidth - 50)); // расположение чужих машинок по горизонтали
    enemy.style.left = enemy.x + 'px';
    gameArea.appendChild(enemy); // добавили на дорогу
  }

  gameArea.appendChild(car); // вставили элемент car в gameArea
  setting.x = car.offsetLeft; // в setting записали положение .car {left = 125px (position: absolute)}
  setting.y = car.offsetTop; // в setting записали положение .car {top (position: absolute)}

  requestAnimationFrame(playGame); // ф-ция для выполнения анимации
}; 
let i = 0;

function playGame() {
  if (setting.start) { // если игра запущена
    moveRoud(); // запускаем ф-цию движения разметки на дороге
    moveEnemy(); // запускаем ф-цию движения чужих машин
    if (keys.ArrowLeft && setting.x > 0) { // если зажата стрелка влево
      setting.x -= setting.speed; // уменьшаем занчение x на заданную скорость  - двигаем объект влево
    };
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth) ) {// если зажата стрелка вправо
      setting.x += setting.speed; // увеличиваем занчение x на заданную скорость  - двигаем объект вправо
    };
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }; 
    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) { // setting.y < (gameArea.offsetHeight - car.offsetHeight) - чтобы не вылизать за границы поля
      setting.y += setting.speed;
    };
    car.style.left = setting.x + 'px'; // в стили .car передали в left значение setting.x
    car.style.top = setting.y + 'px'; // в стили .car передали в top значение setting.y

    requestAnimationFrame(playGame); // ф-ция для выполнения анимации рекурсия
  }
};

function startRun (event) { // ф-ция при нажатии на кнопку
  event.preventDefault(); // отменили скрол при нажатии на стрелку
  keys[event.key] = true; // если нажатая клавиша соответствует ключу из обекта keys, этому ключу присвоить значение true
  setting.start = true; 
  requestAnimationFrame(playGame); // ф-ция для выполнения анимации рекурсия
};

function stopRun (event) { // ф-ция при отпускании кнопки
  event.preventDefault(); // отменили скрол при нажатии на стрелку
  keys[event.key] = false; // если отпущенная клавиша соответствует ключу из обекта keys, этому ключу присвоить значение true
};

function moveRoud() { // ф-ция движения разметки на дороге
  let lines = document.querySelectorAll('.line'); // получили все линии разметки
  lines.forEach( (line) => { // перебираем все линии
    line.y += setting.speed; // двигаем
    if (line.y >= document.documentElement.clientHeight) { // если у больше высоты экрана
      line.y = -100; // отрисовать за пределами экрана
    }
    line.style.top = line.y + 'px'; // отрисовали
  })
};

function moveEnemy() { // ф-ция движения чужих машин
  let enemys = document.querySelectorAll('.enemy'); // получили все машины
  enemys.forEach((enemy) =>  {
    enemy.y += setting.speed / 2; // двигаем
    if (enemy.y >= document.documentElement.clientHeight) { // если у больше высоты экрана
      enemy.y = -100 * setting.traffic; // отрисовать за пределами экрана
      enemy.style.left = (Math.floor(Math.random() * (gameArea.offsetWidth - 50))) + 'px'; // изменили горизонтальное положение машинки
    }
    enemy.style.top = enemy.y + 'px'; // отрисовали
  })
};



