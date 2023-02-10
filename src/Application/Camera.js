import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Application from './Application.js'

export default class Camera{
    constructor(){
        // Setup
        this.application = new Application()
        this.sizes = this.application.sizes
        this.time = this.application.time
        this.canvas = this.application.canvas
        this.scene = this.application.scene

        this.setInstance()
        this.setOrbitControl()
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.z = 7
        this.instance.position.y = 8
        this.instance.position.x = 7
        this.scene.add(this.instance)

        console.log('camera created')
    }

    setOrbitControl(){
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        // Limit vertical movement
        this.controls.maxPolarAngle = Math.PI / 2
        // Limit zoom in and zoom out
        this.controls.minDistance = 8
        this.controls.maxDistance = 15
        // Smooth movement
        this.controls.rotateSpeed = 0.2
        this.controls.zoomSpeed = 0.2
        // Pan movement disabled
        this.controls.enablePan = false
    }

    resize(){
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update(){
        this.controls.update()
    }
}