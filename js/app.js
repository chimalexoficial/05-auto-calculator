// const make = document.querySelector('#make');
// const year = document.querySelector('#year');
// const startYear = 2000;
// const actualYear = new Date().getFullYear();

// make.addEventListener('change', (e) => {
// console.log(e.target.value);
// });

// for(let i = startYear; i < actualYear+1; i++) {
//     let option = document.createElement('option');
//     option.value = i;
//     option.textContent = i;
//     year.append(option)

// }

// Constructor
function Insurance(make, year, type) {
    this.make = make;
    this.year = year;
    this.type = type;
}

Insurance.prototype.getQuote = function () {
    /*
    1 = American 1.15
    2 = Asian 1.05
    3 = European 1.35
    */

    let quantity;
    const base = 2000;

    switch (this.make) {
        case '1':
            quantity = base * 1.15;
            break;
        case '2':
            quantity = base * 1.05;
            break;
        case '3':
            quantity = base * 1.35;
            break;
        default:
            break;
    }
    const difference = new Date().getFullYear() - this.year;
    quantity -= ((difference * 3) * quantity) / 100;

    // If basic * 30% more
    //If full * 50% more

    if (this.type === 'basic') {
        quantity *= 1.30;
    } else {
        quantity *= 1.50;
    };

    return quantity;


}

function UI() {

}

// Years field
UI.prototype.fillOptions = () => {
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.showMessage = (message, type) => {
    const div = document.createElement('div');
    const form = document.querySelector('#quote-insurance');

    if (type === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('success');
    }

    div.classList.add('message', 'mt-10');
    div.textContent = message;

    form.insertBefore(div, document.querySelector('#result'));

    setTimeout(() => {
        div.remove();
    }, 1000)
};

UI.prototype.showResult = (insurance, total) => {
    const div = document.createElement('div');
    div.classList.add('mt-10');
    const { make, year, type } = insurance;

    let makeString;
    switch (make) {
        case '1':
            makeString = 'American'
            break;
        case '2':
            makeString = 'Asian'
            break;
        case '3':
            makeString = 'European'
            break;
        default:
            break;
    }
    div.innerHTML = `
    <p class='header'>Your results</p>
    <p class='font-bold'>Make: <span class="font-normal">${makeString}</span></p>
    <p class='font-bold'>Year: <span class="font-normal">${year}</span></p>
    <p class='font-bold'>Total: <span class="font-normal">${total}</span></p>
    `;

    const result = document.querySelector('#result');

    const spinner = document.querySelector('#loading');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        result.appendChild(div);

    }, 1000)
}

const ui = new UI();
console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
    ui.fillOptions();
});

eventListeners();

function eventListeners() {
    const form = document.querySelector('#quote-insurance');
    form.addEventListener('submit', checkQuote);
}

function checkQuote(e) {
    e.preventDefault();

    // Make selector
    const make = document.querySelector('#make').value;
    console.log(make);

    // Year selector
    const year = document.querySelector('#year').value;
    console.log(year);

    // Type
    const type = document.querySelector('input[name="type"]:checked').value;
    console.log(type);

    if (make === '' || year === '' || type === '') {
        ui.showMessage('Please, check again the fields',
            'error');
        return;
    }

    console.log('Getting quote');
    ui.showMessage('Getting quote... Please wait...', 'success');

    const results = document.querySelector('#result div');
    if (results != null) {
        results.remove();
    }

    const insurance = new Insurance(make, year, type);
    insurance.getQuote();
    const total = insurance.getQuote();

    ui.showResult(insurance, total);
};

// function cleanHTML(element) {
//     while(element.firstChild) {
//         element.remove(element.firstChild);
//     }
// }