import './styles/styles.css'
import './styles/header.css'
import './styles/main.css'
import './styles/footer.css'

const li = document.createElement('li')
const dropDownListsContainer = document.querySelector('.dropdown-lists-container')
const makeBtn = document.getElementById('make-btn')
const modelBtn = document.getElementById('model-btn')
const yearBtn = document.getElementById('year-btn')
const makeList = document.getElementById('dropdown-make-list')
const modelList = document.getElementById('dropdown-model-list')
const yearList = document.getElementById('dropdown-year-list')
const resultBtn = document.getElementById('result-btn')
const resetBtn = document.getElementById('reset-btn')
const makeBtnOriginTextContent = makeBtn.firstChild.textContent
const modelBtnOriginTextContent = modelBtn.firstChild.textContent
const yearBtnOriginTextContent = yearBtn.firstChild.textContent
const carsUrl = 'http://localhost:3000/cars'
const carsServerResponseParsed = fetch(carsUrl).then((response) => response.json())
let temporaryCount = 0;

const arrayAppendToList = (array, list) => {
    for (let i = 0; i < array.length; i++) {
        list.append(li.cloneNode(true))
    }

    for (let i = 0, li; i < list.children.length; i++) {
        li = list.children[i]
        li.classList.add('dropdown-content')
        li.append(array[i])
    }

    return array
}

const btnInnerTextChange = (btn, list, event) => {
    const target = event.target
    
    list.classList.toggle('shown')

    if (target.className === 'dropdown-content') {
        btn.firstChild.textContent = ''
        btn.firstChild.textContent = target.textContent

        if (btn === makeBtn) {
            modelBtn.classList.remove('background-grey')

            if (modelBtn.firstChild.textContent !== modelBtnOriginTextContent) {
                modelBtn.firstChild.textContent = modelBtnOriginTextContent
                yearBtn.firstChild.textContent = yearBtnOriginTextContent
                yearBtn.classList.add('background-grey')
            }
        }

        if (btn === modelBtn) {
            yearBtn.classList.remove('background-grey')
            yearBtn.firstChild.textContent = yearBtnOriginTextContent
        }
    }
}

const btnDropdownBarsAppend = (typeOfData, list) => {
    carsServerResponseParsed.then(data => {
        const array = []

        for (let item of data) {
            if (!array.includes(item[typeOfData])) {
                array.push(item[typeOfData])
            }
        }

        arrayAppendToList(array, list)
    })
}

const aMakeBtnDropdownBars = () => {
    btnDropdownBarsAppend('make', makeList)
}

const btnGetInnerText = (btn) => btn.firstChild.textContent.toLowerCase().slice(0, -3)

const removeBtnClassShown = (btn, list, target) => {
    if (target !== btn && target !== list) {
        list.classList.remove('shown')
    }
}

document.addEventListener('DOMContentLoaded', () => carsServerResponseParsed
.then(data => resultBtn.innerHTML = `View <b class = 'color-aqua'>${data.length}</b> ads`))

makeBtn.addEventListener('click', event => {
    let count = 0
    
    if (makeList.children.length !== 0) {
        makeList.innerHTML = ''
    }

    aMakeBtnDropdownBars()
    btnInnerTextChange(makeBtn, makeList, event)

    carsServerResponseParsed.then(data => {
        for (let item of data) {
            if (makeBtn) {
                if (makeBtn.firstChild.textContent === item.make) {
                    ++count
                }
            }
        }

        if (modelBtn.firstChild.textContent !== modelBtnOriginTextContent) {
            count = temporaryCount
        }

        if (count !== 0) {
            resultBtn.innerHTML = `View <b class = 'color-aqua'>${count}</b> ads`
        } 
    })
})

modelBtn.addEventListener('click', event => {
    const target = event.target
    const div = document.createElement('div')
    const modelMessage = document.querySelector('.model-message')

    if (modelList.children.length !== 0) {
        modelList.innerHTML = ''
    }

    if (target === modelBtn) {
        if (modelBtn.classList.contains('background-grey')) {
            if (!modelBtn.contains(modelMessage)) {
                div.classList.add('btn-alert-message', 'model-message')
                div.textContent = `Please ${btnGetInnerText(makeBtn)} first`
                modelBtn.append(div)
            }
        }
    }
    
    carsServerResponseParsed.then(data => {
        let count = 0
        const modelsArray = []

        for (let item of data) {
            if (makeBtn.firstChild.textContent === item.make) {
                if (!modelsArray.includes(item.model)) {
                    modelsArray.push(item.model)
                }
            }
        }

        arrayAppendToList(modelsArray, modelList)
        btnInnerTextChange(modelBtn, modelList, event)

        for (let item of data) {
            if (modelBtn) {
                if (modelBtn.firstChild.textContent === item.model) {
                    ++count
                }
            }
        }

        if (!modelBtn.classList.contains('background-grey')) {
            if (count !== 0) {
                resultBtn.innerHTML = `View <b class = 'color-aqua'>${count}</b> ads`
            } 
    
            if (yearBtn.firstChild.textContent !== yearBtnOriginTextContent) {
                resultBtn.innerHTML = `View <b class = 'color-aqua'>${temporaryCount}</b> ads`
            }
        }
    })
})

yearBtn.addEventListener('click', event => {
    const target = event.target
    const div = document.createElement('div')
    const yearMessage = document.querySelector('.year-message')

    if (yearList.children.length !== 0) {
        yearList.innerHTML = ''
    }

    if (target === yearBtn) {
        if (yearBtn.classList.contains('background-grey')) {
            if (!yearBtn.contains(yearMessage)) {
                div.classList.add('btn-alert-message', 'year-message')
                div.textContent = `Please ${btnGetInnerText(modelBtn)} first`
                yearBtn.append(div)
            }
        }
    }

    carsServerResponseParsed.then(data => {
        let count = 0
        const yearsArray = []

        for (let item of data) {
            if (modelBtn.firstChild.textContent === item.model) {
                if (!yearsArray.includes(item.year)) {
                    yearsArray.push(item.year)
                }
            }
        }

        const sortedYearsArray = yearsArray.sort((a,b) => a - b)

        arrayAppendToList(sortedYearsArray, yearList)
        btnInnerTextChange(yearBtn, yearList, event)

        for (let item of data) {
            if (yearBtn) {
                if (makeBtn.firstChild.textContent === item.make && modelBtn.firstChild.textContent === item.model && +yearBtn.firstChild.textContent === item.year) {
                    count++
                }
            }
        }

        if (count !== 0) {
            resultBtn.innerHTML = `View <b class = 'color-aqua'>${count}</b> ads`
        } 

        temporaryCount = count
    })
})

resultBtn.addEventListener('click', (event) => {
    event.preventDefault()
})

resetBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const target = event.target
    
    if (target === resetBtn) {
        makeBtn.firstChild.textContent = makeBtnOriginTextContent
        modelBtn.firstChild.textContent = modelBtnOriginTextContent
        yearBtn.firstChild.textContent = yearBtnOriginTextContent
        modelBtn.classList.add('background-grey')
        yearBtn.classList.add('background-grey')
        resetBtn.classList.remove('shown')
        carsServerResponseParsed.then(data => resultBtn.innerHTML = `View <b class = 'color-aqua'>${data.length}</b> ads`)
    }
})

window.addEventListener('click', event => {
    const target = event.target
    const modelMessage = document.querySelector('.model-message')
    const yearMessage = document.querySelector('.year-message')

    removeBtnClassShown(makeBtn, makeList, target)
    removeBtnClassShown(modelBtn, modelList, target)
    removeBtnClassShown(yearBtn, yearList, target)

    if (target !== modelBtn && target !== yearBtn) {
        if (modelBtn.contains(modelMessage)) {
            modelBtn.removeChild(modelMessage)
        }

        if (yearBtn.contains(yearMessage)) {
            yearBtn.removeChild(yearMessage)
        }
    }

    if (makeBtn.firstChild.textContent !== makeBtnOriginTextContent) {
        resetBtn.classList.add('shown')
    }
})