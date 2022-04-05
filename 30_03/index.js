const object = {
    a: 1,
    b: "hui",
    c: [1,3,5,6],
    c: {
        g: 5,
        ds: () => console.log(2),
        ef: {
            fe: [1,2,3],
            fd: function () {
              console.log(13)
            },
            fa: () => console.log(23)
        },
        gg: [2, [1,2,3], 4]
    },
    ggg: 18,
};

// check if value is object, if yes, check if it has functions,
// if yes - call all the functions found, if no - continue searching in this inner object

let isArray = arg => Array.isArray(arg);
let isObject = arg => typeof arg === 'object' && !isArray(arg) && arg !== null;
let isFunction = arg => typeof arg === 'function';

function isFunctionExists(obj) {

    if (isObject(obj)) {

        for (let key in obj) {

            if (isFunction(obj[key])) {
                obj[key]();
            };

            if (isObject(obj[key])) {
    
                for (let item in obj[key]) {

                    if (isFunction(obj[key][item])) {
                        obj[key][item]();
                    };
    
                    if (isObject(obj[key][item])) {
                        
                        for (let arg in obj[key][item]) {
    
                            if (isFunction(obj[key][item][arg])) {
                                obj[key][item][arg]();
                            };
                        };
                    };
                };
            };
        };
    } else {
        console.log('This is not an object');
    };
};

isFunctionExists(object)