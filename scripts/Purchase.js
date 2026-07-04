const desserts = []

let id = 0;
let total = 0
let overall = 0


const emptyCart = document.querySelector('[data-js-empty-cart-wrapper]')
const mainCart = document.querySelector('[data-js-cart-main]')
const cartItemCOunt = document.querySelector('[data-js-cart-items-count]')

class Radio {

    selectors = {
        cartList: '[data-js-cart-list]',
        dessertList: '[data-dessert-list]',

        component: '[data-js-component]',

        purchaseButton: '[data-js-buy-button]',
        cartButton: '[data-js-cart-button]',

        confirmation: '[data-js-confirmation]',

        
    }

    constructor() {
        this.cartList = document.querySelector(this.selectors.cartList)
        this.dessertList = document.querySelector(this.selectors.dessertList)
        this.cartButton = document.querySelector(this.selectors.cartButton)
        this.confirmation = document.querySelector(this.selectors.confirmation)
        

        this.bindEvents()
    }

    onButtonClick = (event) => {
        this.addToCartbutton = event.target.closest(this.selectors.purchaseButton)

        if (!this.addToCartbutton) return

        this.component = this.addToCartbutton.closest(this.selectors.component)

        new ToggleButton(this.addToCartbutton, this.component.dataset.id)
    }

    onCartButtonClick = (event) => {
        this.confirmation.classList.remove('visually-hidden')

        new PurchasedItems()
    }

    bindEvents() {
        this.dessertList.addEventListener('click', this.onButtonClick)
        this.cartButton.addEventListener('click', this.onCartButtonClick)
    }
}

class PurchasedItems {
    selectors = {
        confirmationRoot: '[data-js-confirmation]',
        confirmationList: '[data-js-confirmation-list]',
        confirmationTotal: '[data-js-confirmation-total]',

        itemCount: '[data-js-item-count]',
        itemTotal: '[data-js-total]',
        itemName: '[data-js-item-name]',

        newOrder: '[data-js-new-order]'
    }

    constructor() {
        this.confirmationRoot = document.querySelector(this.selectors.confirmationRoot)
        this.confirmationList = document.querySelector(this.selectors.confirmationList)
        this.confirmationTotal = this.confirmationRoot.querySelector(this.selectors.confirmationTotal)
        this.newOrder = this.confirmationRoot.querySelector(this.selectors.newOrder)
        
        this.createItem()
        this.bindEvents()
    }

    createItem = () => {
        for (const dessert of desserts) {
            if (dessert['count'] > 0) {
                const price = dessert['price']
                this.count = dessert['count']
                this.total = (price * this.count).toFixed(2) + '$'
                this.name = dessert['name']
                this.image = dessert['image']


                this.listElement = document.createElement('li')
                this.listElement.classList.add('cart__item', 'item--order-confirmation', 'item')

                this.listElement.innerHTML = `
                    <img src="${this.image}" alt="">
                    <div class="item__main">
                        <p class="item__name" data-js-item-name>Classic Tiramisu</p>
                        <div class="item__details">
                            <p class="item__count" data-js-item-count>1x</p>
                            <p class="item__price">$5.50</p>
                        </div>
                    </div>
                    <div class="item__total-price--order-confirmation" data-js-total>$5.50</div>
                `

                this.itemCount = this.listElement.querySelector(this.selectors.itemCount)
                this.itemTotal = this.listElement.querySelector(this.selectors.itemTotal)
                this.itemName = this.listElement.querySelector(this.selectors.itemName)
                
                this.update()
                this.confirmationList.append(this.listElement)
            }
        }
    }
    
    update = () => {
        this.itemCount.textContent = this.count + 'x'
        this.itemTotal.textContent = this.total 
        this.itemName.textContent = this.name
        this.confirmationTotal.textContent = overall.toFixed(2) + '$'
    }

    bindEvents() {
        this.newOrder.addEventListener('click', () => {
            window.location.reload()
        })
    }
}

class ToggleButton {

    selectors = {
        cartList: '[data-js-cart-list]',
        incrementIcon: '[data-js-increment]',
        decrementIcon: '[data-js-decrement]',

        quantity: '[data-js-quantity]',

        itemPrice: '[data-js-item-price]',
        itemCount: '[data-js-item-count]',
        itemTotal: '[data-js-total]',
        itemCancel: '[data-js-cancel]',

        emptyCartWrapper: '[data-js-empty-cart-wrapper]',
        cartMain: '[data-js-cart-main]',

        totalPriceAll: '[data-js-total-price-all]'
    }

    constructor(addToCartbutton,id) {
        this.id = id
        this.addToCartbutton = addToCartbutton
        this.originalButton = this.addToCartbutton
        this.cartList = document.querySelector(this.selectors.cartList)
        this.totalPriceAll = document.querySelector(this.selectors.totalPriceAll)

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

        this.createItem()
    }

    updateValues = () => {
        this.quantity.textContent = desserts[this.id]['count']
        this.itemCount.textContent = desserts[this.id]['count'] + 'x'
        this.itemPrice.textContent = desserts[this.id]['price'].toFixed(2)
        this.itemTotal.textContent = this.calculateTotal()
        this.totalPriceAll.textContent = this.formatter(this.overall())

        cartItemCOunt.textContent = this.calculateTotalItems()
        console.log(this.cartList.children.length)
    }

    onIncrement = (event) => {
        desserts[this.id]['count']++
        this.updateValues()
    }

    onDecrement = (event) => {
        if (desserts[this.id]['count'] - 1 <= 0) {
            this.listElement.remove()
            this.toggleButton.replaceWith(this.originalButton)
            
            this.trackEmpty()
        }
        desserts[this.id]['count']--
        this.updateValues()
    }

    createItem = () => {
        this.listElement = document.createElement('li')
        this.listElement.classList.add('cart__item', 'item')

        this.listElement.innerHTML = `
            <div class="item__main">
                <p class="item__name">${desserts[this.id]['name']}</p>
                <div class="item__details">
                    <p class="item__count" data-js-item-count>${desserts[this.id]['count']}x</p>
                    <p class="item__price" data-js-item-price>${desserts[this.id]['price']}</p>
                    <div class="item__total-price" data-js-total>${this.calculateTotal()}</div>
                </div>
            </div>
            <div class="item__cancel" data-js-cancel>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
            </div>
        `

        
        this.itemPrice = this.listElement.querySelector(this.selectors.itemPrice)
        this.itemCount = this.listElement.querySelector(this.selectors.itemCount)
        this.itemTotal = this.listElement.querySelector(this.selectors.itemTotal)
        this.cancel = this.listElement.querySelector(this.selectors.itemCancel)

        this.cartList.append(this.listElement)
        this.updateState()
        this.updateValues()
    }

    bindEvents = () => {
        this.incrementIcon.addEventListener('click', this.onIncrement)
        this.decrementIcon.addEventListener('click', this.onDecrement)
        this.cancel.addEventListener('click', this.onCancel)
    }

    updateState = () => {
        emptyCart.classList.remove('is-empty')
        mainCart.classList.add('is-active')
    }

    trackEmpty = () => {
        if (this.cartList.children.length == 0) {
                emptyCart.classList.add('is-empty')
                mainCart.classList.remove('is-active')
        }
    }

    onCancel = () => {
        this.toggleButton.replaceWith(this.originalButton)
        desserts[this.id]['count'] = 0
        this.listElement.remove()

        this.updateValues()
        this.trackEmpty()
    }

    calculateTotal = () => {
        total = this.formatter(desserts[this.id]['count'] * desserts[this.id]['price'])
        return total

        this.updateValues()
    }

    calculateTotalItems = () => {
        return desserts.reduce((acc, curr) => {
            const {count} = curr

            return acc + count
        }, 0)

    }

    overall = () => {
        
        overall = desserts.reduce((acc, object) => {
            const {price, count} = object

            return acc + (price * count)
        }, 0)

        return overall
    }

    formatter(val) {
        return val.toFixed(2) + '$'
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
                const {name, price, image} = field

                desserts.push({name: name, price: price, count: 0, id: id, image: image.thumbnail})
                
                id++;
            }
            new Radio()
        })
    
    }
}

export default PopulateMap