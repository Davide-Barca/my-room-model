import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter{
    constructor(){
        super()

        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () => {
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.trigger('resize')
        })

        console.log('sizes created')
    }
    
    resize(){
        this.width = window.innerWidth
        this.height = window.innerHeight

        console.log('resize')
    }
}