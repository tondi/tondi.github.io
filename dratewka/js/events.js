var events = (function () {
    var checkAndReplace = function (evt) {
        if (/^[a-z]{1}$/.test(evt.key)) { // jest mala litera i dlugosc key = 1, czyli nie jest np "SHIFT"
            evt.preventDefault();
            var key = evt.key.toUpperCase();
            cmd.value += key;

        }else if (/^[A-Z]{1}$/.test(evt.key)) { // analogicznie jesli duza
            evt.preventDefault();
            var key = evt.key.toLowerCase();
            cmd.value += key;
        }
        //TO DO: Atari Cursor
        /*
        var currLeft = parseInt(cursor.style.left);
        if ((evt.keyCode >= 48 && evt.keyCode <= 90) || evt.keyCode === 32) {
            console.log(currLeft)
            cursor.style.left = currLeft + 16 + "px";
        }
        if (evt.keyCode === 8) {
            console.log(currLeft)
            var diffrence = currLeft - 16;
            if (diffrence < 0) {
                diffrence = 0;
            }
            cursor.style.left = diffrence + "px";
        }
        */
    };
    

    var keyboard = {
        enter: function () {
            cmd.addEventListener("keydown", function (evt) {
                evt.keyCode === 13 ? readCmd() : false;
            })
        },
        letterCase: function () {
                cmd.addEventListener("keydown", checkAndReplace)
        }
    }
    
    
    
    var readCmd = function () { // Odczytuje komende z prompta i podejmuje dzialanie w zaleznosci od tresci
        var flag = 0;
        var command = cmd.value.slice(9);
        //console.log("komenda: " + command)

        // obsługa kierunków
        switch (command) {
            case "NORTH":
            case "N":
                if (locations.current.n) {
                    var name = locations.current.yx.toString().split("")
                    var help = parseInt(name[0]);
                    help -= 1;
                    name[0] = help.toString()
                    var name = name.join("");

                    // zmien aktualną pozycję
                    locations.current = locations["x" + name];
                    DOM.appendInfo()
                    DOM.printInfo("You are going north...")
                } else {
                    DOM.printInfo("You can't go that way")
                }
                flag = 1;
                break;
            case "WEST":
            case "W":
                if (locations.current.w) {
                    if(locations.current.yx === 42  && !utilities.isWawelOpen){ // WEST to location 42 is closed by default
                        DOM.printInfo("You can't go that way. Drogon sleeps in that cave!")
                    } else {

                        var name = locations.current.yx.toString().split("")
                        var help = parseInt(name[1]);
                        help -= 1;
                        name[1] = help.toString()
                        var name = name.join("");

                        // change current position
                        locations.current = locations["x" + name];
                        DOM.appendInfo()
                        DOM.printInfo("You are going west...")
                    }

                } else {
                    DOM.printInfo("You can't go that way")
                }
                flag = 1;
                break;
            case "SOUTH":
            case "S":
                if (locations.current.s) {
                    var name = locations.current.yx.toString().split("")
                    var help = parseInt(name[0]);
                    help += 1;
                    name[0] = help.toString()
                    var name = name.join("");

                    locations.current = locations["x" + name];
                    DOM.appendInfo()
                    DOM.printInfo("You are going south...")

                } else {
                    DOM.printInfo("You can't go that way")
                }
                flag = 1;
                break;
            case "EAST":
            case "E":
                if (locations.current.e) {
                    var name = locations.current.yx.toString().split("")
                    var help = parseInt(name[1]);
                    help += 1;
                    name[1] = help.toString()
                    var name = name.join("");

                    locations.current = locations["x" + name];
                    DOM.appendInfo()
                    DOM.printInfo("You are going east...")

                } else {
                    DOM.printInfo("You can't go that way")
                }
                flag = 1;
                break;
        }

        
        

        if (command.slice(0, 2) === "T " || command.slice(0, 5) === "TAKE ") {
            var takenItemName = command.split(" ")[1];
            var curr = locations.current;


            if (takenItemName) { // Zabezpiecza przed brakiem nazwy itemu w [1] -> wówczas i tak by sie wykonalo

                
                

                if (utilities.itemExists(takenItemName) && !utilities.arrayNull(curr.item) && utilities.hasItem(takenItemName, curr.item)) { // 1.	If item exists and is on location
                    // 2.	If item is takeable
                    if (utilities.isEmpty(bagpack.item)) {
                        console.log(curr.item)
                        var i = utilities.searchForItem(takenItemName, curr.item) // It's kinda complicated...
                        if(curr.item[i].interacts){
                            DOM.printInfo("You are taking " + curr.item[i].conj) // before refresh section because of ssigning null value
                            bagpack.item = curr.item[i];
                            curr.item[i] = null;

                            DOM.appendInfo(); // refresh
                        }else{
                            DOM.printInfo("You can't carry it")
                        }
                        
                    } else {
                        DOM.printInfo("You are carrying something")
                    }


                } else {
                    //console.log(command.split(" "))
                    if (command.split(" ")[2]) {
                        var fullTaken = command.split(" ")[1] + " " + command.split(" ")[2]
                    } else {
                        var fullTaken = command.split(" ")[1];
                    }
                    console.log(fullTaken, curr.sheepParts)
                    console.log(utilities.hasItem(fullTaken, curr.sheepParts))
                    if (/^[a-z]{1,}$/.test(usedItem) && utilities.hasItem(fullTaken, curr.sheepParts)) { // If lowercase and , item can't ce carried // Two word-items handling not necessary <- Every item with lowercase can't be TAKEn  
                        DOM.printInfo("You can't carry it")
                    } else {
                        DOM.printInfo("There isn't anything like that here") // -> to communicate "there isnt anything..."
                    }
                }
                flag = 1;
            }

            
            
        }
                
        
        if (command.slice(0,2) === "D " || command.slice(0,5) === "DROP "){
            var droppedItemName = command.split(" ")[1];
            if (droppedItemName) { // Documentation at the top, in T (TAKE)
                if (!utilities.isEmpty(bagpack.item)) { // 1.	If you  are carrying smthing (You are not carrying anything)
                    console.log(bagpack.item.name === droppedItemName && droppedItemName.length !== 0)
                    if (bagpack.item.name === droppedItemName && droppedItemName.length !== 0) { // 2.	If you are carring detailed item ( You are not carrying it )
                        var curr = locations.current;
                        var arrayTest = utilities.arrayTest(curr.item);
                        //    arrayNotNull = utilities.arrayNotNull(curr.item);
                        //console.log("arrayTest: ", arrayTest, "arrayNotNull: ", arrayNotNull)
                        //console.log("Arrayfull: " + utilities.arrayFull(curr.item))
                        if (!utilities.arrayFull(curr.item) && curr.item.length <= 3) { // 3.	If location can store anymore else (You can't store any more here) 
                            //console.log("wynik: " + arrayTest)
                            DOM.printInfo("You are about to drop " + bagpack.item.conj)
                            curr.item[arrayTest] = bagpack.item;
                            bagpack.item = {};
                            //console.log("you are carrying this item")

                            //console.log(curr)

                            DOM.appendInfo();
                        } else {
                            DOM.printInfo("You can't store any more here")
                        }

                    } else {
                        DOM.printInfo("You are not carrying it") // Communicate in cmd
                    }
                } else {
                    DOM.printInfo("You are not carrying anything")
                }
                flag = 1;
            }
        }


        if (command.slice(0, 2) === "U " || command.slice(0, 4) === "USE ") {
            var usedItem = command.split(" ")[1];
            var curr = locations.current;

            //console.log(dependencies.d00)
            //console.log(usedItem)
            

            if (usedItem) { // Documentation by T (TAKE) ^
                    if (bagpack.item.name === usedItem && usedItem.length !== 0) { // 2.	If you are carrying it ( You are not carrying it )


                        //console.log(utilities.itemExists(usedItem))
                        //console.log(curr.yx)

                        if (utilities.itemExists(usedItem) === items.p37 && curr.yx === 43) { // If sheep used -> KILL DRAGON // Similar to "dependence" bu as ifa
                            // Actions connected with killing Dragon
                            cmd.value = ("The dragon noticed your gift...")
                            setTimeout(() => {
                                DOM.printInfo("The dragon ate your sheep and died!")
                                curr.img = "DS68.bmp";

                                curr.sheepParts = []
                                curr.sheepParts[0] = items.p30;
                                bagpack.item = {};
                                utilities.isWawelOpen = true;

                                DOM.appendInfo();
                            }, 1000)

                        } else {
                            if (utilities.itemExists(usedItem) === items.p36) { // If used PRIZE => GAME FINISHED
                                var endPicture = document.createElement("img"),
                                    content = document.getElementsByClassName("content")[0];
                                //console.log(content.style)
                                endPicture.src = "img/end.png";
                                endPicture.style.width = "640px";
                                content.innerHTML = null;
                                content.appendChild(endPicture);
                                //content.innerHTML = endPicture;
                            } else { 
                                var currDependence = utilities.getDependence();
                                if (currDependence) {
                                    if (currDependence.isResultOnLoc) {

                                        var arrayTest = utilities.arrayTest(curr.sheepParts);
                                        curr.sheepParts[arrayTest] = utilities.getItemById(currDependence.resultId)
                                        bagpack.item = {}
                                    } else {
                                        bagpack.item = utilities.getItemById(currDependence.resultId)
                                    }
                                    // Milestone handling
                                    if (currDependence.isMilestone) {
                                        ++utilities.milestones;
                                        //console.log(utilities.milestones)
                                        if (utilities.milestones === 6) {
                                            setTimeout(() => {
                                                DOM.printInfo("Your fake sheep is full of poison and ready to be eaten by the dragon")
                                                bagpack.item = items.p37;
                                                curr.sheepParts = [];

                                                for (let i = 0; i < curr.item.length; i++) {
                                                    curr.item[i] = null
                                                }
                                                DOM.appendInfo();
                                            }, 500)
                                        }
                                    }
                                    DOM.printInfo(currDependence.info) // communicate in dependence -> to cmd
                                    DOM.appendInfo()
                                } else {
                                    DOM.printInfo("Nothing happened") //  write to cmd
                                }

                            }
                        }
                        

                        //    DOM.appendInfo();
                        
                    } else {
                        DOM.printInfo("You aren't carrying anything like that") // to cmd
                    }
                
                flag = 1;
            }
        }


        if (command === "V") {
            var text = document.getElementsByClassName("text")[0],
                overlay = document.createElement("div"),
                div = document.createElement("div"),
                hiddenInput = document.createElement("input"),
                content = document.getElementsByClassName("content")[0];


            overlay.appendChild(div);
            overlay.appendChild(hiddenInput);
            
            hiddenInput.id = "hiddenInput";
            hiddenInput.style.color = "transparent";

            overlay.id = "vocOverlay";

            div.innerHTML = 'NORTH or N, SOUTH or S <br/>' +
                'WEST or W, EAST or E <br/>' +
                'TAKE (object) or T (object) <br/>' +
                'DROP (object) or D (object) <br/>' +
                'USE (object) or U (object) <br/>' +
                'GOSSIPS or G, VOCABULARY or V <br/>' +
                'Press any key';
            
            text.style.display = "none";
            content.appendChild(overlay)

            setTimeout(() => { hiddenInput.focus() }, 0)
            hiddenInput.onkeydown = function () {
                console.log("click na document")
                var content = document.getElementsByClassName("content")[0]
                content.removeChild(overlay)
                text.style.display = "inherit";
                cmd.value = "What Now?";
                cmd.focus();
            }

            
            flag = 1;
        }

        if (command === "G") {
            var text = document.getElementsByClassName("text")[0],
                overlay = document.createElement("div"),
                div = document.createElement("div"),
                hiddenInput = document.createElement("input"),
                content = document.getElementsByClassName("content")[0];


            overlay.appendChild(div);
            overlay.appendChild(hiddenInput);

            hiddenInput.id = "hiddenInput";
            hiddenInput.style.color = "transparent";

            overlay.id = "vocOverlay";

            div.innerHTML = "The  woodcutter lost  his home key...  " +
            "The butcher likes fruit... The cooper " +
            "is greedy... Dratewka plans to make a " +
            "poisoned  bait for the dragon...  The " +
            "tavern owner is buying food  from the " +
            "pickers... Making a rag from a bag... <br/>" +
            "Press any key"

            text.style.display = "none";
            content.appendChild(overlay)

            setTimeout(() => { hiddenInput.focus() }, 0)
            hiddenInput.onkeydown = function () {
                console.log("click na document")
                var content = document.getElementsByClassName("content")[0]
                content.removeChild(overlay)
                text.style.display = "inherit";
                cmd.value = "What Now?";
                cmd.focus();
            }


            flag = 1;
        }


        if (flag === 0) { // If command not valid. Every condition at the top set flag = 1 at the end of instr
            DOM.printInfo("Try another word or V for vocabulary")
        }


    } 
    



    return {
        init: function () {
            keyboard.enter()
            keyboard.letterCase()
            

        }
    }
})()