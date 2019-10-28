/*
    klasa światła, utworzona w pliku MyLight.js
*/

function MyLight(color) {

    //puste zmienne: materiał , geometria, światło, mesh
    var material, geometry, light, mesh;

    // kontener
    var container = new THREE.Object3D();

    // init
    function init() {

        // tu utwórz materiał , geometria, światło, mesh
        // i dodaj je do kontenera (add)
        var yellowMaterial = new THREE.MeshBasicMaterial({
            // map: loader.load("mats/x.jpg")
            color: 0xffff00,
            side: THREE.DoubleSide
        })

        var brownMaterial = new THREE.MeshBasicMaterial({
            // map: loader.load("mats/x.jpg")
            color: 0xDAA520,
            side: THREE.DoubleSide
        })

        var geometry = new THREE.Object3D();
        var patyk = new THREE.Mesh(new THREE.BoxGeometry(1, 12, 1), brownMaterial)
        var zarowka = new THREE.Mesh(new THREE.SphereBufferGeometry(3, 6, 6), yellowMaterial)

        geometry.add(patyk, zarowka);
        
        // geometry.name = "aaa"
        zarowka.position.y = 8; // relative to Object3D

        light = new THREE.PointLight(color, 1, 500, 2);
        // light.position.y = 0;

        // light.position.set(0, 0, -100);
        // light.lookAt(level.scene.position);
        container.add(light)
        container.add(geometry)
        // container.position.y = 100;



        // level.scene.add(container);

    }

    init();

    // funkcja publiczna zwracająca obiekt kontenera
    // czyli nasze światło wraz z bryłą

    this.getLight = function () {
        return container;
    }

    // inne funkcje publiczne, np zmiana koloru bryły, zmiana koloru światła

    this.changeLightColor = function (color) {
        light.color.setHex(color)
        console.log("zmiana koloru na " + color)
    }

    this.changeLightPosition = function (diff) {
        console.log("zmiana pozycji na " + container.position)
    }

    this.removeMesh = function () {
        // console.log(container)
        container.remove(container.children[1])
    }

}
