

function Laser() {
  //dependency
  var rand = utils.rand;

  //puste zmienne: materiał , geometria, światło, mesh
  var particles = new THREE.Geometry();
  var particleSystem;


  // kontener
  var container = new THREE.Object3D();

  // wektory
  var v1;
  var v2;
  var stepV;

  // init
  function init() {

    var particleMaterial = new THREE.PointsMaterial(
      {
        color: 0xff3300,
        size: 100, // ta wartośc zmieniamy suwakiem skali
        map: THREE.ImageUtils.loadTexture("mats/particle.png"), // grafika zapewniająca "okrągły" kształt cząsteczki
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        opacity: 0.6
      });


    v1 = new THREE.Vector3(0, 20, 0)
    v2 = new THREE.Vector3(-200, 20, 0)

    // Tu btła funkcja
    var subV = new THREE.Vector3(
      v2.x - v1.x,
      v2.y - v1.y,
      v2.z - v1.z
    )
    //return subV;

    particlesCount = 100;
    stepV = subV.divideScalar(particlesCount) // particlesCount - przewidywana ilość cząsteczek

    function generate() {
      for (let i = 0; i < 100; i++) {
        var particle = new THREE.Vector3(
          v1.x + stepV.x * i,
          v1.y + stepV.y * i,
          v1.z + stepV.z * i)
        particles.vertices.push(particle);
      }
    }
    generate();

    particleSystem = new THREE.Points(particles, particleMaterial);
    container.add(particleSystem)


  }

  init();

  // funkcja publiczna zwracająca obiekt kontenera
  // czyli nasze światło wraz z bryłą

  this.getLaser = function () {
    return container;
  }

  // inne funkcje publiczne, np zmiana koloru bryły, zmiana koloru światła

  this.updateLaser = function () {
    // console.log("update")
    var verts = particles.vertices
    var rand = 1;

    for (var i = 0; i < verts.length; i++) {
      var particle = verts[i];
      // tu zmieniaj losowo pozycję x,y,z każdej z cząsteczek       
      particle.x += utils.rand(-rand, rand);
      particle.y += utils.rand(-rand, rand)
      particle.z += utils.rand(-rand, rand)
      // console.log(particle.y)
      if (particle.y > 22 || particle.y < 18) {
        particle.x = v1.x + stepV.x * i;
        particle.y = v1.y + stepV.y * i;
        particle.z = v1.z + stepV.z * i;
      }
    }

    particleSystem.geometry.verticesNeedUpdate = true;
    particleSystem.material.size = utils.rand(20, 30) // zmiana skali wszystkich cząsteczek

    // console.log(level.player)
    // v1.copy(level.player.rotation);
    // console.log(v1)


  }

}


