import * as THREE from 'three'

import Application from "../Application";
import EventEmitter from "./EventEmitter";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Resources extends EventEmitter{
    constructor(sources){
        super()

        // setup
        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }
    
    setLoaders(){
        this.loader = {}
        this.loader.draco = new DRACOLoader()
        this.loader.draco.setDecoderPath('/draco/')

        this.loader.gltf = new GLTFLoader()
        this.loader.gltf.setDRACOLoader(this.loader.draco)

        this.loader.texture = new THREE.TextureLoader()

    }

    startLoading(){
        for(const source of this.sources){
            if(source.type === 'gltf'){
                this.loader.gltf.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture'){
                this.loader.texture.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file){
        this.items[source.name] = file

        this.loaded++


        if(this.loaded == this.toLoad){
            this.trigger('loaded')
        }
    }
}