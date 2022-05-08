const divRoot = document.getElementById('root');
const innerRootDiv1 = document.createElement('div');
const innerRootDiv2 = innerRootDiv1.cloneNode();
const innerRootDiv3 = innerRootDiv1.cloneNode();
const innerRootDiv4 = innerRootDiv1.cloneNode();
const innerRootDiv5 = innerRootDiv1.cloneNode();
const innerRootDiv6 = innerRootDiv1.cloneNode();
const innerRootDiv7 = innerRootDiv1.cloneNode();
const innerRootDiv8 = innerRootDiv1.cloneNode();
const innerRootDiv9 = innerRootDiv1.cloneNode();

divRoot.insertAdjacentHTML('afterend', '<a href=../first_page/index.html id="next-page-link">Back to another page!</a>');

divRoot.append(
    innerRootDiv1, 
    innerRootDiv2,
    innerRootDiv3,
    innerRootDiv3,
    innerRootDiv4,
    innerRootDiv5,
    innerRootDiv6,
    innerRootDiv7,
    innerRootDiv8,
    innerRootDiv9,
);

for (let divs of divRoot.childNodes) {
    divs.className = 'root-divs-styles';
    divs.innerText = 'Click';
    divs.style.fontSize = '0.8rem';
};

let selectedDiv;

function divChangeColor(node) {
    if (selectedDiv) {
        selectedDiv.classList.remove('background-yellow');
    };

    selectedDiv = node;
    selectedDiv.classList.add('background-yellow');
}

divRoot.onclick = function(event) {
    let target = event.target;

    while (target != this) {
        if (target.tagName === 'DIV') {
          divChangeColor(target);
          return;
        };
        target = target.parentNode;
    };
};