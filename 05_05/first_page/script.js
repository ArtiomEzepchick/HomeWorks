const body = document.querySelector('body'); // можно было присвоить переменной и с помощью document.body;
const divRoot = document.getElementById('root');
const p = document.createElement('p');
const article = document.createElement('article');
const articleInnerP = document.createElement('p');
const link = document.createElement('a');
const ul = document.createElement('ul');
const li1 = document.createElement('li');
const li2 = li1.cloneNode();
const li3 = li1.cloneNode();
const li4 = li1.cloneNode();
const table = document.createElement('table');
const tr = document.createElement('tr');
const td1 = document.createElement('td');
const td2 = td1.cloneNode();
const td3 = td1.cloneNode();
const td4 = td1.cloneNode();
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

tr.append(td1);
tr.append(td2);
tr.append(td3);
tr.append(td4);

tr.lastElementChild.addEventListener('click', e => {
    tr.lastElementChild.classList.toggle('font-size-4rem');
    window.scrollBy(0,200);
});

tr.getElementsByTagName('td').className = 'border-1px-dotted';

td1.innerText = 'Some text';
td2.innerText = 'More text';
td3.innerText = td1.innerText;
td4.className = 'underline';

for (let td of tr.children) {
    td.style = `
    border: 1px dotted black;
    padding: 1rem;
    `;

    if (td.matches('.underline')) {
        td.innerText = 'CLICK ME';
    };
};

td2.closest('table').style.backgroundColor = 'aqua';

table.before(input);

input.style = `
    margin-top: 1rem;
    width: 30%;
    height: 3rem;
    font-size: 1rem;
    text-align: center;
`;

input.type = 'password';
input.maxLength;

if (input.getAttribute('maxLength') === null) {
    input.setAttribute('maxLength', '13')
};

if (input.hasAttribute('placeholder') === false) {
    input.setAttribute('placeholder', 'Type your password here');
};

article.after(ul)

ul.style.paddingTop = '2rem';

ul.append(li1)
ul.append(li2)
ul.append(li3)
ul.append(li4)

for (let li of ul.children) {
    li.innerText = 'Same text has all li thanks to cycle "for"';
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
  
















