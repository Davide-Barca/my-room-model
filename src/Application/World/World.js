import * as THREE from 'three'

import Application from '../Application.js'

export default class World{
    constructor(){
        // setup
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources

        this.resources.on('loaded', () => {
            this.setMaterial()
            this.setModel()
        })
    }

    setMaterial(){
        // Setup Backed Textures
        this.baked = {}
        this.lights = {}

        // Setup Baked Texture
        this.baked.texture = this.resources.items.baked
        this.baked.texture.flipY = false
        this.baked.texture.encoding = THREE.sRGBEncoding


        // Setup Materials
        this.baked.material = new THREE.MeshBasicMaterial({ map: this.baked.texture })
        this.lights.material = new THREE.MeshBasicMaterial({ color: "#FFFEA6" })
    }

    setModel(){
        this.model = {}
        this.model.scene = this.resources.items.model.scene
        this.model.scene.rotation.y = - (Math.PI / 2)
        console.log(this.model.scene)
        // Select scene children
        this.model.baked = this.model.scene.children.find((child) => child.name === 'Model')
        this.model.lights = this.model.scene.children.find((child) => child.name === 'Lights')

        // Assign materials to children
        this.model.baked.material = this.baked.material
        this.model.lights.material = this.lights.material

        this.scene.add(this.model.scene)
    }
}