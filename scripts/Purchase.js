class Purchase {
    selectors = {
        dessertList: '[data-dessert-list]',
        buyButton: '[data-js-buy-button]'
    }
    
    constructor() {
        this.dessertList = document.querySelector(this.selectors.dessertList)

        this.bindEvents()
    }

    onBtnClick = (event) => {
        const element = event.target
        const button = element.closest(this.selectors.buyButton)

        if (!button) return

        new AddDecrement(button)
    }

    bindEvents() {
        this.dessertList.addEventListener('click', this.onBtnClick)
    }
}

class AddDecrement {

    selectors = {
        incrementIcon: '[data-js-increment]',
        decrementIcon: '[data-js-decrement]',
        quantity: '[data-js-quantity]',
        component: '[data-js-component]',
        cartList: '[data-js-cart-list]',
    }

    constructor(button) {
        this.button = button;
        this.cartList = document.querySelector(this.selectors.cartList)

        this.replaceButton()
        this.bindEvents()
    }

    replaceButton() {
        this.newButton = document.createElement('button')
        this.newButton.classList.add('button', 'button--add-decrement', 'button--component')
        this.newButton.setAttribute('data-js-add-decrement', '')
        this.newButton.innerHTML = 
        `
            <span class="button--add-decrement__decrement" data-js-decrement>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
            </span>
            <span class="quantity" data-js-quantity>1</span>
            <span class="button--add-decrement__increment" data-js-increment>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
            </span>
         `

        this.button.replaceWith(this.newButton)
        this.incrementIcon = this.newButton.querySelector(this.selectors.incrementIcon)
        this.decrementIcon = this.newButton.querySelector(this.selectors.decrementIcon)
        this.quantity = this.newButton.querySelector(this.selectors.quantity)

        this.component = this.newButton.closest(this.selectors.component)

        new Item(this.component, this.quantity)

    }

    onIncrement = () => {
        this.quantity.textContent++;
        new Item(this.component, this.quantity)
    }

    onDecrement = () => {
        if (this.quantity.textContent - 1 == 0) {
            this.quantity.textContent = 0
            this.newButton.replaceWith(this.button)
        }
        else {
            this.quantity.textContent--
            
        }
        new Item(this.component, this.quantity)
    }

    bindEvents() {
        this.incrementIcon.addEventListener('click', this.onIncrement)
        this.decrementIcon.addEventListener('click', this.onDecrement)
    }
}

class Item {

    static items = {}

    selectors = {
        cartList: '[data-js-cart-list]',
        name: '[data-js-component-name]',
        price: '[data-js-component-price]',
        total: '[data-js-total]',
        item: '[data-js-item]',
        itemName: '[data-js-item-name]',
        cartMain: '[data-js-cart-main]',
        totalPrice: '[data-js-total-price]',
        itemCount: '[data-js-item-count]'
    }
    
    constructor(component, quantity) {
        this.cartList = document.querySelector(this.selectors.cartList)
        this.component = component
        this.quantity = quantity
        this.name = this.component.querySelector(this.selectors.name)
        this.price = this.component.querySelector(this.selectors.price)

        this.createItem()
    }

    createItem() {

        if (!(this.name.textContent in Item.items)) {
            this.cartItem = document.createElement('li')
            this.cartItem.classList.add('cart__item', 'item')
            this.cartItem.setAttribute('data-js-item', '')

            this.cartItem.innerHTML += `
                <div class="item__main">
                    <p class="item__name" data-js-item-name>${this.name.textContent}</p>
                    <div class="item__details">
                        <p class="item__count" data-js-item-count>${this.quantity.textContent}x</p>
                        <p class="item__price">${this.price.textContent}</p>
                        <div class="item__total-price" data-js-total>${this.calc()}</div>
                    </div>
                </div>
                <div class="item__cancel">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                </div>
            `    
            this.cartList.append(this.cartItem) 
            
            this.updateTotal()
            Item.items[this.name.textContent] = this.cartItem
        }

        else {
            this.card = Item.items[this.name.textContent]

            this.updatePrice()
        }

    }

    updatePrice = () => {
        const priceField = this.card.querySelector(this.selectors.total)
        const countFeild = this.card.querySelector(this.selectors.itemCount)

        countFeild.textContent = this.quantity.textContent + 'x'

        if (this.quantity.textContent == 0) {
            this.card.remove()
            // console.log(this.name)
            delete Item.items[this.name.textContent] 
        }
        else {
            priceField.textContent = this.calc()

        }

        this.updateTotal()
    }

    updateTotal = () => {
        const cartMain = document.querySelector(this.selectors.cartMain)
        const totalPrice = cartMain.querySelector(this.selectors.totalPrice)
        const productPrices = this.cartList.querySelectorAll(this.selectors.total)
        const sum = [...productPrices].reduce((acc,curr) => acc + parseFloat(curr.textContent), 0)

        totalPrice.textContent = this.calc(sum)
    }

    calc = (sum) => {
        if (sum) {
            return sum.toFixed(2) + '$'
        }
        return (this.quantity.textContent * parseFloat(this.price.textContent)).toFixed(2) + '$'
    }
}

export default Purchase;