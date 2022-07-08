import './styles/styles.css'

const li = document.createElement('li')
const dropDownListsContainer = document.querySelector('.dropdown-lists-container')
const makeBtn = document.getElementById('make-btn')
const modelBtn = document.getElementById('model-btn')
const yearBtn = document.getElementById('year-btn')
const makeList = document.getElementById('dropdown-make-list')
const modelList = document.getElementById('dropdown-model-list')
const yearList = document.getElementById('dropdown-year-list')
const resultBtn = document.getElementById('result-btn')
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

const carsServerResponseJson = fetch(carsUrl).then((response) => response.json())

const makeBtnDropdownBars = carsServerResponseJson.then(data => {
    let aMakeArray = []
    for (let item of data) {
        if (!aMakeArray.includes(item.make)) {
            aMakeArray.push(item.make)
        }
    }

    arrayAppendToList(aMakeArray, makeList)
})

const btnTargetClassShownToggle = (btn, list, target) => {
    if (target === btn) {
        return list.classList.toggle('shown')
    }
}

const removeBtnClassShown = (btn, list, target) => {
    if (target !== btn && target !== list) {
        return list.classList.remove('shown')
    }
}

dropDownListsContainer.addEventListener('click', event => {
    const target = event.target

    btnTargetClassShownToggle(makeBtn, makeList, target)
    btnTargetClassShownToggle(modelBtn, modelList, target)
    btnTargetClassShownToggle(yearBtn, yearList, target)

    if (target.className === 'inner-text') {
        target.closest('.btn').firstChild.textContent = target.textContent
        target.closest('.dropdown-content').classList.toggle('shown')

        if (target.closest('.btn') === makeBtn) {
            modelBtn.classList.remove('background-grey-disabled')
        }

        if (target.closest('.btn') === modelBtn) {
            yearBtn.classList.remove('background-grey-disabled')
        }

        carsServerResponseJson.then(data => {
            const carsCount = data.length

            let modelsArray = []
            let yearsArray = []

            for (let item of data) {
                if (target.closest('.btn').firstChild.textContent === item.make) {
                    if (!modelsArray.includes(item.model)) {
                        modelsArray.push(item.model)
                    }
                }

                if (target.closest('.btn').firstChild.textContent === item.model) {
                    if (!yearsArray.includes(item.year)) {
                        yearsArray.push(item.year)
                    }
                }
            }

            const sortedYearsArray = yearsArray.sort((a,b) => a - b)

            arrayAppendToList(modelsArray, modelList)
            arrayAppendToList(sortedYearsArray, yearList)

            if (!carsCount) {
                return resultBtn.innerHTML = '<span>There are no ads, come back later</span>'
            }
        
            return resultBtn.innerHTML  = `<span>View <span class='color-aqua'>${carsCount}</span> available ads</span>`
        })
    }
})

window.addEventListener('click', event => {
    const target = event.target
    removeBtnClassShown(makeBtn, makeList, target)
    removeBtnClassShown(modelBtn, modelList, target)
    removeBtnClassShown(yearBtn, yearList, target)
})