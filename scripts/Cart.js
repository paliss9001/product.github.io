// class Cart {

//     cards = {

//     }

//     selectors = {
//         btnAddDecr: '[data-js-add-decrement]',
//         dessertsList: '[data-dessert-list]',
//         buttonQuantity: '[data-js-quantity]',
//         component: '[data-js-component]',
//         name: '[data-js-component-name]',
//         price: '[data-js-component-price]',
//         cartList: '[data-js-cart-list]'
//     }
    
//     constructor(btn) {
//         this.btn = btn
//         this.component = this.btn.closest(this.selectors.component)
//         this.name = this.component.querySelector(this.selectors.name).textContent
//         this.price = this.component.querySelector(this.selectors.price)
//         this.count = this.btn.querySelector(this.selectors.buttonQuantity).textContent
//         this.cartList = document.querySelector(this.selectors.cartList)

//         this.cards[this.name] = Number(this.count)
//         this.createItem()
//     }

//     createItem() {  
//         console.log(this.cards)
//     }
// }

// export default Cart