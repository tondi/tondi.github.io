// is point in path metoda wbudsowana
// plansza rysowana linearc

function Player() {
    var el = document.querySelector("canvas");
    var tab = [];
    var i = 0;
    var xNew;
    var flag = 0;

    var angle = 0;
    var toRad = (angle) => {
        return angle * Math.PI / 180;
    }
    var oldX;
    var oldY;
    var dX;
    var dY;
    var kX;
    var kY;
    xStart = 400;
    yStart = 500;
    var ctx = el.getContext("2d");
    var left = false;
    var right = false;

    var startX;
    var startY


    var radius = 5;
    var getNewX = (angle) => {
        return Math.cos(toRad(angle)) * radius;
    }
    var getNewY = (angle) => {
        return Math.sin(toRad(angle)) * radius;
    }

    var flagColision = false;

    function animateScene() {

        function addPlayer(color, position) {

            //tab[i].moveTo(oldX * 1.3, oldY * -1.3);



        }

        // addPlayer("200,100,200", [400, 500])
        //addPlayer("200,50,0", [450, 200])


        // tab[i].save();
        // tab[i].clearRect(oldX-200,oldY-100,100,200)
        // if(i-20 && i-29){
        //   console.log(tab)
        //   // tab[i-4].context.clearRect(0, 0, canvas.width, canvas.height);
        // }
        // if(i-290){
        //   flagColision = true;
        // }
    }


    this.add = function(color, position) {
        this.color = color;
        this.position = position;


        tab[i] = el.getContext("2d");
        // console.log(tab[i])
        oldX = position[0];
        oldY = position[1];

        startX = oldX;
        startY = oldY;

        // tab[i].strokeStyle = `rgb(${color})`;
        // tab[i].fill();
        // tab[i].stroke();

    }

    this.setMoves = function(keyLeft, keyRight) {
        document.addEventListener("keydown", (evt) => {
            // console.log(evt)
            // console.log(typeof evt.key)

            switch (evt.key) {
                case keyLeft:
                    {
                        // angle -= 3;
                        left = true;
                        if (keyLeft == "ArrowLeft") {
                            evt.preventDefault();
                        }
                        break;
                    }
                case keyRight:
                    {
                        //              console.log("right")
                        // angle += 3;
                        right = true;

                        if (keyRight == "ArrowRight") {
                            evt.preventDefault();
                        }
                        break;
                    }
            }
            // evt.preventDefault();
            // console.log("angle: ", angle)

        })

        document.addEventListener("keyup", (evt) => {
            // console.log(evt)
            switch (evt.key) {
                case keyLeft:
                    {
                        // angle -= 3;
                        left = false;
                        break;
                    }
                case keyRight:
                    {
                        //              console.log("right")
                        // angle += 3;
                        right = false;
                        break;
                    }
            }
            // console.log("angle: ", angle)

        })
    }

    var memo = [];
    var j = 0;

    this.refresh = function() {
        if (flagColision) { // Before collision
            return;
        }

        // tab[i] = el.getContext("2d");
        // // console.log(tab[i])
        // oldX = this.position[0];
        // oldY = this.position[1];

        tab[i].beginPath();
        tab[i].moveTo(oldX, oldY);

        kX = getNewX(angle)
        kY = getNewY(angle)

        //kX = getNewX(angle) * 3
        //kY = getNewY(angle) * 3


        kX += oldX;
        kY += oldY;

        tab[i].lineTo(kX, kY);
        ///////////////////////////////////// DO ZANIKANIA MOZE PRZYDAC SIE PATH2D Object

        tab[i].strokeStyle = `rgb(${this.color})`;
        tab[i].fill();
        tab[i].stroke();

        oldX = kX;
        oldY = kY;

        var data = ctx.getImageData(kX, kY, 1, 1);
        // console.log(data.data)
        if (data.data[0] < 40 && !flagColision) { // Patologia, ale dzia�a // metoda z length dzialan 50%a
            // alert("game over")
            flagColision = true;
            //location.reload()
        }

        // console.log(tab);

        if (left) {
            angle -= 1.4;
        }
        // TODO Erase left right togglers
        // if (right) {
        //     angle += 1.4;
        // }
        // i++
        memo.push({
            kX: oldX,
            kY: oldY,
            angle: angle
        });
        // console.log(memo)

        // console.log(memo[j].angle)
        // if (j == 150) {
        //     ctx.fillStyle = `rgba(255,255,255,0.9)`;
        //     for (let i = 0; i < 50; i++) {
        //         ctx.fillRect(memo[i].kX - 3, memo[i].kY - 3, 10, 10);

        //     }

        // }
        // if (j > 200) {
        // if (j == 200) {

        // }
        var startCleared = false;
        try {
            var a = 0.1;
            for (let x = 50; x < 200; x += 2, a = +0.1) {
                ctx.fillStyle = `rgba(255,255,255,${a})`;
                ctx.fillRect(memo[j - x].kX - 3, memo[j - x].kY - 3, 10, 10);

                if (!startCleared) {
                    ctx.fillRect(startX - 3, startY - 3, 10, 10);
                    startCleared = true;
                }

                // ctx.fillRect(memo[j - x].kX - 3, memo[j - x].kY - 3, 10, 10);
                // ctx.fillStyle = "rgba(255,255,255,0.5)";
                // ctx.fillRect(memo[j - x].kX - 3, memo[j - x].kY - 3, 10, 10);
                // ctx.fillStyle = "rgba(255,255,255,0.7)";
                // ctx.fillRect(memo[j - x].kX - 3, memo[j - x].kY - 3, 10, 10);
                // ctx.fillStyle = "rgba(255,255,255,1)";
                // ctx.fillRect(memo[j - x].kX - 3, memo[j - x].kY - 3, 10, 10);

            }

        } catch (e) {

            // console.log(memo[2])
        }



        // }
        // if (j > 100) {
        //     ctx.fillStyle = "rgba(255,255,255,0.8)";
        //     ctx.fillRect(memo[j - 100][0] - 1, memo[j - 100][1] - 1, 10, 10);
        // }
        j++
    }
}