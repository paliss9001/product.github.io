
class Cart {
    selectors = {
        list: '[data-js-cart-list]',
        contents: '[data-js-description]',
        itemWrapper: '[data-js-item]',
        dessertButton: '[data-js-button]',
        price: '[data-js-item-price]',
        title: '[data-js-item-title]'
    }

    constructor() {
        this.root = document.querySelector(this.selectors.list)
        this.list = document.querySelector(this.selectors.list)
    
        this.bindEvents()
    }

    bindEvents() {
        document.addEventListener('click', this.createItem)
    }

    createItem = (event) => {
        const element = event.target
        const button = element.closest('[data-js-button]')

        if (!button) return

        const parent = button.closest(this.selectors.itemWrapper)
        const contentWrapper = parent.querySelector(this.selectors.contents)
    
        const title = contentWrapper.querySelector(this.selectors.title)
        const price = contentWrapper.querySelector(this.selectors.price)
    
        const li = document.createElement('li')
        li.classList.add('cart__item')
        li.innerHTML = `
            <article class="product-card">
            <p class="product-card__name">${title.textContent}</p>
            <div class="product-card__details">
                <div class="product-card__count">1x</div>
                <div class="product-card__price">$${price.textContent}</div>
                <div class="product-card__total">$28.00</div>
            </div>
            </article>
            <button class="cancel">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
            </button>
        `
        this.list.append(li)
    }
}

export default Cart