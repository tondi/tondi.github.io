var DOM = (function () {
    var createDOM = function () {
        var content = document.createElement("div"),
            header = document.createElement("header"),
            images = document.createElement("div"),
            colorBox = document.createElement("div"),
            locationImg = document.createElement("img"),
            kompas = document.createElement("img"),
            n = document.createElement("div"),
            w = document.createElement("div"),
            s = document.createElement("div"),
            e = document.createElement("div"),
            text = document.createElement("div"),
            youcan = document.createElement("div"),
            yousee = document.createElement("div"),
            youare = document.createElement("div"),
            cmd = document.createElement("input");
            //cursor = document.createElement("img");
        // end var

        content.className = "content";

        header.id = "header";
        content.appendChild(header);

        images.className = "images";

        colorBox.id = "colorBox";
        locationImg.id = "locationImg";
        //locationImg.src = "img/47.gif";
        locationImg.alt = "location";
        colorBox.appendChild(locationImg);
        images.appendChild(colorBox);
        kompas.id = "kompas";
        kompas.src = "img/kompas.png";
        kompas.alt = "compass";
        images.appendChild(kompas);

        n.id = "N";
        n.className = "direction";
        images.appendChild(n);
        w.id = "W";
        w.className = "direction";
        images.appendChild(w);
        s.id = "S";
        s.className = "direction";
        images.appendChild(s);
        e.id = "E";
        e.className = "direction";
        images.appendChild(e);
        content.appendChild(images);

        text.className = "text";
        youcan.id = "youcan";
        text.appendChild(youcan);
        yousee.id = "yousee";
        text.appendChild(yousee);
        youare.id = "youare"
        text.appendChild(youare);

        cmd.id = "cmd";
        cmd.type = "text";
        cmd.value = "What Now?";
        cmd.onfocus = "this.value = this.value";
        //cmd.autofocus = true; // Doesn't work on firefox - Using focus() instad
        cmd.onblur = () => { cmd.focus(); } // constant focus on #cmd <input>
        text.appendChild(cmd);


        

        content.appendChild(text);

        document.body.appendChild(content);
        cmd.focus();
    }

    var appendInfo = function () {
        var curr = locations.current;
        

        header.innerHTML = curr.description;
        colorBox.style.background = curr.bgColor;
        locationImg.src = "img/" + curr.img;

        youcan.innerHTML = "You can go " + curr.getDirections().join(", ");
        curr.getDirections().includes("NORTH") ? (
            N.innerHTML = "N"
        ) : (N.innerHTML = "") // es7
        curr.getDirections().includes("WEST") ? (
            W.innerHTML = "W"
        ) : (W.innerHTML = "")
        curr.getDirections().includes("SOUTH") ? (
            S.innerHTML = "S"
        ) : (S.innerHTML = "")
        curr.getDirections().includes("EAST") ? (
            E.innerHTML = "E"
        ) : (E.innerHTML = "")

        var flag = 0;
        var help = [];

        yousee.innerHTML = "You see ";
        if (curr.sheepParts) {
            for(value of curr.sheepParts) {
                if (value !== null) {
                    help.push(value.conj)
                    flag = 1;
                }
            }
        }
        if (!utilities.arrayNull(curr.item)) {
            
            for(value of curr.item) {
                if (value !== null) {
                    help.push(value.conj)
                    flag = 1;
                }
            }

        }
        if (flag === 0) {
            yousee.innerHTML = "You see nothing"
        }

        yousee.innerHTML += help.join(", ")


        if (bagpack.item !== undefined && bagpack.item.name) { // if item is already assigned to bagpack
            youare.innerHTML = "You are carrying " + bagpack.item.conj;
        } else {
            youare.innerHTML = "You are carying nothing"

        }

        console.log("Items on location: ", curr.item)
        if (curr.sheepParts) {
            console.log("Sheep parts on location: ", curr.sheepParts)
        }
        console.log("Bagpack item: ", bagpack.item)
        console.log("Position yx: ", curr.yx)
    }
        
    /* Communicates in cmd and their handling */
    var revertCmd = function () {
        cmd.value = "What Now?" // revert to default
    }

    var printInfo = function (text) { // 
        cmd.disabled = true; // readOnly doesnt make it out because we have constant focus
        var textArray = text.split(" ");

        cmd.value = "";
        (function printCmdTimeout(textArray) {
            var target = textArray.shift(); // load first then delete it from arr
            if (target) {
                timeout(target).then(function (target) {
                    cmd.value += target + " ";
                    printCmdTimeout(textArray) // recurrence
                })
            } else {
                setTimeout(function () {
                    revertCmd()
                    cmd.disabled = false;
                    cmd.focus();
                }, 600)
            }
        }(textArray))

    }

    var timeout = function timeout(text) {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(text)
            }, 25)

        })
    }

    return{
        init: function () {
            createDOM()
            appendInfo()
        },
        appendInfo: appendInfo,
        revertCmd: revertCmd,
        printInfo: printInfo
        
    }
}())