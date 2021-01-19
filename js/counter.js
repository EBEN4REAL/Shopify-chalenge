class MyCounter extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"})
    }
    get count() {
        return  this.getAttribute('count')
    }
    set count (val) {
        this.setAttribute('count', val)
    }
    static get observedAttributes() {
        return ["count"]
    }
    incrementCount() {
        this.count++
    }
    attributeChangedCallback(prop, oldValue, newValue) {
        if(prop === 'count') {
            this.render()
            this.shadow.querySelector('#btn').addEventListener('click', this.incrementCount.bind(this))
        }
    }

    connectedCallback() {
        this.render()
        this.shadow.querySelector('#btn').addEventListener('click', this.incrementCount.bind(this))
    }

    render() {
        this.shadow.innerHTML = `
            <h1>Counter</h1>
            ${this.count}
            <button id='btn'>Increment</button>
        `
    }
}

customElements.define('my-counter', MyCounter)

