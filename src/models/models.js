import * as THREE from 'three'

export let bell = []

export const Bell = function() {
  const geo = new THREE.IcosahedronGeometry(10, 1)
  const mat = new THREE.MeshPhongMaterial({
    color: 0x795da3,
    emissive: 0xF66120,
    specular: 0xFFED22,
    shininess: 10,
    flatShading: true,
    transparent: 1,
    opacity: 1
  })
  this.mesh = new THREE.Mesh(geo, mat) 
  this.mesh.receiveShadow = true
  this.mesh.castShadow = true
  const shapeOne = new THREE.Mesh(
    new THREE.CylinderGeometry((4, 6, 10, 6, 3), 0.5),
    new THREE.MeshStandardMaterial({
        color: 0xa3a1a1,
        flatShading: true,
        metalness: 0,
        roughness: 0.8,
        refractionRatio: 0.25
    })
  )
  shapeOne.position.y += 9
  shapeOne.castShadow = true
  shapeOne.receiveShadow = true
  this.mesh.add(shapeOne)
    
  const shapeTwo = new THREE.Mesh(
    new THREE.TorusGeometry((2, 1, 6, 4, 2), 0.6),
    new THREE.MeshStandardMaterial( {
        color: 0xa3a1a1,
        flatShading: true,
        metalness: 0,
        roughness: 0.8,
        refractionRatio: 0.25

    })
  )
  shapeTwo.position.y += 9.5
  shapeTwo.castShadow = true
  shapeTwo.receiveShadow = true
  this.mesh.add(shapeTwo)
}

export const BigTree = function() {
  const material = new THREE.MeshBasicMaterial({color: 0x00300d})
  this.mesh = new THREE.Mesh(
    new THREE.ConeGeometry(7, 10, 64),
    material
  )
  this.mesh.receiveShadow = true
  this.mesh.castShadow = true

  const treeLayer = new THREE.Mesh(
    new THREE.ConeGeometry(10, 12, 64),
    material
  )
  treeLayer.position.y =- 5
  this.mesh.add(treeLayer)

  const treeLayerFinal = new THREE.Mesh(
    new THREE.ConeGeometry(13, 18, 64),
    material
  )
  treeLayerFinal.position.y =- 10
  this.mesh.add(treeLayerFinal)

  for (var i=0; i<4; i++) {
    bell.push(new Bell())
    bell[i].mesh.scale.set(0.15, 0.15, 0.15)
    this.mesh.add(bell[i].mesh)
  }
  bell[0].mesh.position.set(1.5, -2, 4.5)
  bell[1].mesh.position.set(-3, -6.5, 6)
  bell[2].mesh.position.set(5, -10, 7.5)
  bell[3].mesh.position.set(-6, -12.5, 8)
}

export const Palm = function() {
  const extrudeSettings = {
    steps: 1,
    depth: .005,
    bevelEnabled: true,
    bevelThickness: .025,
    bevelSize: .50,
    bevelSegments: .5
  }

  const leafShape = new THREE.Shape()
  leafShape.quadraticCurveTo(0, 5.5, 10, 5.5)
  leafShape.quadraticCurveTo(0, -5.5, 0, 2)

  const geometryLeaf = new THREE.ExtrudeGeometry(leafShape, extrudeSettings)

  var geometry = new THREE.BoxGeometry( .35, 1.5, .25 );
  geometry.translate(0,.5,0);
  var material = new THREE.MeshBasicMaterial( {color: 0x00300d, transparent: true, opacity: 0} );
  this.mesh = new THREE.Mesh( geometry, material );
  this.mesh.castShadow = true
  this.mesh.receiveShadow = true

  var geometry1 = new THREE.CylinderGeometry(0.35, 0.45, .5, 6);
  var materialBase = new THREE.MeshToonMaterial( { color: 0x3f0000 } );
  var palmBase = new THREE.Mesh(geometry1, materialBase);
  this.mesh.add(palmBase);
    
  var geometry2 = new THREE.CylinderGeometry(0.20, 0.30, .5, 6);
  var palmBase1 = new THREE.Mesh(geometry2, materialBase);
  palmBase1.position.set(-.025, .45, .0);
  palmBase1.rotation.set(0, 0, .15);
  this.mesh.add(palmBase1)
    
  var geometry3 = new THREE.CylinderGeometry(0.05, 0.20, .5, 6);
  var palmBase3 = new THREE.Mesh(geometry3, materialBase);
  palmBase3.position.set(-.15, .85, .0);
  palmBase3.rotation.set(0, 0, .35);
  this.mesh.add(palmBase3)
    
  var geometry4 = new THREE.CylinderGeometry(0.015, 0.04, .25, 6);
  var palmTrunkTop = new THREE.Mesh(geometry4, materialBase);
  palmTrunkTop.position.set(-.28, 1.15, .025);
  palmTrunkTop.rotation.set(.25, .5, .5);
  this.mesh.add(palmTrunkTop);

  var materialLeaf = new THREE.MeshToonMaterial( { color: 0x00300d} );
  var Leaf = new THREE.Mesh( geometryLeaf, materialLeaf);
  Leaf.scale.set(.085, .085, 1);
  Leaf.position.set(-1.05, .5, 0);
  Leaf.rotation.set(18.5, 2.5, 2);
  this.mesh.add( Leaf );

  let pL = Leaf.clone();
  pL.position.set(.3, 1.9, .15);
  pL.rotation.set(8.8, .5, 2);
  this.mesh.add(pL);
  
  let pL1 = Leaf.clone();
  pL1.position.set(0.10, .8, 1.05);
  pL1.rotation.set(-.85, -3.5, .5);
  this.mesh.add(pL1)    
}

export const Tree = function() {
  const geometryCube = new THREE.BoxGeometry(3, 3, 3)
  const materialCube = new THREE.MeshBasicMaterial({color: 0x3f0000})
  this.mesh = new THREE.Mesh(geometryCube, materialCube)
  this.mesh.castShadow = true
  this.mesh.receiveShadow = true

  const treeGeo = new THREE.ConeBufferGeometry(5, 20, 32)
  const treeMat = new THREE.MeshPhongMaterial({
    color: 0x00300d,
    emissive: 0x00300d,
    specular: 0x00300d,
    shininess: 1,
    flatShading: true,
    transparent: 1,
    opacity: 1
  })
  const cone = new THREE.Mesh(treeGeo, treeMat)
  cone.position.set(0, 11, 0)
  this.mesh.add(cone)
}

export const Image = function(image) {
  const loader = new THREE.TextureLoader()
  const imageMat = new THREE.MeshLambertMaterial({
    map: loader.load(image)
  })
  const imageGeo = new THREE.PlaneGeometry(20*.75, 20, 1)
  this.mesh = new THREE.Mesh(imageGeo, imageMat)
}