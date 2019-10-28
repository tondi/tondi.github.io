function Level() {

    /*
    klasa Level
    */
    var scene;
    var camera;
    var renderer;

    var arrow = {
        left: false,
        right: false,
        up: false,
        down: false
    }
    var move = {
        forward: false,
        left: false,
        right: false
    }
    var player;
    var enemy;
    var anims = {};
    anims.player = {};
    anims.enemy = {};
    var camPos;
    var sciana;
    var walls = [];
    var geometries = {};
    var mats = {};
    var levelData = leveldata.getLevelData();
    var centerPlanszy = levelData.size * 50 / 2; // jenda zmeinna dla x, y bo kwadrat 
    var playerLight;

    var light;
    var fireplaces = [];
    var fire;

    var laser;
    var laserObj = false;

    var laserToggled;
    ///////////////////// SEMANTYKA /////////////////////////
    //initEngine() 	// scena, kamera, renderer
    //initObjects() 	// obiekty gry - geometrie, osie, meshe
    //load // ladowanie materialow i geometrii
    //initEvents() 	// eventy - mysz, klawiatura, resize etc        
    //animateScene(); // pętla głowna gry

    function initEngine() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
            60, // kąt patrzenia kamery (FOV - field of view)
            window.innerWidth / window.innerHeight, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1, // minimalna renderowana odległość
            10000 // maxymalna renderowana odległość
        );
        camera.position.x = centerPlanszy;
        camera.position.y = 1000;
        camera.position.z = centerPlanszy - 1; // -1 zmienia biegun, kamera flips 180 

        camera.rotation.x = -Math.PI / 2;
        camera.lookAt(new THREE.Vector3(centerPlanszy, 0, centerPlanszy));
        // console.log(scene.position)



        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0x000000);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("main").appendChild(renderer.domElement);


        renderer.shadowMapEnabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;



    }
    initEngine()

    function load() {
        return new Promise((resolve) => {

            geometries.scianaGeom = new THREE.BoxGeometry(50, 250, 50);
            geometries.floor = new THREE.PlaneBufferGeometry(levelData.size * 50, levelData.size * 50, 8, 8);

            var loader = new THREE.TextureLoader();

            mats.floorMaterial = new THREE.MeshPhongMaterial({
                //color: 0xff0000,
                side: THREE.DoubleSide,
                map: loader.load("mats/x.jpg")
            })
            mats.wallMaterial = new THREE.MeshPhongMaterial({
                //color: 0xff0000,
                side: THREE.DoubleSide,
                map: loader.load("mats/wall.jpg")
            })

            mats.playerMaterial = new THREE.MeshPhongMaterial({
                map: loader.load("mats/B.jpg"),
                morphTargets: true, // cos z animacja
            });

            mats.redMaterial = new THREE.MeshBasicMaterial({
                color: 0xff0000,
                morphTargets: true, // cos z animacja
            });

            // var axis = new THREE.AxisHelper(2000);    // 200 - wielkość
            // scene.add(axis);

            // console.log(sciana)

            var loader = new THREE.JSONLoader();
            loader.load('models/model.js', function (playerGeom) {
                // console.log(playerGeom)
                player = new THREE.Mesh(playerGeom, mats.playerMaterial)
                player.name = "player";
                player.rotation.y = Math.PI / 2; // ustaw obrót modelu
                player.position.y = 25; // ustaw pozycje modelu
                player.scale.set(1, 1, 1); // ustaw skalę modelu
                // this.player = player;
                // console.log(this.player)

                var stand = playerGeom.animations[0]
                var run = playerGeom.animations[1]
                var attack = playerGeom.animations[2]

                scene.add(player)

                // Dodaje swiatło bez mesha
                let playerLightHelper = new MyLight(0xffffff);
                playerLightHelper.removeMesh();
                playerLight = playerLightHelper.getLight();
                scene.add(playerLight);

                anims.player.mixer = new THREE.AnimationMixer(player);
                anims.player.mixer.clipAction("stand").play();
                anims.player.animName = "stand";

                enemy = new THREE.Mesh(playerGeom, mats.playerMaterial)
                enemy.name = "enemy";
                enemy.rotation.y = Math.PI / 2; // ustaw obrót modelu
                enemy.position.y = 25; // ustaw pozycje modelu
                enemy.scale.set(1, 1, 1); // ustaw skalę modelu


                // anims.enemy.mixer = new THREE.AnimationMixer(enemy);
                // anims.enemy.mixer.clipAction("stand").play();
                // anims.enemy.animName = "stand";


                resolve("Zaladowano modele!");
            })
        })
    }


    function initObjects() {
        // Kiedy wszystko załadowano
        load().then((log) => {
            ui.overlay.className = "hidden";
            console.log("level size: ", levelData.size)


            sciana = new THREE.Mesh(geometries.scianaGeom, mats.wallMaterial)

            var floor = new THREE.Mesh(geometries.floor, mats.floorMaterial);
            floor.rotateX(Math.PI / 2);
            floor.material.map.repeat.set(8, 8); //gęstość powtarzania
            floor.material.map.wrapS = floor.material.map.wrapT = THREE.RepeatWrapping; // powtarzanie w obu kierunkach
            var test = (centerPlanszy);
            floor.position.set(test, 0, test)
            scene.add(floor)

            // var light = new MyLight(0xefebd8).getLight();


            // Changed light into fire !!!
            //fire = new Fire();
            //light = fire.getFire();
            //scene.add(light)
            // fireplaces.push(light)



            player.castShadow = true
            player.receiveShadow = true;
            sciana.receiveShadow = true
            sciana.castShadow = true;
            floor.receiveShadow = true
            floor.castShadow = true


            // objectsToAdd zawiera takze enemies
            var objectsToAdd = utils.getObjectsToAdd(levelData);

            // console.log(objectsToAdd)
            for (var x1 = 0; x1 < levelData.size; x1++) {
                for (var x2 = 0; x2 < levelData.size; x2++) {

                    var scianaClone = sciana.clone();
                    var enemyClone = enemy.clone();
                    //var lightClone = light.clone();
                    // console.log(lightClone.children[1].children)
                    // lightClone.children[1].children[0].name = "test"

                    for (let value of objectsToAdd) {
                        //console.log(value)
                        if (value[0] == x1 && value[1] == x2) {
                            // 50 - elementary
                            if (value[2] == "wall") {
                                scianaClone.position.set((levelData.size - x1) * 50 - 25, 26, (levelData.size - x2) * 50 - 25) // 25 - half of box size  // ... x2 - 1": "1" - Level editor starting index is 0, here we have 1 be
                                scene.add(scianaClone)

                                walls.push(scianaClone)
                            }
                            if (value[2] == "enemy") {
                                // console.log("enemy")
                                // tutaj dodaje enemies
                                enemyClone.position.set((levelData.size - x1) * 50 - 25, 26, (levelData.size - x2) * 50 - 25) // 25 - half of box size  // ... x2 - 1": "1" - Level editor starting index is 0, here we have 1 be
                                scene.add(enemyClone)

                                // tutaj cos z animacjami enemies

                            }
                            if (value[2] == "light") {

                                fire = new Fire();
                                var light = fire.getFire();
                                //scene.add(light)

                                light.position.set((levelData.size - x1) * 50 - 25, 0, (levelData.size - x2) * 50 - 25) // 25 - half of box size  // ... x2 - 1": "1" - Level editor starting index is 0, here we have 1 be
                                // lightClone.children[1].children[0].name = "test"
                                scene.add(light)
                                fireplaces.push(fire)
                            }
                        }
                    }
                }
            }
            // pozostale obiekty

            //particles = new THREE.Geometry() // geometria - tablica cząsteczek

            // var particleMaterial = new THREE.PointsMaterial(
            //     {
            //         color: 0xff3300,
            //         size: 100, // ta wartośc zmieniamy suwakiem skali
            //         map: THREE.ImageUtils.loadTexture("mats/particle.png"), // grafika zapewniająca "okrągły" kształt cząsteczki
            //         blending: THREE.AdditiveBlending,
            //         transparent: true,
            //         depthWrite: false,
            //         opacity: 0.6
            //     });

            // var v1 = new THREE.Vector3(20, 20, 20)
            // var v2 = new THREE.Vector3(200, 20, 200)

            // // Tu btła funkcja
            // var subV = new THREE.Vector3(
            //     v2.x - v1.x,
            //     v2.y - v1.y,
            //     v2.z - v1.z
            // )
            // //return subV;



            // particlesCount = 100;
            // var stepV = subV.divideScalar(particlesCount) // particlesCount - przewidywana ilość cząsteczek

            // function generate() {
            //     for (let i = 0; i < 100; i++) {
            //         var particle = new THREE.Vector3(
            //             v1.x + stepV.x * i,
            //             v1.y + stepV.y * i,
            //             v1.z + stepV.z * i)
            //         particles.vertices.push(particle);
            //     }
            // }
            // generate();

            // particleSystem = new THREE.Points(particles, particleMaterial);
            // scene.add(particleSystem)



        })



    }
    initObjects();

    // console.log(updateLaser)

    function initEvents() {

        document.addEventListener("keydown", (evt) => {
            // console.log(evt)
            switch (evt.key) {
                case "w": {
                    move.forward = 1;
                    break;
                }
                case "a": {
                    move.left = 1;
                    break;
                } case "d": {
                    move.right = 1;
                    break;
                } case " ": {
                    if (!laserToggled) {
                        laser = new Laser();
                        laserObj = laser.getLaser();
                        // console.log(laser)

                        scene.add(laserObj)
                        laserToggled = true;
                    } else {
                        scene.remove(laserObj);
                        laserToggled = false;
                    }
                    break;
                }

            }

            switch (evt.which) {
                case 37: {// left
                    //console.log("left")
                    //moveLights(selectedLight, "left");
                    arrow.left = 1;
                    break;
                }
                case 38: { // up
                    arrow.up = 1;
                    break;
                }
                case 39: {// right
                    //moveLights(selectedLight, "right")
                    arrow.right = 1;
                    break;
                }
                case 40: {// down
                    arrow.down = 1;
                    break;
                }
                default: return; // exit this handler for other keys
            }
            evt.preventDefault(); // prevent the default action (scroll / move caret)
        })

        document.addEventListener("keyup", (evt) => {
            switch (evt.key) {
                case "w": {
                    move.forward = 0;
                    break;
                }
                case "a": {
                    move.left = 0;
                    break;
                } case "d": {
                    move.right = 0;
                    break;
                }
            }
            switch (evt.which) {
                case 37: {// left
                    arrow.left = 0;
                    break;
                }
                case 38: { // up
                    arrow.up = 0;
                    break;
                }
                case 39: {// right
                    arrow.right = 0;
                    break;
                }
                case 40: {// down
                    arrow.down = 0;
                    break;
                }
                default: return; // exit this handler for other keys
            }
        })
    }
    initEvents();




    // update()
    // var fire = new Fire()
    // fire = new Fire();
    // scene.add(fire.getFire())



    ////////////// Przed animateScene
    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    clock = new THREE.Clock();

    // scene.add(light)

    (function animateScene() {
        ////// Początek stats
        stats.begin();

        // console.log(walls[0])





        if (laser) {
            laser.updateLaser();

            if (player && move.forward || move.right || move.left) {
                // console.log(player.matrixWorld)

                // console.log(laserObj.position)
                // console.log(player.rotation)
                var laserPos = laserObj.position.applyMatrix4(player.matrixWorld);
                // console.log("plater ", player.position)
                laserObj.position.x = player.position.x;
                laserObj.position.y = player.position.y;
                laserObj.position.z = player.position.z;


                // object.rotateOnAxis(axis,rad);
                // console.log(matrix)
                // laserObj.matrixWorldNeedsUpdate = true
                // laserObj.matrixWorld.copy(player.matrixWorld);
                // laserObj.matrix = matrix;
                // console.log(laserObj.matrix)
                laserObj.rotation.y = player.rotation.y;
                // laserObj.rotation = player.rotation;
                // console.log(player.rotation)
                // playerLight.position.set(player.position.x, player.position.y + 20 /* 20 nad playerem */, player.position.z)

                // camera.lookAt(player.position)

            }
        }


        var delta = clock.getDelta();

        if (fireplaces) {
            // console.log(light)
            for (let value of fireplaces) {
                value.updateFire();
            }
            //fire.updateFire();
        }

        // for(let value of fireplaces){
        //     console.log(value)
        //     value.updateFire();
        // }

        // if(flag){
        //     console.log(scene.children)
        //     flag = 0;
        // }

        // console.log(anims.player.mixer)
        if (anims.player.mixer) {
            anims.player.mixer.update(delta);
        }
        if (anims.enemy.mixer) {
            anims.enemy.mixer.update(delta);
        }

        var collision = false;
        if (move.forward) {
            // console.log("forward")
            anims.player.mixer.clipAction("run").play();
            anims.player.animName = "run";

            // TODO: kolizja na raycasterze, nie tylko na distanceTo
            for (let value of walls) {
                if (player.position.distanceTo(value.position) < 40) {
                    console.log("kolizja");
                    collision = true;
                }
            }

            if(!collision){
                player.translateX(-1.6)
            }
        } else {
            if (anims.player.animName == "run") {
                anims.player.mixer.clipAction(anims.player.animName).stop()
                anims.player.mixer.clipAction("stand").play();

            }
        }


        if (move.left) {
            player.rotation.y += 0.04;

        } else if (move.right) {
            player.rotation.y -= 0.04;

        }

        var camVect = new THREE.Vector3(100, 50, 0)
        if (player && move.forward || move.right || move.left) {
            // console.log(player.matrixWorld)
            camPos = camVect.applyMatrix4(player.matrixWorld);
            // console.log(camPos)
            camera.position.x = camPos.x
            camera.position.y = camPos.y
            camera.position.z = camPos.z

            playerLight.position.set(player.position.x, player.position.y + 20 /* 20 nad playerem */, player.position.z)

            camera.lookAt(player.position)

        }





        if (arrow.up) {
            camera.position.y += 5;
        } else if (arrow.down) {
            camera.position.y -= 5;
        }
        if (arrow.left) {
            camera.position.x += 5;
        } else if (arrow.right) {
            camera.position.x -= 5;
        }
        // camera.lookAt(scene.position)

        requestAnimationFrame(animateScene);
        renderer.render(scene, camera);
        //mesh.scale.set(1, 1, 1);

        camera.updateProjectionMatrix();

        ///////// Koniec stats
        stats.end();

    }())

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    // this.player = player;


    // TODO: Rozpoznawanie light, zmiana ich pozycji
}