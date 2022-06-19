import './styles/styles.css'

const submitBtn = document.querySelector('button[type="submit"]');
const clearBtn = document.getElementById('clearBtn');
const inputs = document.querySelectorAll('input');
const termsCheckbox = document.getElementById('terms');

const errorsContainer = {};

const createError = (node, text) => {
    const { name } = node;
    const label = document.querySelector(`label[for=${name}]`);
    const span = document.querySelector(`span[data-error=${name}]`);
    const errorMessage = `${label.textContent} ${text}`;
    span.innerText = errorMessage;
    errorsContainer[name] = errorMessage;

    if (node.classList.contains('success')) {
        node.classList.remove('success');
    };

    node.classList.add('error');
};

const deleteError = (nodeName) => {
    if (errorsContainer[nodeName]) {
        delete errorsContainer[nodeName];
        const span = document.querySelector(`span[data-error=${nodeName}]`);
        span.innerText = "";
    };
};

const checkEmail = (value) => {
    const regExp = /^\S+@\S+\.\S+$/;

    return regExp.test(value);
};

const checkPassword = (value) => {
    const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;

    return regExpPassword.test(value);
};

const checkNumbers = (value) => {
    const regExpNumbers = /^\d+$/;

    return regExpNumbers.test(value);
};


for (let input of inputs) {
    input.addEventListener('focus', () => {
        input.classList.remove('error');
        deleteError(input.name);
    });

    input.addEventListener('blur', event => {
        if (input.name !== 'pass') {
            return input.value = input.value.trim();
        };

        if (input.name !== 'fname' && input.name !== 'lname' && input.name !== 'terms') {
            if (input.value.length <= 4) { // проверка на количество символов во всех инпутах, кроме fname, lname, terms
                createError(input, 'must contain at least 5 characters');
                return;
            };

            if (input.value.includes(' ')) { // проверка на пробелы во всех инпутах, кроме fname и lname
                createError(input, "can't contain spaces");
                return;
            };

            if (input.name === 'email') {
                const isValid = checkEmail(event.target.value);
                if (!isValid) {
                    createError(input, 'has wrong format');
                    return;
                };

                if (input.value.endsWith('.ru')) {
                    createError(input, "with such domain name can't be used here");
                    return;
                };
            };

            if (input.name === 'pass') { // проверка на минимальные условия пароля
                const isValid = checkPassword(event.target.value);
                if (!isValid) {
                    alert('Your password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 symbol');
                    createError(input, 'has wrong format');
                    return;
                };
            };

            if (input.name === 'tel' || input.name === 'postcode') { // проверка почты и телефона "только на цифры"
                const isValid = checkNumbers(event.target.value);
                if(!isValid) {
                    createError(input, 'must contain only numbers');
                    return;
                };
            };
        };

        if (!event.target.value) {
            createError(input, 'is empty');
            return;
        };

        if (errorsContainer[input.name]) {
            deleteError(input.name);
            input.classList.add('success');
        } else {
            input.classList.add('success');
        };
    });
};

const clearForm = () => {
    for (let input of inputs) {
        input.value = '';
        input.classList.remove('error', 'success');
        deleteError(input.name);
    };
};

clearBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearForm();
});

submitBtn.addEventListener('click', (event) => {
    const checkLengthOfErrorsContainer = !Object.keys(errorsContainer).length;

    event.preventDefault();

    for (let input of inputs) {
        if (!input.value) {
            createError(input, 'is empty');
        };
    };

    if (termsCheckbox.checked) {
        !checkLengthOfErrorsContainer ? 
        alert('Submitted!') : alert("Can't submit: you have some problems, please check red inputs");
    } else {
        alert("Can't submit: you must accept the terms before submit");
        
        !checkLengthOfErrorsContainer ? 
        alert('The rest of the fields are ok') : alert('And you have some other problems, please check red inputs');
    };
});