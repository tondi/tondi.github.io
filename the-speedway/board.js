function Board() {
    this.draw = function() {
        var el = document.querySelector("canvas");
        var ctx = el.getContext("2d");

        ctx.lineWidth = 2;


        /// MAIN
        ctx.rect(0, 0, 1200, 600);
        ctx.stroke();
        ctx.fillStyle = "#000000"
        ctx.fill();
        ctx.closePath();

        ctx.rect(0, 0, 1200, 600);
        ctx.stroke();
        ctx.fillStyle = "#000000"
        ctx.fill();
        ctx.closePath();

        // LEWA DO RAMKI
        ctx.beginPath();
        ctx.arc(300, 300, 300, Math.PI / 2, 3 / 2 * Math.PI);
        //ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();


        // PRAWA DO RAMKI
        ctx.beginPath();
        ctx.arc(900, 300, 300, -Math.PI / 2, -3 / 2 * Math.PI);
        //ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();

        // SRODEK DO RAMKI
        ctx.rect(300, 0, 600, 600);
        //ctx.stroke();
        ctx.fillStyle = "#fff"
        ctx.fill();
        ctx.closePath();

        //////////////////// TU KONIEC z lekcji /////////////////////


        ctx.beginPath();
        ctx.arc(840, 300, 120, -Math.PI / 2, -3 / 2 * Math.PI);
        //ctx.stroke();
        ctx.fillStyle = "#00968e";
        ctx.fill();
        ctx.closePath();


        ctx.beginPath();
        ctx.arc(360, 300, 120, Math.PI / 2, 3 / 2 * Math.PI);
        //ctx.stroke();
        ctx.fillStyle = "#f00968e";
        ctx.fill();
        ctx.closePath();

        ctx.rect(360, 180, 480, 240);
        //ctx.stroke();
        ctx.fillStyle = "#00968e"
        ctx.fill();
        ctx.closePath();

        // console.log(ctx)
    }
}