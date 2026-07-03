let desserts = []
let id = 0;

class Cart {

    selectors = {
        cartList: '[data-js-cart-list]',
        dessertList: '[data-dessert-list]',

        component: '[data-js-component]',

        purchaseButton: '[data-js-buy-button]'
    }

    constructor() {
        this.cartList = document.querySelector(this.selectors.cartList)
        this.dessertList = document.querySelector(this.selectors.dessertList)

        this.bindEvents()
    }

    onButtonClick = (event) => {
        this.addToCartbutton = event.target.closest(this.selectors.purchaseButton)

        if (!this.addToCartbutton) return

        this.component = this.addToCartbutton.closest(this.selectors.component)

        new ToggleButton(this.addToCartbutton, this.component.dataset.id)
    }

    bindEvents() {
        this.dessertList.addEventListener('click', this.onButtonClick)
    }
}

class ToggleButton {

    selectors = {
        cartList: '[data-js-cart-list]',
        incrementIcon: '[data-js-increment]',
        decrementIcon: '[data-js-decrement]',

        quantity: '[data-js-quantity]'
    }

    constructor(addToCartbutton,id) {
        this.id = id
        this.addToCartbutton = addToCartbutton
        this.originalButton = this.addToCartbutton

        this.replaceButton()    
        this.bindEvents()
    }

    replaceButton = () => {
        this.toggleButton = document.createElement('button')
        this.toggleButton.classList.add('button', 'button--add-decrement')
        desserts[this.id]['count']++;
        
        this.toggleButton.innerHTML = `
            <span class="button--add-decrement__decrement" data-js-decrement>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
            </span>
            <span class="quantity" data-js-quantity>1</span>
            <span class="button--add-decrement__increment" data-js-increment>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
            </span>
        `

        this.addToCartbutton.replaceWith(this.toggleButton)
    
        this.quantity = this.toggleButton.querySelector(this.selectors.quantity)
        this.incrementIcon = this.toggleButton.querySelector(this.selectors.incrementIcon)
        this.decrementIcon = this.toggleButton.querySelector(this.selectors.decrementIcon)

    }

    updateValues = () => {
        this.quantity.textContent = desserts[this.id]['count']
    }

    onIncrement = (event) => {
        desserts[this.id]['count']++
        this.updateValues()
    }

    onDecrement = (event) => {
        if (desserts[this.id]['count'] - 1 <= 0) {
            this.toggleButton.replaceWith(this.originalButton)
        }
        
        desserts[this.id]['count']--
        this.updateValues()
    }

    bindEvents = () => {
        this.incrementIcon.addEventListener('click', this.onIncrement)
        this.decrementIcon.addEventListener('click', this.onDecrement)
    }
}

class PopulateMap {
    
    constructor() {

        this.init()
    }

    init() {
        fetch('../data.json')
        .then(response => response.json())
        .then(json => {
            for (const field of json) {
                const {name, price} = field

                desserts.push({name: name, price: price, count: 0, id: id})

                id++;
            }
            new Cart()
        })
    
    }
}

export default PopulateMap