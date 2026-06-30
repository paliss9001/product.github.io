class Population {
    constructor() {
        this.populate()
    }

    populate() {
        fetch('../data.json')
        .then(response => response.json())
        .then(json => {
            
            for (const dessert of json) {
                const {image, name, category, price} = dessert
                // const image = imageCollection

                new Component(image, name, category, price)
            }
        })
    }

}

class Component {

    selectors = {
        root: '[data-js-list]' 
    }

    classes = {
        componentClass: '[data-js-item]'
    }

    constructor(image, name, category, price) {
        this.root = document.querySelector(this.selectors.root)
        this.image = image
        this.name = name
        this.category = category
        this.price = price

        this.create()
    }

    create() {
        this.root.innerHTML +=
        `<li class="item" data-js-item>
            <div class="item__thumbnail">
              <picture>
                <source srcset=${this.image.desktop} media="(min-width: 1440px)">

                <source srcset=${this.image.tablet} media="(min-width: 1023px)">

                <img src="${this.image.mobile}">
              </picture>
              <button class="button item__thumbnail-button" data-js-button>
                <span class="icon icon--cart">Add to Cart</span>
              </button>
            </div>
            <div class="item__description" data-js-description>
              <p class="item__subtitle">${this.category}</p>
              <p class="item__title" data-js-item-title>${this.name}</p>
              <p class="item__price" data-js-item-price>${this.price.toFixed(2)}$</p>
            </div>
          </li>`
    }
}

export default Population