function Utils() {


    // Aby zahcowac przejzystosc w level

    this.rand = function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.getObjectsToAdd = function (levelData) {
        let objectsToAdd = [];
        for (let i = 0; i < levelData.level.length; i++) {
            let value = levelData.level[i]
            //console.log(value)
            objectsToAdd[i] = []
            objectsToAdd[i].push(value.x)
            objectsToAdd[i].push(value.z)
            objectsToAdd[i].push(value.type)
        }
        return objectsToAdd;
    }
    
    
    this.findRaycasted = function (event) {

        var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        var mouseVector = new THREE.Vector2() // wektor (x,y) wykorzystany będzie do określenie pozycji myszy na ekranie


        // pozycja myszy zostaje przeliczona na wartości 0- 1, wymagane przez raycaster

        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;


        // szukamy punktów wspólnych "promienia" i obiektu 3D 

        raycaster.setFromCamera(mouseVector, level.camera);

        // intersects - tablica obiektów w które "trafia" nasz "promień" wysyłany z kamery
        // scene.children oznacza, że szukamy meshów bezpośrednio dodanych do sceny3D

        var intersects = raycaster.intersectObjects(level.scene.children);

        // console.log(intersects.length)

        // jeśli długość tablicy > 0 oznacza to że "trafiliśmy" w obiekt 3D czyli "kliknęliśmy" go

        if (intersects.length > 0) {

            // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:
            console.log(intersects[0].object.name);

        }

        ///////////// OBSŁUGA PRZEMIESZCZANIA SWIATEŁ


    }
}
