import * as THREE from 'three'
import Application from '../Application'

export default class Screen{
    constructor(mesh, sourcePath){
        this.application = new Application()
        this.resources = this.application.resources
        this.scene = this.application.scene
        this.world = this.application.world

        this.mesh = mesh
        this.sourcePath = sourcePath

        this.setModel()
    }

    setModel(){
        this.model = {}

        this.model.element = document.createElement('video')
        this.model.element.muted = true
        this.model.element.loop = true
        this.model.element.controls = true
        this.model.element.playsInline = true
        this.model.element.autoplay = true
        this.model.element.src = this.sourcePath
        this.model.element.play()

        this.model.texture = new THREE.VideoTexture(this.model.element)
        this.model.texture.encoding = THREE.sRGBEncoding

        this.model.material = new THREE.MeshBasicMaterial({
            map: this.model.texture
        })

        console.log(this.mesh)
        this.mesh.material = this.model.material
        this.mesh.scale.x = -1 // flip video horizontaly
    }
}