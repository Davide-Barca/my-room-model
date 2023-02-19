import * as THREE from 'three'

import Application from '../Application.js'
import Screen from './Screen.js'

export default class World{
    constructor(){
        // setup
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources
        this.time = this.application.time

        this.model = {}


        this.resources.on('loaded', () => {
            this.setMaterial()
            this.setModel()
        })
    }

    setMaterial(){
        // Setup Backed Textures
        this.baked = {}
        this.macbook = {}

        // Setup Baked Texture
        this.baked.texture = this.resources.items.baked
        this.baked.texture.flipY = false
        this.baked.texture.encoding = THREE.sRGBEncoding

        this.macbook.texture = this.resources.items.macbookDesktop
        // this.macbook.texture.flipY = false
        this.macbook.texture.encoding = THREE.sRGBEncoding


        // Setup Materials
        this.baked.material = new THREE.MeshBasicMaterial({ map: this.baked.texture })
        this.macbook.material = new THREE.MeshBasicMaterial({ map: this.macbook.texture })
    }

    setModel(){
        this.model.scene = this.resources.items.model.scene
        this.model.scene.rotation.y = - (Math.PI / 2)
        this.model.scene.position.z = 20
        this.model.scene.position.x = -1
        this.model.scene.position.y = -1
        // Select scene children
        this.model.baked = this.model.scene.children.find((child) => child.name === 'model')
        this.model.chair = this.model.scene.children.find((child) => child.name === 'chair')
        this.model.left = this.model.scene.children.find((child) => child.name === 'monitorLeftScreen')
        this.model.right = this.model.scene.children.find((child) => child.name === 'monitorRightScreen')
        this.model.macbook = this.model.scene.children.find((child) => child.name === 'macbookScreen')

        console.log(this.model);

        // Assign materials to children
        this.model.baked.material = this.baked.material
        this.model.chair.material = this.baked.material
        this.model.macbook.material = this.macbook.material



        // Set Video Screen
        this.screenRight = new Screen(
            this.model.right,
            '/model/blender.mp4'
        )
        this.screenLeft = new Screen(
            this.model.left,
            '/model/code.mp4'
        )

        // this.model.lights.material = this.lights.material

        this.scene.add(this.model.scene)
    }

    update()
    {
        if(this.model.chair){
            this.model.chair.rotation.y = Math.sin(this.time.elapsed * 0.0005) * 0.5
        }
    }
}