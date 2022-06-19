const body = document.querySelector('body'); // можно было присвоить переменной и с помощью document.body;
const divRoot = document.getElementById('root');
const p = document.createElement('p');
const article = document.createElement('article');
const articleInnerP = p.cloneNode();
const link = document.createElement('a');
const ul = document.createElement('ul');
const table = document.createElement('table');
const tr = document.createElement('tr');
const input = document.createElement('input');

body.className = 'background-color-aqua';

divRoot.style.padding = '1rem';
divRoot.insertAdjacentHTML('beforebegin', '<h1>Hi, bro!</h1>');
divRoot.insertAdjacentHTML('afterend', '<a href=../second_page/index.html id="next-page-link">Check another little page here!</a>');

p.innerHTML = '<span>Added to paragraph with <b></b>, changed color with className, changed fontSize with style, changed background color with data-attribute</span>';
p.querySelector('b').innerHTML = 'innerHTML';
p.style.fontSize = '1.5rem';
p.style.paddingTop = '2rem';
p.dataset.backgroundColor = 'red';

setInterval(() => p.classList.toggle('color-red'), 2000);

divRoot.append(p)

article.style = `
    padding: 1rem;
    width: 35rem;
    height: 35rem;
    background-color: yellow;
    border: 1px solid blue;
`;

article.innerText = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
Aperiam at natus quis esse velit nulla eius a error modi, reiciendis hic, maiores animi ab sint sequi dolorem non inventore, 
ad consequatur nobis ullam ut. Corporis, pariatur similique ipsam repellat, eligendi dolorem sapiente reiciendis voluptatibus modi 
voluptatem amet reprehenderit facilis veritatis?`;

divRoot.prepend(article);

article.addEventListener('mouseover', e => {
    article.classList.toggle('color-blue');
});

article.append(articleInnerP);

article.children[3].className = 'underline';

articleInnerP.style = `
    text-align: center;
    padding-top: 1rem;
`;

articleInnerP.innerText = 'Move mouse here';

divRoot.firstElementChild.style.fontSize = '2rem';

article.nextElementSibling.classList.add('underline');

if (articleInnerP.firstChild.nodeType === 3) {
    articleInnerP.style.fontSize = '4rem';
    setInterval(() => articleInnerP.hidden = !articleInnerP.hidden, 1000);
};

divRoot.append(table);

table.insertAdjacentHTML('afterbegin', '<h2>Watch this.</h2>');
table.style.marginBottom = '30rem';

table.append(tr);

for (let i = 0; i < 4; i++) {
    tr.append(document.createElement('td'));
}

tr.lastElementChild.addEventListener('click', e => {
    tr.lastElementChild.classList.toggle('font-size-4rem');
    window.scrollBy(0,350);
});

tr.getElementsByTagName('td').className = 'border-1px-dotted';

tr.lastChild.className = 'underline';

for (let td of tr.children) {
    td.innerText = 'Some text';

    td.style = `
    border: 1px dotted black;
    padding: 1rem;
    `;

    if (td.matches('.underline')) {
        td.innerText = 'CLICK ME';
    };
};

tr.closest('table').style.backgroundColor = 'aqua';

table.before(input);

input.style = `
    margin-top: 1rem;
    width: 30%;
    height: 3rem;
    font-size: 1rem;
    text-align: center;
`;

input.type = 'password';

if (!input.getAttribute('maxLength')) {
    input.setAttribute('maxLength', '13')
};

if (!input.hasAttribute('placeholder')) {
    input.setAttribute('placeholder', 'Type your password here');
};

article.after(ul)

ul.style.paddingTop = '2rem';

for (let i = 0; i < 4; i++) {
    ul.append(document.createElement('li'));
}

for (let li of ul.children) {
    li.innerText = 'Same text has all li thanks to "for" loop';
    li.className = 'color-blue';
};

ul.lastElementChild.classList.remove('color-blue');
ul.lastElementChild.innerText = 'But I have my own text and no class';

if (ul.clientWidth < 1000) {
    ul.className = 'text-align-right';
};

const mainLink = document.getElementById('next-page-link');
mainLink.dataset.backgroundColor = 'white';
mainLink.style.fontSize = '2rem';
  
















