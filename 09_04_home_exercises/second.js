// Задача №2.

// У нас есть массив объектов, который нужно отсортировать:

// let users = [
//   { name: "John", age: 20, surname: "Johnson" },
//   { name: "Pete", age: 18, surname: "Peterson" },
//   { name: "Ann", age: 19, surname: "Hathaway" }
// ];
// Обычный способ был бы таким:

// // по имени (Ann, John, Pete)
// users.sort((a, b) => a.name > b.name ? 1 : -1);

// // по возрасту (Pete, Ann, John)
// users.sort((a, b) => a.age > b.age ? 1 : -1);
// Можем ли мы сделать его короче, скажем, вот таким?

// users.sort(byField('name'));
// users.sort(byField('age'));
// То есть, чтобы вместо функции, мы просто писали byField(fieldName).

// Напишите функцию byField, которая может быть использована для этого.

let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];

function byField(fieldName) {
    return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;

// Вложенная функция, которая, по сути, копирует сортировку по примеру в условии задачи, но с тем отличием, что в 
// функции на уровень выше (byField) есть аргумент fieldName, который используется для ввода необходимого поля для 
// сортировки. Т.к. аргумент функции вводится с помощью кавычек ('age', 'name', ...) ибо без них это являлось бы 
// просто обращением к переменной, во вложенной функции к нему (полю объекта) необходимо обращаться через квадратные скобки

};

console.log(users.sort(byField('age')));