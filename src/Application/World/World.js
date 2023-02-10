import * as THREE from 'three'

import Application from '../Application.js'

export default class World{
    constructor(){
        // setup
        this.application = new Application()
        this.scene = this.application.scene

        this.setCube()
    }

    setCube(){
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        )
        this.scene.add(cube)

        console.log('cube created')
    }
}