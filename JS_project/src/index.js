import './styles/styles.css'

const allDropdownBtns = document.querySelectorAll('.dropdown-btn')
const makeBtn = document.querySelector('.make-btn')
const modelBtn = document.querySelector('.model-btn')
const yearBtn = document.querySelector('.year-btn')
const resultBtn = document.querySelector('.result-btn')
const carsUrl = 'http://localhost:3000/cars'

const resultBtnInnerText = fetch(carsUrl)
    .then((response) => response.json())
    .then(data => {
        const carAdsAmount = () => {
            let count = 0;

            for (let item of data) {
                for (let innerItem of Object.values(item)) {
                    count += innerItem.length
                }
            }
            return count
        }
        
        if (!carAdsAmount()) {
            return resultBtn.innerHTML = '<span>There are no ads, come back later</span>'
        }

        return resultBtn.innerHTML  = `<span>View <span class='color-aqua'>${carAdsAmount()}</span> available ads</span>`
    })


        

