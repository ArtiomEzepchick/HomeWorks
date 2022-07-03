import './styles/styles.css'

const allDropdownBtns = document.querySelectorAll('.dropdown-btn')
const li = document.createElement('li')
const dropDownListsContainer = document.querySelector('.dropdown-lists-container')
const makeBtn = document.getElementById('make-btn')
const modelBtn = document.getElementById('model-btn')
const yearBtn = document.getElementById('year-btn')
const makeList = document.getElementById('dropdown-make-list')
const modelList = document.getElementById('dropdown-model-list')
const yearList = document.getElementById('dropdown-year-list')
const resultBtn = document.querySelector('.result-btn')
const carsUrl = 'http://localhost:3000/cars'

makeList.classList.add('hidden')

const resultBtnInnerText = fetch(carsUrl)
.then((response) => response.json())
.then(data => {
        const carsCount = data.length
        let makeBrandsArray = []

        for (let item of data) {
            if (!makeBrandsArray.includes(item.make)) {
                makeBrandsArray.push(item.make)
            }
        }

        for (let i = 0; i < makeBrandsArray.length; i++) {
            makeList.append(li.cloneNode(true))
        }

        for (let i = 0, li; i < makeList.children.length; i++) {
            li = makeList.children[i]
            li.classList.add('hidden')
            li.append(makeBrandsArray[i])
        }
        
        if (!carsCount) {
            return resultBtn.innerHTML = '<span>There are no ads, come back later</span>'
        }

        return resultBtn.innerHTML  = `<span>View <span class='color-aqua'>${carsCount}</span> available ads</span>`
})

dropDownListsContainer.addEventListener('click', event => {
    const target = event.target;
    if (target === makeBtn) {
        for (let elem of makeList.children) {
            elem.classList.toggle('shown')
        }
    }

    if (target === modelBtn) {
        for (let elem of modelBtn.children) {
            elem.classList.toggle('shown')
        }
    }

    if (target === yearBtn) {
        for (let elem of yearList.children) {
            elem.classList.toggle('shown')
        }
    }
    
})

console.log(makeList.children)


        

