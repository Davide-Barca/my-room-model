import * as THREE from 'three'

import Application from "./Application.js";

export default class Renderer{
    constructor(){
        // setup
        this.application = new Application()
        this.sizes = this.application.sizes
        this.canvas = this.application.canvas
        this.camera = this.application.camera
        this.scene = this.application.scene

        this.setInstance()
    }

    setInstance(){
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        })
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(this.sizes.pixelRatio)
        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.setClearColor('#525252')

        console.log('renderer created')
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(this.sizes.pixelRatio)
    }

    update(){
        this.renderer.render(this.scene, this.camera.instance)
    }
}