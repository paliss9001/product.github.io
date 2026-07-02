class Population {

    constructor() {
        this.getData()
    }

    getData() {
        fetch('../data.json')
            .then(response => response.json())
            .then(json => {
                
                for (const dessert of json) {
                    const {name, category, price, image} = dessert

                    new Component(name, category, price, image)
                }
            })
    }
}

class Component {
    selectors = {
        dessertList: '[data-dessert-list]',
    }

    constructor(name, category, price, imageCollection) {
        this.dessertList = document.querySelector(this.selectors.dessertList);
        this.name = name;
        this.category = category
        this.price = price
        this.imageCollection = imageCollection
        this.bindEvents()
        this.populate()
    }

    populate() {
        this.dessertList.innerHTML +=
        `
        <div class="component" data-js-component>
            <div class="component__preview">
                <picture>
                    <source width="250" height="250" media="(min-width: 1023.98px)" srcset=${this.imageCollection.desktop}>
                    <source width="250" height="250" media="(min-width: 767.98px)" srcset=${this.imageCollection.tablet}>
                    
                    <img src=${this.imageCollection.mobile} alt="A responsive descriptive image">
                </picture>
                <button class="button button--component" data-js-buy-button>
                    <span class="icon icon--cart">
                        Add to Cart
                    </span>
                </button>
            </div>
            <div class="component__body">
                <p class="component__subtitle">${this.category}</p>
                <p class="component__title" data-js-component-name>${this.name}</p>
                <p class="component__price" data-js-component-price>${this.price.toFixed(2)}$</p>
            </div>
        </div>
        `
    }

    bindEvents() {

    }
}


 
export default Population;