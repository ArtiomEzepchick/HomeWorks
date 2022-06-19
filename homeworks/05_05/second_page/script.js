const divRoot = document.getElementById('root');

divRoot.insertAdjacentHTML('afterend', '<a href=../first_page/index.html id="next-page-link">Back to another page!</a>');

for (let i = 0; i < 9; i++) {
    divRoot.append(document.createElement('div'));
};

for (let divs of divRoot.childNodes) {
    divs.className = 'root-divs-styles';
    divs.innerText = 'Click';
};

let selectedDiv;

function divChangeColor(node) {
    if (selectedDiv) {
        selectedDiv.classList.remove('background-yellow');
    };

    selectedDiv = node;
    selectedDiv.classList.add('background-yellow');
};

divRoot.onclick = function(event) {
    let target = event.target;

    if (target.tagName === 'DIV') {
        divChangeColor(target);
        return;
    };
};