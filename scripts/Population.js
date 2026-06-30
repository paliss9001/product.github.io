class Population {
    constructor() {
        this.populate()
    }

    populate() {
        fetch('../data.json')
            .then(response => response.json())
            .then(json => {
                
                for (const dessert of json) {
                    const {image: imageCollection, name, category, price} = dessert
                    const image = imageCollection.desktop

                    const div = document.createElement('div')
                    new Component(image, name, category, price)

                    document.body.append(div)
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
              <img src="${this.image}" class="item__thumbnail-image" width="250" height="280" alt="">
              <button class="button item__thumbnail-button">
                <span class="icon icon--cart">Add to Cart</span>
              </button>
            </div>
            <div class="item__description">
              <p class="item__subtitle">${this.category}</p>
              <p class="item__title">${this.name}</p>
              <p class="item__price">${this.price.toFixed(2)}$</p>
            </div>
          </li>`
    }
}

export default Population