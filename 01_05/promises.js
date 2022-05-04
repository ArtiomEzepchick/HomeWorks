// Задача №1

// Можно ли "перевыполнить" промис?
// Что выведет код ниже?

const promise = new Promise(function(resolve, reject) {
    resolve(1);
  
    setTimeout(() => resolve(2), 1000);
});

// Ответ: код выведет 1, а 2 проигнорирует, т.к. "состояние" промиса может быть изменено только раз. 
// Т.е. результат только один - либо resolve, либо reject.

// Задача №2

// Встроенная функция setTimeout использует колбэк-функции. Создайте альтернативу, использующую промисы.

// Функция delay(ms) должна возвращать промис, который перейдёт в состояние «выполнен» через ms миллисекунд, 
// так чтобы мы могли добавить к нему .then:

function delay(ms) {
  // ваш код
}

delay(3000).then(() => alert('выполнилось через 3 секунды'));

// МОЁ РЕШЕНИЕ НИЖЕ

function newDelay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

newDelay(3000).then(() => console.log('выполнилось через 3 секунды'))

// Задача №3

// Анимация круга с помощью промиса
// Перепишите функцию showCircle, написанную в задании Анимация круга с помощью колбэка таким образом, чтобы она возвращала 
// промис, вместо того чтобы принимать в аргументы функцию-callback.

// Новое использование:

showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});

// Возьмите решение из Анимация круга с помощью колбэка в качестве основы. Код ниже:

function go() {
    showCircle(150, 150, 100, div => {
      div.classList.add('message-ball');
      div.append("Hello, world!");
    });
}

function showCircle(cx, cy, radius, callback) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);

    setTimeout(() => {
      div.style.width = radius * 2 + 'px';
      div.style.height = radius * 2 + 'px';

      div.addEventListener('transitionend', function handler() {
        div.removeEventListener('transitionend', handler);
        callback(div);
      });
    });
}

// МОЁ РЕШЕНИЕ НИЖЕ

function newGo() {
    showNewCircle(150, 150, 100).then(div => {
        div.classList.add('message-ball');
        div.append("Hello, world!");
  });
}

function showNewCircle(cx, cy, radius) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);

    const showCirclePromise = new Promise(resolve => {
        setTimeout(() => {
            div.style.width = radius * 2 + 'px';
            div.style.height = radius * 2 + 'px';
      
            div.addEventListener('transitionend', function handler() {
              div.removeEventListener('transitionend', handler);
              resolve(div);
            });
        });
    });
    return showCirclePromise;
};

// Задача №4

// Промисы: сравните then и catch
// Являются ли фрагменты кода ниже эквивалентными? Другими словами, ведут ли они себя одинаково во всех обстоятельствах, для 
// всех переданных им обработчиков?

promise.then(f1).catch(f2);

// Против:

promise.then(f1, f2);

// ОТВЕТ: Не эквивалентны, т.к. в первом случае, если будет ошибка - она обработается с помощью catch, а во втором случае нету 
// следующего по цепочке then/catch - поэтому ошибка будет не обработана

// ЗАДАЧА №5

// Ошибка в setTimeout
// Что вы думаете? Выполнится ли .catch? Поясните свой ответ.

new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(console.log);

// Здесь я не смог дать корректный ответ, т.к. не подумал о неявном "try...catch" в Промисах и о том, что он работает синхронно. 
// В примере выше setTimeout - асинхронная функция (выполнится через 1 секунду), т.е. ошибка появляется позже, когда движок уже покинул
// неявный блок "try...catch"

// ЗАДАЧА №6

// Перепишите, используя async/await
// Перепишите один из примеров раздела Цепочка промисов, используя async/await вместо .then/catch:

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json')
  .catch(console.log); // Error: 404

// МОЁ РЕШЕНИЕ НИЖЕ

async function loadNewJson(url) {
    const response = await fetch(url);

    response.status == 200 ? response.json() : new Error(response.status);
}

loadNewJson('no-such-user.json').catch(console.log); // Error: 404

// ЗАДАЧА №7

// Перепишите, используя async/await
// Ниже пример из раздела Цепочка промисов, перепишите его, используя async/await вместо .then/catch.

// В функции demoGithubUser замените рекурсию на цикл: используя async/await, сделать это будет просто.

class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
}
  
function loadJson(url) {
    return fetch(url)
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          throw new HttpError(response);
        }
      })
}
  
// Запрашивать логин, пока github не вернёт существующего пользователя.
function demoGithubUser() {
    let name = prompt("Введите логин?", "iliakan");
  
    return loadJson(`https://api.github.com/users/${name}`)
      .then(user => {
        alert(`Полное имя: ${user.name}.`);
        return user;
      })
      .catch(err => {
        if (err instanceof HttpError && err.response.status == 404) {
          alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
          return demoGithubUser();
        } else {
          throw err;
        }
      });
  }
  
demoGithubUser();

// МОЁ РЕШЕНИЕ НИЖЕ
// В описании к задаче указано, что она лёгкая, но мне так не показалось я долго думал над условием цикла. Плюс, как обычно, сначала
// пытался решить с помощью цикла for. Ну, хоть до переделки в "try...catch" догадался ввиду того, что в условии был метод .catch

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
    const response = await fetch(url);

    response.status == 200 ? response.json() : new HttpError(response);
};

async function demoGithubUser() {
    let gitHubUser;

    while(true) {
        let name = prompt("Введите логин?", "iliakan");

        try {
            gitHubUser = await loadJson(`https://api.github.com/users/${name}`);
            console.log(`Полное имя: ${gitHubUser.name}.`);
            break;
        } catch {
            err instanceof HttpError && err.response.status === 404 ? 
            console.log("Такого пользователя не существует, пожалуйста, повторите ввод.") : err
        }
    }

    return gitHubUser
}

demoGithubUser();

// ЗАДАЧА №8

// Вызовите async–функцию из "обычной"
// Есть «обычная» функция. Как можно внутри неё получить результат выполнения async–функции?

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...что здесь написать?
  // чтобы вызвать wait() и дождаться результата "10" от async–функции
  // не забывайте, здесь нельзя использовать "await"
}

// P.S. Технически задача очень простая, но этот вопрос часто задают разработчики, недавно познакомившиеся с async/await.

// МОЁ РЕШЕНИЕ НИЖЕ

function newF() {
    wait().then(resolve => console.log(resolve));
};

newF()

  