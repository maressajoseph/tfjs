import React from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { Tree, bell, BigTree, Image, Palm, Bell } from './models/models'

let scene, camera, HEIGHT, WIDTH, renderer, sphereTab = [], snow = [], globe, world, palm, writing, tree, sound, intersects = [], controls
let lightness = 0

class Three extends React.Component {
  state = {
    year: '2018',
    isScrolling: false
  }

  handleWindowResize = () => {
    HEIGHT = window.innerHeight
    WIDTH = window.innerWidth
    renderer.setSize(WIDTH, HEIGHT)
    camera.aspect = WIDTH / HEIGHT
    camera.updateProjectionMatrix()
  }

  createScene = () => {
    HEIGHT = window.innerHeight
    WIDTH = window.innerWidth

    scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xf4f4f4, 100, 950)

    camera = new THREE.PerspectiveCamera(60, WIDTH/HEIGHT, 1, 1000)

    camera.position.x = 0
    camera.position.z = 600
    camera.position.y = 75
    camera.lookAt(new THREE.Vector3(0, 15, 0))

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(WIDTH, HEIGHT)
    renderer.shadowMap.enabled = true

    const container = document.getElementById('world')
    container.appendChild(renderer.domElement)

    window.addEventListener('resize', this.handleWindowResize, false)

    // const audioListener = new THREE.AudioListener()
    // camera.add(audioListener)
    // sound = new THREE.Audio(audioListener)
    // const audioLoader = new THREE.AudioLoader()
    // audioLoader.load( 'https://cdn.rawgit.com/ellenprobst/web-audio-api-with-Threejs/57582104/lib/TheWarOnDrugs.m4a', (buffer) => {
    //   sound.setBuffer(buffer)
    //   sound.setLoop(true)
    //   sound.setVolume(0.5)
    //   sound.play()
    // })

    for (let i = 0; i < 50; i++) {
      const lumiereS = new THREE.MeshPhongMaterial({
          emissive: '#7fe3ff'
      })
      sphereTab.push(new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 1, 20, 20), lumiereS))
    }
    for (let i = 0; i < sphereTab.length; i++) {
        sphereTab[i].position.set(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300);
        scene.add(sphereTab[i]);
    }
  }

  createLights = () => {
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
    const shadowLight = new THREE.DirectionalLight(0xffffff, .9)

    shadowLight.position.set(150, 350, 350)
    shadowLight.castShadow = true

    shadowLight.shadow.camera.left = -400
    shadowLight.shadow.camera.right = 400
    shadowLight.shadow.camera.top = 400
    shadowLight.shadow.camera.bottom = -400
    shadowLight.shadow.camera.near = 1
    shadowLight.shadow.camera.far = 1000
  
    shadowLight.shadow.mapSize.width = 2048
    shadowLight.shadow.mapSize.height = 2048
    
    scene.add(hemisphereLight)  
    scene.add(shadowLight)
  }

  createWorld = () => {
    const World = function() {
      const geo = new THREE.CylinderGeometry(180,180,500,40,10)
      geo.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2))
      geo.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI/2))
      geo.mergeVertices()

      var l = geo.vertices.length

      this.waves = []

      for (let i=0; i<l; i++){
        let v = geo.vertices[i]
        this.waves.push({
          y:v.y,
          x:v.x,
          z:v.z,
          ang:Math.random()*Math.PI*2,
          dis:5 + Math.random()*2,
          speed:0.005 + Math.random()*0.010
        })
      }
      let verts = geo.vertices
      let length = verts.length
      
      for (let i=0; i<length; i++) {
        let v = verts[i];     
        let vprops = this.waves[i]
        v.x = vprops.x + Math.cos(vprops.ang)*vprops.dis
        v.y = vprops.y + Math.sin(vprops.ang)*vprops.dis    
        vprops.ang += vprops.speed    
      }

      geo.verticesNeedUpdate = true
      const mat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: false,
        opacity: 1,
        flatShading: true,
      })
      this.mesh = new THREE.Mesh(geo, mat)
      this.mesh.receiveShadow = true
      this.mesh.castShadow = true

      const den = new Tree()
      den.mesh.scale.set(5,5,5)
      den.mesh.position.set(-90, 155, -100)
      den.mesh.rotation.set(THREE.Math.degToRad(-40), 0, 0)
      this.mesh.add(den.mesh)

      const den1 = new Tree()
      den1.mesh.scale.set(4,4,4)
      den1.mesh.position.set(70, 178, -50)
      den1.mesh.rotation.set(THREE.Math.degToRad(-15), 0, 0)
      this.mesh.add(den1.mesh)

      palm = new Palm()
      palm.mesh.scale.set(20,20,20)
      palm.mesh.position.set(-100, 0, -180)
      palm.mesh.rotation.set(THREE.Math.degToRad(-90), 0, 0)
      this.mesh.add(palm.mesh)

      const image = new Image('assets/test4.png')
      image.mesh.scale.set(3,3,3)
      image.mesh.position.set(-10, 186, -70)
      image.mesh.rotation.set(THREE.Math.degToRad(-35), 0, 0)
      this.mesh.add(image.mesh)
    }

    world = new World()
    world.mesh.position.z = -100
    world.mesh.position.y = -265
    world.mesh.position.x = 0
  }

  createLamps = () => {
    const curve = new THREE.SplineCurve([
      new THREE.Vector3(-1880.1060995617431, 977.165574496369, -123.21364985340276),
      new THREE.Vector3(-909.7958466153959, 182.4812658805739, -181.64162081128973),
      new THREE.Vector3(-986.7046466542678, -324.012558347758, 0.6641686037343915),
      new THREE.Vector3(-1017.3112885430791, -99.48911002058746, 4.61423754942969),
      new THREE.Vector3(-692.9986516827735, 422.3967590699239, -119.85011846321932),
      new THREE.Vector3(-731.152985914783, 23.669501688237222, -166.2723500299894),
      new THREE.Vector3(-604.3460200731519, -89.16750407788291, -91.86394056675014),
      new THREE.Vector3(-460.138843561989, 418.7895774502797, 19.21401255882114),
      new THREE.Vector3(-490.0310903975698, -119.7951905146337, -106.71168461629789),
      new THREE.Vector3(-346.8540582437573, 435.695966499808, -38.355748198760566),
      new THREE.Vector3(-279.99153934470746, -70.88474565530504, -127.4042719781818),
      new THREE.Vector3(-67.18997328923732, 474.0632851651265, 100.15054208025467),
      new THREE.Vector3(-255.28545338529315, 387.08907810648225, 92.97806773787997),
      new THREE.Vector3(52.68086252291563, 1.7010522389656964, 39.54131942636402),
      new THREE.Vector3(-247.79375761675334, -212.02871127831108, 112.45194922092169),
      new THREE.Vector3(250.08475777661977, 719.3076142083652, -86.3346216354797),
      new THREE.Vector3(21.926425774334255, 497.5096126306235, 160.61152883716676),
      new THREE.Vector3(80.31643636220791, 116.61158711275033, 196.47997392533395),
      new THREE.Vector3(388.7597105975035, 394.64566414408347, 22.907470575721856),
      new THREE.Vector3(210.1705476579341, 372.13365115420356, -141.35329721601596),
      new THREE.Vector3(315.56730646230835, 69.20259071909783, 254.55602043635233),
      new THREE.Vector3(1608.3487977212258, 1141.0687723163414, -135.1594645833136)
    ])
    
    const points = curve.getPoints(500)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    
    const material = new THREE.LineBasicMaterial({
      color: 0xF66120
    })
    
    writing = new THREE.Line(geometry, material)
    writing.scale.set(0.2, 0.2, 0.2)
    writing.castShadow = true
    writing.position.y = 120
    writing.position.x = 50
    writing.position.z = 90
    scene.add(writing)
  }

  createTree = () => {
    tree = new BigTree()
    tree.mesh.scale.set(15,15,15)
    tree.mesh.position.y = -70
    scene.add(tree.mesh)
  }

  createGlobe = () => {
    const Globe = function() {
      // bottom globe
      this.mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(50, 50, 15, 32),
        new THREE.MeshStandardMaterial({
            color: 0xa3a1a1,
            flatShading: true,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        })
      )
      this.mesh.receiveShadow = true
      this.mesh.castShadow = true

      // trees
      const tr = new Tree()
      tr.mesh.position.set(15, 9, 15)
      this.mesh.add(tr.mesh)

      const tree1 = new Tree()
      tree1.mesh.position.set(-10, 9, -15)
      this.mesh.add(tree1.mesh)

      // snow
      for (let i = 0; i < 80; i++) {
        const lumiereS = new THREE.MeshPhongMaterial({
          emissive: '#fff',

        })
        snow.push(new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 1, 50, 50), lumiereS))
      }
      for (let i = 0; i < snow.length; i++) {
        snow[i].position.set(Math.random() * 50 - 10, Math.random() * 80, Math.random() * 40 - 10);
        this.mesh.add(snow[i])
      }

      // glass globe
      const geo = new THREE.IcosahedronGeometry(55, 3)
      const mat = new THREE.MeshPhongMaterial({
        color: 0x795da3,
        emissive: 0xF66120,
        specular: 0xFFED22,
        shininess: 10,
        flatShading: true,
        transparent: 1,
        opacity: 0.3
      })
      const boll = new THREE.Mesh(geo, mat)
      boll.position.y =+ 35
      this.mesh.add(boll)
    }

    globe = new Globe()
    globe.mesh.position.z = 0
    globe.mesh.position.y = -30
    globe.mesh.position.x = 0
    scene.add(globe.mesh)
  }

  loop = () => {
    const timer = 0.00001 * Date.now()
    for (let i=0; i < snow.length; i++) {
      const time = 0.0002 * Date.now()
      snow[i].position.x = 30 * Math.sin(time + i)
      snow[i].position.z = 30 * Math.sin(time + i * 1.1)
    }
    for (let i = 0; i < sphereTab.length; i++) {
      const sfere = sphereTab[i];
      sfere.position.x = 400 * Math.sin(timer + i)
      sfere.position.z = 400 * Math.sin(timer + i * 1.1)
    }
    for (let i = 0; i < bell.length; i++) {
      bell[i].mesh.rotation.y = 100 * Math.sin(timer + i)
    }
    lightness > 100 ? lightness = 0 : lightness++
    writing.material.color = new THREE.Color("hsl(15, 100%, " + lightness + "%)")

    if ((intersects.length > 0) && camera.position.z > 55.5) {
      camera.position.z -= 4
      camera.position.x = 0
      if (camera.position.y > 16) {camera.position.y -= 1}
      camera.updateProjectionMatrix()
      camera.lookAt(new THREE.Vector3(0, 15, 0))
      this.changeScene()
    } else if (intersects.length > 0 || camera.position.z < 55.5) {
      intersects = []
      world.mesh.rotation.x += .0015
    }

    requestAnimationFrame(this.loop)
    renderer.render(scene, camera)
  }

  changeScene = () => {
    if (camera.position.z < 56) {
      scene.remove(globe.mesh)
      scene.remove(tree.mesh)
      scene.remove(writing)
      document.getElementById('world').style.backgroundColor = '#04133d'
      setTimeout(() => {
        scene.add(world.mesh)
        document.getElementById('wish').style.opacity = 1
      }, 500)
      controls.zoomSpeed = 0.3
      // sound.setVolume(0.8)
    } else {
      scene.remove(world.mesh)
      scene.add(tree.mesh)
      scene.add(globe.mesh)
      scene.add(writing)
      document.getElementById('world').style.backgroundColor = '#04133d'
      document.getElementById('wish').style.opacity = 0
      controls.zoomSpeed = 0.7
    }
  }

  componentDidMount() {
    this.createScene()
    this.createLights()
    this.createTree()
    this.createGlobe()
    this.createWorld()
    this.createLamps()

    this.loop()

    controls = new OrbitControls(camera, renderer.domElement)
    document.addEventListener('mousedown', (e) => {
      console.log(camera)
      const mouse = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
      const objectsArray = globe.mesh.children.concat(globe.mesh)
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)
      intersects = raycaster.intersectObjects(objectsArray)
    })
    controls.addEventListener('change', () => {
      this.changeScene()
    })
    controls.maxDistance = 600
    controls.minPolarAngle = 50 * Math.PI/180
    controls.maxPolarAngle = 80 * Math.PI/180
    controls.minAzimuthAngle = -0.8
    controls.maxAzimuthAngle = 0.8
  }

  render () {
    return (
      <World id="world">
        <Wish id="wish">Happy Holidays - Jungle Minds</Wish>
      </World>
    )
  }
}

export default Three

const World = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease;
  background-color: #04133d;
`

const Wish = styled.h1`
  position: absolute;
  top: 20%;
  left: 50%;
  color: orange;
  opacity: 0;
  font-size: 100px;
  font-family: Raleway;
  transition: all 0.6s ease;
  transform: translateX(-50%) translateY(-50%);
`
