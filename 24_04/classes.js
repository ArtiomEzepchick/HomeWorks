// Класс Clock написан в функциональном стиле. Перепишите его, используя современный синтаксис классов.

// function Clock({ template }) {
  
//     let timer;
  
//     function render() {
//       let date = new Date();
  
//       let hours = date.getHours();
//       if (hours < 10) hours = '0' + hours;
  
//       let mins = date.getMinutes();
//       if (mins < 10) mins = '0' + mins;
  
//       let secs = date.getSeconds();
//       if (secs < 10) secs = '0' + secs;
  
//       let output = template
//         .replace('h', hours)
//         .replace('m', mins)
//         .replace('s', secs);
  
//       console.log(output);
//     }
  
//     this.stop = function() {
//       clearInterval(timer);
//     };
  
//     this.start = function() {
//       render();
//       timer = setInterval(render, 1000);
//     };
  
// }
  
// let clock = new Clock({template: 'h:m:s'});
// clock.start();

// P.S. Часики тикают в консоли. Откройте её, чтобы посмотреть.

// class Clock {
//     constructor({template}) {
//         this.template = template;
//     };

//     render() {
//         let date = new Date();
    
//         let hours = date.getHours();
//         if (hours < 10) hours = '0' + hours;
    
//         let mins = date.getMinutes();
//         if (mins < 10) mins = '0' + mins;
    
//         let secs = date.getSeconds();
//         if (secs < 10) secs = '0' + secs;
    
//         let output = this.template
//           .replace('h', hours)
//           .replace('m', mins)
//           .replace('s', secs);
    
//         console.log(output);
//     }

//     stop() {
//         clearInterval(this.timer);
//     };

//     start() {
//         this.render();
//         this.timer = setInterval(() => this.render(), 1000);
//     };
// }
  
// let clock = new Clock({template: 'h:m:s'});
// clock.start();

// ЗАДАЧА №2

// В коде ниже класс Rabbit наследует Animal.

// К сожалению, объект класса Rabbit не создаётся. Что не так? Исправьте ошибку.

//  class Animal {

//   constructor(name) {
//     this.name = name;
//   }

// }

// class Rabbit extends Animal {
//   constructor(name) {
//     this.name = name;
//     this.created = Date.now();
//   }
// }

// let rabbit = new Rabbit("Белый кролик"); // Error: this is not defined
// alert(rabbit.name);

// class Animal {

//     constructor(name) {
//       this.name = name;
//     }
  
// }
  
//   class Rabbit extends Animal {
//     constructor(name) {
//       super(name); // в конструкторе дочернего класса не хватало super - поэтому и не работало
//       this.created = Date.now();
//     }
// }
  
// let rabbit = new Rabbit("Белый кролик"); // Error: this is not defined
// console.log(rabbit.name);

// ЗАДАЧА №3

// У нас есть класс Clock. Сейчас он выводит время каждую секунду

// Создайте новый класс ExtendedClock, который будет наследоваться от Clock и добавьте параметр precision – количество миллисекунд 
// между «тиками». Установите значение в 1000 (1 секунда) по умолчанию.

// Сохраните ваш код в файл extended-clock.js
// Не изменяйте класс clock.js. Расширьте его.

// class Clock {
//   constructor({ template }) {
//     this.template = template;
//   }

//   render() {
//     let date = new Date();

//     let hours = date.getHours();
//     if (hours < 10) hours = '0' + hours;

//     let mins = date.getMinutes();
//     if (mins < 10) mins = '0' + mins;

//     let secs = date.getSeconds();
//     if (secs < 10) secs = '0' + secs;

//     let output = this.template
//       .replace('h', hours)
//       .replace('m', mins)
//       .replace('s', secs);

//     console.log(output);
//   }

//   stop() {
//     clearInterval(this.timer);
//   }

//   start() {
//     this.render();
//     this.timer = setInterval(() => this.render(), 1000); // по сути, вместо 1000 нужно создать свой параметр precision, которому можно будет назначить свой собственный интервал
//   }
// }

// class ExtendedClock extends Clock {
//     constructor({template, precision}) {
//         super({template}); // вызвали родительский конструктор в наследуемом классе (т.к. без super не будет определен this для наследуемого класса)
//         this.precision = precision;
//     };

//     start() {
//         super.render();
//         this.timer = setInterval(() => this.render(), this.precision); // добавили сюда изменяемый параметр this.precision
//     };
// };

// const newClock = new ExtendedClock({template: 'h:m:s', precision: 2000});
// newClock.start();

// ЗАДАЧА №4

// Как мы уже знаем, все объекты наследуют от Object.prototype и имеют доступ к «общим» методам объекта, например hasOwnProperty.

// Пример:

// class Rabbit {
//   constructor(name) {
//     this.name = name;
//   }
// }

// let rabbit = new Rabbit("Rab");

// метод hasOwnProperty от Object.prototype
// console.log( rabbit.hasOwnProperty('name') ); // true
// Но что если мы явно напишем "class Rabbit extends Object" – тогда результат будет отличаться от обычного "class Rabbit"?

// В чем разница?

// Ниже пример кода с таким наследованием (почему он не работает? исправьте его):

// class Rabbit extends Object {
//   constructor(name) {
//     this.name = name;
//   }
// }

// let rabbit = new Rabbit("Кроль");

// alert( rabbit.hasOwnProperty('name') ); // Ошибка

// ОТВЕТ

// сразу понял, что дело в отсутствующем super

// class Rabbit extends Object {
//     constructor(name) {
//         super(Object); // добавил - заработало
//         this.name = name;
//     };
// };
  
// const rabbit = new Rabbit("Кроль");
  
// console.log( rabbit.hasOwnProperty('name') );

// ЗАДАЧА №5

// Почему instanceof в примере ниже возвращает true? Мы же видим, что a не создан с помощью B().

// function A() {}
// function B() {}

// A.prototype = B.prototype = {};

// let a = new A();

// console.log(a instanceof B); // true

// ОТВЕТ

// Предполагаю, что всё из-за строки A.prototype = B.prototype = {}, т.е. B.prototype теперь присутствует в цепочке прототипов переменной a - поэтому instanceof и возвращает true