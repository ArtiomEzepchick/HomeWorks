// ЗАДАЧИ ПО ТЕМЕ "ПРОТОТИПЫ"

// В приведённом ниже коде создаются и изменяются два объекта.

// Какие значения показываются в процессе выполнения кода?

// let animal = {
//   jumps: null
// };
// let rabbit = {
//   __proto__: animal,
//   jumps: true
// };

// alert( rabbit.jumps ); // ? (1) 

// delete rabbit.jumps;

// alert( rabbit.jumps ); // ? (2)

// delete animal.jumps;

// alert( rabbit.jumps ); // ? (3)

// Ответы

// 1 - true, стандартное обращение к свойству объекта. Если два одинаковых ключа у объекта и у прототипа, то используется тот, что у объекта.
// 2 - null, т.к. наследуется от animal
// 3 - undefined, т.к. такого свойства после удаления не существует

// Задача №2

// Задача состоит из двух частей.

// У нас есть объекты:

// let head = {
//   glasses: 1
// };

// let table = {
//   pen: 3
// };

// let bed = {
//   sheet: 1,
//   pillow: 2
// };

// let pockets = {
//   money: 2000
// };

// 1. С помощью свойства __proto__ задайте прототипы так, чтобы поиск любого свойства выполнялся по следующему пути: 
// pockets → bed → table → head. Например, pockets.pen должно возвращать значение 3 (найденное в table), 
// а bed.glasses – значение 1 (найденное в head).
// 2. Ответьте на вопрос: как быстрее получить значение glasses – через pockets.glasses или через head.glasses? При 
// необходимости составьте цепочки поиска и сравните их.


// const head = {
//   glasses: 1
// };

// const table = {
//   pen: 3,
//   __proto__: head,
// };

// const bed = {
//   sheet: 1,
//   pillow: 2,
//   __proto__: table,
// };

// const pockets = {
//   money: 2000,
//   __proto__: bed,
// };

// console.log(bed.glasses)

// Ответ на второй вопрос: сомневаюсь, что это как-то повлияет на скорость поиска, т.е. без разницы каким образом получать значение.

// ЗАДАЧА №3

// Объект rabbit наследует от объекта animal.

// Какой объект получит свойство full при вызове rabbit.eat(): animal или rabbit?

// let animal = {
//   eat() {
//     this.full = true;
//   }
// };

// let rabbit = {
//   __proto__: animal
// };

// rabbit.eat();

// ОТВЕТ - rabbit, т.к. this - это объект перед точкой, в нашем случае это именно rabbit

// ЗАДАЧА №4

// У нас есть два хомяка: шустрый (speedy) и ленивый (lazy); оба наследуют от общего объекта hamster.

// Когда мы кормим одного хомяка, второй тоже наедается. Почему? Как это исправить?

// let hamster = {
//   stomach: [],

//   eat(food) {
//     this.stomach.push(food);
//   }
// };

// let speedy = {
//   __proto__: hamster
// };

// let lazy = {
//   __proto__: hamster
// };


// // Этот хомяк нашёл еду
// speedy.eat("apple");
// console.log(speedy.stomach); // apple

// // У этого хомяка тоже есть еда. Почему? Исправьте
// console.log(lazy.stomach); // apple

// let hamster = {
//   stomach: [],

//   eat(food) {
//     this.stomach.push(food);
//   }
// };

// // добавил каждому хомяку по желудку - заработало, теперь this.stomach.push(food) "видит" свойство stomach у каждого объекта. 
// // иначе, как в случае выше, он добавлял food в прототип

// let speedy = {
//   stomach: [], 
//   __proto__: hamster
// };

// let lazy = {
//   stomach: [],
//   __proto__: hamster
// };


// speedy.eat("apple");
// console.log(speedy.stomach); 
// console.log(lazy.stomach); 