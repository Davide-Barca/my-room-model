import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import World from './World/World.js'
import Renderer from './Renderer.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'

let instance = null

export default class Application{
    constructor(canvas){
        if(instance){
            return instance
        }

        instance = this

        // Oprtions
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()

        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.resources = new Resources(sources)
        this.world = new World()
        this.renderer = new Renderer()


        // Events
        this.sizes.on('resize', () => {
            this.resize()
        })

        this.time.on('tick', () => {
            this.update()
        })
    }

    resize(){
        this.sizes.resize()
        this.camera.resize()
        this.renderer.resize()
    }

    update(){
        this.camera.update()
        this.renderer.update()
    }
}