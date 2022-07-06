import './styles/styles.css'

const li = document.createElement('li')
const dropDownListsContainer = document.querySelector('.dropdown-lists-container')
const dropdownContent = document.querySelector('.dropdown-content')
const makeBtn = document.getElementById('make-btn')
const modelBtn = document.getElementById('model-btn')
const yearBtn = document.getElementById('year-btn')
const makeList = document.getElementById('dropdown-make-list')
const modelList = document.getElementById('dropdown-model-list')
const yearList = document.getElementById('dropdown-year-list')
const resultBtn = document.querySelector('.result-btn')
const carsUrl = 'http://localhost:3000/cars'

const arrayAppendToList = (array, list) => {
    for (let i = 0; i < array.length; i++) {
        list.append(li.cloneNode(true))
    }

    for (let i = 0, li; i < list.children.length; i++) {
        li = list.children[i]
        li.classList.add('inner-text')
        li.append(array[i])
    }

    return array
}

const resultBtnInnerText = fetch(carsUrl)
.then((response) => response.json())
.then(data => {
        const carsCount = data.length
        let aMakeArray = []
        let modelsArray = []
        let yearsArray = []

        for (let item of data) {
            if (!aMakeArray.includes(item.make)) {
                aMakeArray.push(item.make)
            }

            if (!modelsArray.includes(item.model)) {
                modelsArray.push(item.model)
            }

            if (!yearsArray.includes(item.year)) {
                yearsArray.push(item.year)
            }
        }

        const sortedYearsArray = yearsArray.sort((a,b) => a - b)

        arrayAppendToList(aMakeArray, makeList)
        arrayAppendToList(modelsArray, modelList)
        arrayAppendToList(sortedYearsArray, yearList)

        for (let item of aMakeArray) {
            if (makeBtn.firstChild.textContent.trim() !== item) {
                modelBtn.classList.add('btn-background-grey')
            }
        }

        for (let item of modelsArray) {
            if (modelBtn.firstChild.textContent.trim() !== item) {
                yearBtn.classList.add('btn-background-grey')
            }
        }
        
        if (!carsCount) {
            return resultBtn.innerHTML = '<span>There are no ads, come back later</span>'
        }

        return resultBtn.innerHTML  = `<span>View <span class='color-aqua'>${carsCount}</span> available ads</span>`
})

const btnTargetClassesToggle = (btn, list, target) => {
    if (target === btn) {
        return list.classList.toggle('shown')
    }
}

dropDownListsContainer.addEventListener('click', event => {
    const target = event.target

    btnTargetClassesToggle(makeBtn, makeList, target)
    btnTargetClassesToggle(modelBtn, modelList, target)
    btnTargetClassesToggle(yearBtn, yearList, target)

    if (target.className === 'inner-text') {
        target.closest('.btn').firstChild.textContent = target.textContent
        target.closest('.dropdown-content').classList.toggle('shown')
    }
})