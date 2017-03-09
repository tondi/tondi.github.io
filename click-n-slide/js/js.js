window.onload = function(){
    var wymiar = 3;
    
    var current = 1;
    var currentImg;

    //document.querySelectorAll("body").style.width = "90%"
    //console.log(test)

    function znajdzCurrent() {
        var x = document.getElementsByClassName("mySlides");

        for (var i = 0; i < 7; i++) {
            if (x[i].style.left == "0px") { 
                current = i
                currentImg = x[i];
                //console.log(currentImg)
            }
        }
    }

    function zeruj() {
        var slides = document.getElementsByClassName("mySlides");
        slides[0].style.left = "-600px"

        slides[1].style.left = "-400px"

        slides[2].style.left = "-200px"

        slides[3].style.left = "0px"

        slides[4].style.left = "200px"

        slides[5].style.left = "400px"

        slides[6].style.left = "600px"

    }
    
    function plusDivs(n) {
        przesunSlide(n);
    }

    var flagaX = 0;
    
    var intervalSlide = {
        start: function (ileRazy, czyPlus) {
            licznikInterval = 0;
            var a = 0;
            console.log("czyplus = " + czyPlus)

            interval = setInterval(function () {
                if (ileRazy != licznikInterval) {
                    var x = document.getElementsByClassName("mySlides");
                    if (czyPlus == 1) {
                       
                        for (var i = 0; i < 7; i++) {
                            var value = parseInt(x[i].style.getPropertyValue("left"))

                            x[i].style.left = value + 10 + "px"
                        }

                    } else {
                        
                        for (var i = 0; i < 7; i++) {
                            var value = parseInt(x[i].style.getPropertyValue("left"))

                            x[i].style.left = value - 10 + "px"
                        }

                    }
                    licznikInterval++
                }
                else {
                    clearInterval(interval)
                    applyToPlansza()
                    //znajdzCurrent();
                    //console.log("endIntervcal")
                }
            }, 1)
        }
    }


    function przesunSlide(n){
        var x = document.getElementsByClassName("mySlides");
        
        var slides = document.getElementsByClassName("mySlides");
        
        
        if (current == 0 || current == 6) {
            zeruj()
            current = 0
        } 
        
        
            //console.log(n)
            if (n == -1) { // w prawo
                console.log("w prawo")
                intervalSlide.start(20, 1)
                //znajdzCurrent()
               
            } else { //lewo
                if (n == 1) {
                    console.log("w lewo")
                    intervalSlide.start(20, 0)
                    //znajdzCurrent()
                    
                    
                }
            }

        console.log("current:" + current)


    }

    function applyToPlansza() {
        
        var x = document.getElementsByClassName("mySlides");
        
        znajdzCurrent();
        // Set obrazka w PLANSZY
        console.log(currentImg)
        var src = currentImg.getAttribute("src")

        var sheet = document.createElement('style')
        sheet.innerHTML = ".komorka {background-image: url("+src+")}";
        document.body.appendChild(sheet);

    }
    

    function dodajWyniki() {
        if (document.getElementById("wyniki")) {
            document.getElementById("wyniki").remove()
        }
        var div = document.createElement("div")
        div.id = "wyniki";
        
        var ol = new Array(4);
        var text = new Array(4)
        for (var i = 0; i < 4; i++) {
            ol[i] = document.createElement("ol")
            ol[i].id = i + 3
            text[i] = document.createTextNode(i + 3 + "x" + (i + 3))
            div.appendChild(text[i])
            div.appendChild(ol[i])
        }


        document.body.appendChild(div)
    }
    
    function readCookie() {
        dodajWyniki()
        var ciasteczka = document.cookie.split(";")
        
        var imie = new Array(ciasteczka.length)
        var wynik = new Array(ciasteczka.length)
        var jakiWymiar = new Array(ciasteczka.length)
        var wynikPorownanie = new Array(ciasteczka.length)
        var polaczona = new Array(ciasteczka.length)
        for (var i = 0; i < ciasteczka.length; i++) {
            imie[i] = ciasteczka[i].split("=")[0]
            jakiWymiar[i] = imie[i].split("|")[1];
            imie[i] = imie[i].split("|")[0]
            wynik[i] = ciasteczka[i].split("=")[1]
            
            wynikPorownanie[i] = parseInt(wynik[i].split('.').join(''))
            

            console.log(imie[i], wynik[i], jakiWymiar[i], wynikPorownanie[i])
        }

        function bubbleSort(a) {
            var swapped;
            do {
                swapped = false;
                for (var i = 0; i < a.length - 1; i++) {
                    if (a[i] > a[i + 1]) {
                        var temp = a[i];
                        a[i] = a[i + 1];
                        a[i + 1] = temp;
                        var temp1 = imie[i];
                        imie[i] = imie[i + 1];
                        imie[i + 1] = temp1;
                        var temp2 = wynik[i];
                        wynik[i] = wynik[i + 1];
                        wynik[i + 1] = temp2;
                        var temp3 = jakiWymiar[i];
                        jakiWymiar[i] = jakiWymiar[i + 1]
                        jakiWymiar[i+1] = temp3
                        swapped = true;

                    }
                }
            } while (swapped);
        }
        bubbleSort(wynikPorownanie)

        console.log(wynik)

        console.log(wynikPorownanie)

        console.log(imie)

       

        var li = new Array(ciasteczka.length)
        for (var i = 0; i < ciasteczka.length; i++) {
            

            li[i] = document.createElement("li")
            var text = document.createTextNode(imie[i] + " " + wynik[i])
            li[i].appendChild(text)

            if (jakiWymiar[i] == 3) {
                document.getElementById(3).appendChild(li[i])

            }
            if (jakiWymiar[i] == 4) {
                document.getElementById(4).appendChild(li[i])

            }
            if (jakiWymiar[i] == 5) {
                document.getElementById(5).appendChild(li[i])

            } if (jakiWymiar[i] == 6) {
                document.getElementById(6).appendChild(li[i])

            }
            //console.log(li[i])
        }
}


    function rand(min, max){
        min = parseInt( min, 10 );
        max = parseInt( max, 10 );
        return Math.floor( Math.random() * ( max - min + 1 ) + min );
    }


    function przeszukaj() {
        for (var x = 0; x < wymiar; x++) {
            for (var y = 0; y < wymiar; y++) {
                if (document.getElementById("p" + x + y).firstChild.className == "pusta")
                    return document.getElementById("p" + x + y);
            }
        }
    }

    function sprawdzWynik() {
        var hh = document.getElementById("h0").childNodes[0].getAttribute("src").charAt(5) + document.getElementById("h1").childNodes[0].getAttribute("src").charAt(5)
        var mm = document.getElementById("m0").childNodes[0].getAttribute("src").charAt(5) + document.getElementById("m1").childNodes[0].getAttribute("src").charAt(5)
        var ss = document.getElementById("s0").childNodes[0].getAttribute("src").charAt(5) + document.getElementById("s1").childNodes[0].getAttribute("src").charAt(5)
        var ms = document.getElementById("ms0").childNodes[0].getAttribute("src").charAt(5) + document.getElementById("ms1").childNodes[0].getAttribute("src").charAt(5) + document.getElementById("ms2").childNodes[0].getAttribute("src").charAt(5)

        var wynik = hh + "." + mm + "." + ss + "." + ms
        console.log(wynik)
        return wynik;
    }

    var licznikInterval = 0
    var intervalObj = {
        start: function (ileRazy) {
            licznikInterval = 0;
            
            interval = setInterval(function () {
                if (ileRazy != licznikInterval) {
                    doKlikniecia()
                    licznikInterval++
                    console.log(licznikInterval)
                }
                else {
                    //console.log("koniec")
                    clearInterval(interval)
                    timeObj.start()
                }
            }, 1)
        }
    }
          
    Element.prototype.remove = function () { // Musia³em skozystac z .. - Najszybsza metoda usuniêcia elementu po id
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }

    function podziel(wymiar){

        if (document.getElementById("okno")) { // Je¿eli ju¿ istnieje (funklcja wykona³a siê przynajmniej raz)
            document.getElementById("okno").remove();
       } 

        var podzielna = 1024/wymiar; 

        var okno = document.createElement("div")
        okno.id = "okno"
        //Tworzenie tablicy na kafelki
        var komorka = new Array(wymiar);
        var komorkaZewnetrzna = new Array(wymiar)
        for(var p = 0; p < wymiar; p++){
            komorka[p] = new Array(wymiar);
            komorkaZewnetrzna[p] = new Array(wymiar);
        }
		
        for(var x = 0; x < wymiar; x++){
            for(var y = 0; y < wymiar; y++){
							
							
                var wwX = -podzielna * x;
                var wwY = -podzielna * y;
                komorkaZewnetrzna[x][y] = document.createElement("div");
                komorkaZewnetrzna[x][y].id = "p" + x + y;
                komorkaZewnetrzna[x][y].className = "komorkaZewnetrzna";
                komorka[x][y] = document.createElement("div");
				
                komorka[x][y].id = "q" + y + x;
                komorka[x][y].style.backgroundPosition = wwX + "px " + wwY + "px";
                komorkaZewnetrzna[x][y].style.width = 1024 / wymiar + "px";
                komorkaZewnetrzna[x][y].style.height = 1024 / wymiar + "px";
                komorka[x][y].style.width = 1024 / wymiar + "px";
                komorka[x][y].style.height = 1024 / wymiar + "px";
                komorka[x][y].classList.toggle("wolne");

                (function (x, y) {
                    komorkaZewnetrzna[x][y].addEventListener("click", function () { przesun(this, wymiar) })
                }(x, y))
            }
        }
				
        var stadium = 0;
        for(var x1 = 0; x1 < wymiar; x1++){ // Losowanie po³ozenia klockow
            for (var y1 = 0; y1 < wymiar; y1++) {
                okno.appendChild(komorkaZewnetrzna[x1][y1])
                if (stadium != (wymiar * wymiar) - 1 ) {
                    

                    komorka[x1][y1].className = "komorka";
                    komorkaZewnetrzna[x1][y1].appendChild(komorka[y1][x1]);
                    //console.log(stadium)
                }else{
                    var komorkaPusta = document.createElement("div")
                    komorkaPusta.className = "pusta";
                    komorkaPusta.style.width = 1024 / wymiar + "px";
                    komorkaPusta.style.height = 1024 / wymiar + "px";
                    komorkaZewnetrzna[wymiar - 1][wymiar - 1].appendChild(komorkaPusta)
                    
                }
                 stadium++   
                
            }
        }

        document.body.appendChild(okno)
    }
    
    function stworzButtony() {

        var buttony = document.createElement("div")
        buttony.id = "buttony";


        var slide = document.createElement("div")
        slide.id = "box"
        var slides = new Array(3)

        var slideContener = document.createElement("div")
        slideContener.id = "slide"
        

        for (var i = 0; i < 7; i++) {
            slides[i] = document.createElement("img")
            slides[i].className = "mySlides"
            
        }

        slides[0].setAttribute("src", "img/starWars.jpg")
        slides[1].setAttribute("src", "img/earth.jpg")
        slides[2].setAttribute("src", "img/sky.jpg")
        slides[3].setAttribute("src", "img/starWars.jpg")
        slides[4].setAttribute("src", "img/earth.jpg")
        slides[5].setAttribute("src", "img/sky.jpg")
        slides[6].setAttribute("src", "img/starWars.jpg")



        slides[0].style.position = "relative"
        slides[0].style.left= "-600px"
        slides[1].style.position = "relative"
        slides[1].style.bottom = "200px"
        slides[1].style.left = "-400px"

        slides[2].style.position = "relative"
        slides[2].style.bottom = "400px"
        slides[2].style.left = "-200px"

        slides[3].style.position = "relative"
        slides[3].style.bottom = "600px"
        slides[3].style.left = "0px"

        slides[4].style.position = "relative"
        slides[4].style.bottom = "800px"
        slides[4].style.left = "200px"

        slides[5].style.position = "relative"
        slides[5].style.bottom = "1000px"
        slides[5].style.left = "400px"

        slides[6].style.position = "relative"
        slides[6].style.bottom = "1200px"
        slides[6].style.left = "600px"

        for (var i = 0; i < 7; i++) {

            slide.appendChild(slides[i])
        }
        
        var wLewo = document.createElement("button")
        var wPrawo = document.createElement("button")
        wLewo.id = "wLewo"
        wPrawo.id = "wPrawo"
        wLewo.innerHTML = "&#10094;"
        wPrawo.innerHTML = "&#10095;"

        slideContener.appendChild(slide)
        slideContener.appendChild(wLewo)
        slideContener.appendChild(wPrawo)

        wLewo.addEventListener("click", function () { plusDivs(-1) })
        wPrawo.addEventListener("click", function () { plusDivs(1) })

        //console.log(slide)


        slideContener.appendChild(slide)

        buttony.appendChild(slideContener);


        var br = document.createElement("br")
        buttony.appendChild(br)

        /////////////////////////////////////////////////////////////////////
        //buttony


        var button = new Array(4)
        for (var i = 0; i < 4; i++) {
            button[i] = document.createElement("button")
            button[i].innerHTML = i + 3 + " x " + (i + 3)
            button[i].setAttribute("name", "b" + (i + 3))
            buttony.appendChild(button[i])

        }

        for (var i = 0; i < 4; i++) { // Tak dodajê listenery w pêtli 
            (function (i) {
                button[i].addEventListener("click", function () {
                    timeObj.stop()
                    timeObj.stop()
                    wymiar = i + 3
                    dodajTimer();
                    podziel(wymiar);
                    intervalObj.start(wymiar*wymiar*10)
                    
                })
            }(i))
        }

        document.body.appendChild(buttony)
        //showDivs(slideIndex);
    }

    function nieMieszaj(){
        timeObj.stop()
        timeObj.stop()
        
        dodajTimer();
        podziel(wymiar);
        intervalObj.start(wymiar)
                    
    }
   

    function czySlide(klikniety, wymiar) {
        /*
            Jezeli element ma obok pusty
                zamien z nim child div

        */
        //console.log(klikniety)
        var element = new Array(wymiar);

        for (var p = 0; p < wymiar; p++) {
            element[p] = new Array(wymiar);
        }

        for (x = 0; x < wymiar; x++) {
            for (y = 0; y < wymiar; y++) {
                element[x][y] = document.getElementById("p" + x + y)
                //console.log(element[x][y])
            }
        }
        /*
        for (x = 0; x < wymiar; x++) {
            for (y = 0; y < wymiar; y++) {
                console.log(element[x][y])
            }
        }
        */
        var wX = klikniety.id.charAt(1)
        var wY = klikniety.id.charAt(2)

        if (element[wX][wY].firstChild.classList != "pusta") {
            if (wY == 0) { // Pierwsza kolumna od lewej
                console.log("y = 0")

                if (wX == 0) { // Góra
                    console.log("x = 0")
                    if (element[parseInt(wX)][parseInt(wY) + 1].firstChild.classList == "pusta") {
                        return element[parseInt(wX)][parseInt(wY) + 1]
                    }
                    if(element[parseInt(wX) + 1][parseInt(wY)].firstChild.classList == "pusta"){
                        return element[parseInt(wX) + 1][parseInt(wY)];
                    }
                }
                else {
                    if (wX == wymiar - 1) { // Dó³
                        console.log("x = wymiar-1")
                        if (element[parseInt(wX)][parseInt(wY) + 1].firstChild.classList == "pusta") {
                            return element[parseInt(wX)][parseInt(wY) + 1]

                        }
                        if(element[parseInt(wX - 1)][parseInt(wY)].firstChild.classList == "pusta"){
                            return element[parseInt(wX - 1)][parseInt(wY)]
                        }
                    }
                    else {
                        console.log("Srodek Pion")
                        //Warunek dla ka¿dego innego ni¿ x = 0 i y = 0
                        if (element[parseInt(wX)][parseInt(wY) + 1].firstChild.classList == "pusta") {
                            return element[parseInt(wX)][parseInt(wY) + 1]
                        }
                        if(element[parseInt(wX - 1)][parseInt(wY)].firstChild.classList == "pusta"){
                            return element[parseInt(wX - 1)][parseInt(wY)]
                        }
                        if(element[parseInt(wX) + 1][parseInt(wY)].firstChild.classList == "pusta"){
                            return element[parseInt(wX) + 1][parseInt(wY)]
                        }
                    }
                }
            }
            if (wY == wymiar - 1) { // Ostatnia kolumna po prawej
                console.log("y = wymiar - 1")
                if (wX == 0) { // Góra
                    console.log("x = 0")
                    if (element[parseInt(wX)][parseInt(wY) - 1].firstChild.classList == "pusta") {
                        return element[parseInt(wX)][parseInt(wY) - 1]
                    }
                    if(element[parseInt(wX) + 1][parseInt(wY)].firstChild.classList == "pusta"){
                        return element[parseInt(wX) + 1][parseInt(wY)]
                    }
                }
                else {
                    if (wX == wymiar - 1) { // Dó³
                        console.log("x = wymiar-1")
                        if (element[parseInt(wX)][parseInt(wY) - 1].firstChild.classList == "pusta") {
                            return element[parseInt(wX)][parseInt(wY) - 1]

                        }
                        if (element[parseInt(wX) - 1][parseInt(wY)].firstChild.classList == "pusta") {
                            return element[parseInt(wX - 1)][parseInt(wY)]
                        }
                    }
                    else {
                        console.log("Srodek Pion")
                        //Warunek dla ka¿dego innego ni¿ x = 0 i y = 0
                        if (element[parseInt(wX)][parseInt(wY) - 1].firstChild.classList == "pusta") {
                            return element[parseInt(wX)][parseInt(wY) - 1]
                        }
                        if(element[parseInt(wX - 1)][parseInt(wY)].firstChild.classList == "pusta"){
                            return element[parseInt(wX - 1)][parseInt(wY)]
                        }
                        if(element[parseInt(wX) + 1][parseInt(wY)].firstChild.classList == "pusta"){
                            return element[parseInt(wX) + 1][parseInt(wY)]
                        }
                    }
                }
            }
            if (wX == 0 && (wY != 0) && (wY != (wymiar - 1))) { // x = 0  i y nie boczne elementy
                console.log("gora srodek")
                if (element[parseInt(wX)][parseInt(wY) - 1].firstChild.classList == "pusta") {
                    return element[parseInt(wX)][parseInt(wY) - 1]
                }
                if(element[parseInt(wX + 1)][parseInt(wY)].firstChild.classList == "pusta"){
                    return element[parseInt(wX + 1)][parseInt(wY)]
                }
                if (element[parseInt(wX)][parseInt(wY) + 1].firstChild.classList == "pusta") {
                    return element[parseInt(wX)][parseInt(wY) + 1]
                }
            }
            if (wX == wymiar - 1 && (wY != 0) && (wY != (wymiar - 1))) {
                console.log("dol srodek")
                if (element[parseInt(wX)][parseInt(wY) - 1].firstChild.classList == "pusta") {
                    return element[parseInt(wX)][parseInt(wY) - 1]
                }
                if(element[parseInt(wX) - 1][parseInt(wY)].firstChild.classList == "pusta"){
                    return element[parseInt(wX) - 1][parseInt(wY)]
                }
                if(element[parseInt(wX)][parseInt(wY) + 1].firstChild.classList == "pusta"){
                    return element[parseInt(wX)][parseInt(wY) + 1]
                }
            }
            if (wX != 0 && wX != wymiar - 1 && wY != 0 && wY != wymiar - 1) {
                console.log("srodek caly")
                if (element[parseInt(wX) - 1][parseInt(wY)].firstChild.classList == "pusta") {
                    return element[parseInt(wX) - 1][parseInt(wY)];
                }
                if(element[parseInt(wX)][parseInt(wY) + 1].firstChild.classList == "pusta"){
                    return element[parseInt(wX)][parseInt(wY) + 1]
                }
                if(element[parseInt(wX) + 1][parseInt(wY)].firstChild.classList == "pusta"){
                    return element[parseInt(wX) + 1][parseInt(wY)]
                }
                if(element[parseInt(wX)][parseInt(wY) - 1].firstChild.classList == "pusta"){
                    return element[parseInt(wX)][parseInt(wY) - 1]
                }
                
                

            }
        }
    }
    
    var licz = 0
    function sprawdz(wymiar) {
        //console.log(sprawdzWynik())
        licz++
        var licznik = 0
        var flaga = 0
        
        for (var x = 0; x < wymiar; x++) {
            for (var y = 0; y < wymiar; y++) {

                if (licznik < wymiar * wymiar) {
                    console.log(x, y)
                    if (document.getElementById("p" + x.toString() + y.toString()).id.substring(1, 3) == document.getElementById("p" + x.toString() + y.toString()).childNodes[0].id.substring(1, 3)) {
                        console.log("zgadzasie")
                        flaga++
                    }

                    licznik++
                }
            }
        }

        //console.log(overlayContent)
        
        if (flaga == wymiar * wymiar - 1) {
            //console.log(flaga)
            //console.log(wymiar * wymiar - 1)
            console.log("WYGRALES")

            if (sprawdzWynik() != "00.00.00.000") {
                var wynik = sprawdzWynik()
                openNav()

                if (document.getElementById("okno")) { // Je¿eli ju¿ istnieje (funklcja wykona³a siê przynajmniej raz)
                    document.getElementById("okno").remove();
                }

                overlayContent.innerHTML = "Twoj wynik to: " + wynik + "<br>";
                
                var input = document.createElement("input");
                input.setAttribute("value", "Imie")
                overlayContent.appendChild(input)

                var overlayButton = document.createElement("button");
                overlayButton.innerHTML = "OK"
                overlayButton.addEventListener("click", function () {
                    var imieCookie = input.value + "|" + wymiar;
                    var wynikCookie = wynik;
                    document.cookie = imieCookie + "=" + wynikCookie
                    closeNav()
                    readCookie();

                    
                    
                    //document.getElementsByName("b"+wymiar).click();
                });
                var br = document.createElement("br")
                overlayContent.appendChild(br)
                overlayContent.appendChild(overlayButton);

                timeObj.stop();
                

            }
              
        }
        else {
            //console.log(flaga)
            //console.log(wymiar * wymiar - 1)
            console.log("NIE WYGRALES")
        }
        
    }

    function przesun(klikniety, wymiar) {
        var pusta = czySlide(klikniety, wymiar);
        //var klikniety = klikniety;
        if (pusta) {
            console.log("Mozna przesunac!")
            //console.log(pusta.firstChild, klikniety.firstChild)

            var pom = pusta.firstChild.cloneNode(true);
            //console.log("pom = " + pom)
            pusta.appendChild(klikniety.firstChild)
            pusta.removeChild(pusta.firstChild)
            klikniety.appendChild(pom)
            
            sprawdz(wymiar)

        } else {
            console.log("nie mozna przesunac")
        }

    }

    // CZAS

    function dodajTimer() {

        if (document.getElementById("czas")) { // Je¿eli ju¿ istnieje (funklcja wykona³a siê przynajmniej raz)
            document.getElementById("czas").remove();
        }

        var timer = document.createElement("div")
        timer.id = "czas"

        var licznik = new Array(9)
        var img = new Array(9)
        var colon = new Array(2)

        for (var i = 0; i < 2; i++) {
            colon[i] = document.createElement("img")
            colon[i].setAttribute("src", "img/colon.gif")
        }


        var dot = document.createElement("img")
        dot.setAttribute("src", "img/dot.gif")

        for (var i = 0; i < 9; i++) {


            img[i] = document.createElement("img")
            img[i].setAttribute("src", "img/c0.gif")

            licznik[i] = document.createElement("div")
            licznik[i].appendChild(img[i])

            timer.appendChild(licznik[i])
        }
        timer.insertBefore(colon[0], timer.childNodes[2])
        timer.insertBefore(colon[1], timer.childNodes[5])
        timer.insertBefore(dot, timer.childNodes[8])

        document.body.appendChild(timer)
        //console.log(timer)

        licznik[0].id = "h0"
        licznik[1].id = "h1"
        licznik[2].id = "m0"
        licznik[3].id = "m1"
        licznik[4].id = "s0"
        licznik[5].id = "s1"
        licznik[6].id = "ms0"
        licznik[7].id = "ms1"
        licznik[8].id = "ms2"
    }

    function msXXX(start) {
        
        var testDate = Date.now()
        testDate = testDate - start

        var date = new Date(testDate)

        x = date.getMilliseconds().toString()
        //console.log(x)
        if (x.length == 3) {
            x = x.charAt(2)
        } else {
            if (x.length == 2) {
                x = x.charAt(1)
            } else {
                x = x.charAt(0)
            }
        }
        document.getElementById("ms2").childNodes[0].setAttribute("src", "img/c" + x + ".gif")
        
        //timeObj.wynik = testDate 
        // TO by³ BARDZO DOK£ADNY WYNIK

    }

    function msXX(start) {
        var testDate = Date.now()
        testDate = testDate - start

        testDate = new Date(testDate)

        x = testDate.getMilliseconds().toString()
        //console.log(x)
        if (x.length == 3) {
            x = x.charAt(1)
        } else {
            if (x.length == 2) {
                x = x.charAt(0)
            } else {
                x = 0;
            }
        }
        document.getElementById("ms1").childNodes[0].setAttribute("src", "img/c" + x + ".gif")
        //console.log(x)
    }


    function msX(start){
        var testDate = Date.now()
        testDate = testDate - start

        testDate = new Date(testDate)

        x = testDate.getMilliseconds().toString()
        //console.log(x)
        if (x.length == 3) {
            x = x.charAt(0)
        } else {
            x = 0;
        }
        document.getElementById("ms0").childNodes[0].setAttribute("src", "img/c" + x + ".gif")


        //console.log(x)
    }


    function sXX(start) {
        //console.log(start)
        var testDate = Date.now()
        testDate = testDate - start

        testDate = new Date(testDate)
        
        x = testDate.getSeconds().toString()
        //console.log(x)
        
        if (x.length == 2) {
            x = x.charAt(1)
        } else {
            x = x.charAt(0)
        }
        
        document.getElementById("s1").childNodes[0].setAttribute("src", "img/c" + x + ".gif")
        //console.log(x)
    }

    function sX(start) {
        //console.log(start)
        var testDate = Date.now()
        testDate = testDate - start

        testDate = new Date(testDate)

        x = testDate.getSeconds().toString()
        //console.log(x)

        if (x.length == 2) {
            x = x.charAt(0)
        } else {
            x = 0
        }

        document.getElementById("s0").childNodes[0].setAttribute("src", "img/c" + x + ".gif")
        //console.log(x)
    }

    function mXX(start) {
        //console.log(start)
        var testDate = Date.now()
        testDate = testDate - start

        testDate = new Date(testDate)

        x = testDate.getMinutes().toString()
        //console.log(x)

        if (x.length == 2) {
            x = x.charAt(1)
        } else {
            x = x.charAt(0)
        }

        document.getElementById("m1").childNodes[0].setAttribute("src", "img/c" + x + ".gif")
        //console.log(x)
    }

    function mX(start) {
        //console.log(start)
        var testDate = Date.now()
        testDate = testDate - start

        testDate = new Date(testDate)

        x = testDate.getMinutes().toString()
        //console.log(x)

        if (x.length == 2) {
            x = x.charAt(0)
        } else {
            x = 0
        }

        document.getElementById("m0").childNodes[0].setAttribute("src", "img/c" + x + ".gif")
        //console.log(x)
    }

    function hXX(start) {
        //console.log(start)
        var testDate = Date.now()
        testDate = testDate - start
        
        testDate = new Date(testDate)
        
        x = testDate.getHours().toString()
        //console.log(x)

        if (x.length == 2) {
            x = x.charAt(1)-1
        } else {
            x = x.charAt(0)-1
        }

        document.getElementById("h1").childNodes[0].setAttribute("src", "img/c" + x + ".gif")
        //console.log(x)

    }

    function hX(start) {
        //console.log(start)
        var testDate = Date.now()
        testDate = testDate - start

        testDate = new Date(testDate)

        x = testDate.getHours().toString()
        //console.log(x)

        if (x.length == 2) {
            x = x.charAt(0)-1
        } else {
            x = 0
        }

        document.getElementById("h0").childNodes[0].setAttribute("src", "img/c" + x + ".gif")
        //console.log(x)
    }
    

    var timeObj = {
        start: function () {
            var dateStart = Date.now() // to samo co timestamp
            
            VmsXXX = setInterval(function () { msXXX(dateStart) }, 1) // Czasem zdarza siê, ¿e pe³ny cykl nie wystarcza na 'za³apanie' zmienionej wartosci czasu
            VmsXX = setInterval(function () { msXX(dateStart) }, 10) // Dlatego w l. setek ms odœwie¿am czêœciej
            VmsX = setInterval(function () { msX(dateStart) }, 80)
            VsXX = setInterval(function () { sXX(dateStart) }, 198)
            VsX = setInterval(function () { sX(dateStart) }, 198)
            VmXX = setInterval(function () { mXX(dateStart) }, 498)
            VmX = setInterval(function () { mX(dateStart) }, 498)
            VhXX = setInterval(function () { hXX(dateStart) }, 498)
            VhX = setInterval(function () { hX(dateStart) }, 498)


        },
        stop: function () {
            //console.log(this.wynik)

            if (document.getElementById("czas")) {

                clearInterval(VmsXXX)
                clearInterval(VmsXX)
                clearInterval(VmsX)
                clearInterval(VsXX)
                clearInterval(VsX)
                clearInterval(VmXX)
                clearInterval(VmX)
                clearInterval(VhXX)
                clearInterval(VhX)

                document.getElementById("czas").remove();

            }
        }
        
    }

    
    //setTimeout(function(){timeObj.stop()}, 1322)

    /* Overlay i jego obs³uga */
    var overlay = document.createElement("div");
    overlay.id = "myNav";
    overlay.className = "overlay"

    var overlayContent = document.createElement("div");
    overlayContent.className = "overlay-content"
    overlayContent.innerHTML = "Twoj wynik to: " + "<br>"
    overlay.appendChild(overlayContent)

    var overlayButton = document.createElement("button");
    overlayButton.innerHTML = "OK"
    overlayButton.addEventListener("click", function () { closeNav() });
    overlayContent.appendChild(overlayButton);

    document.body.appendChild(overlay)

    function openNav() {
        var nav = document.getElementById("myNav")
        if (nav.style.height == "0%") {
            nav.style.height = "100%"
        }
        nav.style.width = "100%";

    }
    function closeNav() {
        document.getElementById("myNav").style.height = "0%";
    }


    stworzButtony();
    
    /* Losowe rozsypywanie obrazka */

    function doKlikniecia() {

        var element = new Array(wymiar)
        for (var i = 0; i < wymiar; i++) {
            element[i] = new Array(wymiar)
        }

        for (var x = 0; x < wymiar; x++) {
            for (var y = 0; y < wymiar; y++) {
                element[x][y] = document.getElementById("p" + x + y)
            }
        }
    
        wX = przeszukaj().id.charAt(1)
        wY = przeszukaj().id.charAt(2)

        if (wY == 0) { // Pierwsza kolumna od lewej
            console.log("y = 0")

            if (wX == 0) { // Góra
                console.log("x = 0")
                var w = rand(0, 1)
                if (w == 0) {
                    element[parseInt(wX)][parseInt(wY) + 1].click()
                }
                if (w == 1) {
                    element[parseInt(wX) + 1][parseInt(wY)].click()
                }
            }
            else {
                if (wX == wymiar - 1) { // Dó³
                    console.log("x = wymiar-1")
                    var w = rand(0, 1)

                    if (w == 0) {
                        element[parseInt(wX)][parseInt(wY) + 1].click()

                    }
                    if (w == 1) {
                        element[parseInt(wX - 1)][parseInt(wY)].click()
                    }
                }
                else {
                    console.log("Srodek Pion")
                    //Warunek dla ka¿dego innego ni¿ x = 0 i y = 0
                    var w = rand(0, 2)

                    if (w == 0) {
                        element[parseInt(wX)][parseInt(wY) + 1].click()
                    }
                    if (w == 1) {
                        element[parseInt(wX - 1)][parseInt(wY)].click()
                    }
                    if (w == 2) {
                        element[parseInt(wX) + 1][parseInt(wY)].click()
                    }
                }
            }
        }
        if (wY == wymiar - 1) { // Ostatnia kolumna po prawej
            console.log("y = wymiar - 1")
            if (wX == 0) { // Góra
                console.log("x = 0")
                var w = rand(0, 1)

                if (w == 0) {
                    element[parseInt(wX)][parseInt(wY) - 1].click()
                }
                if (w == 1) {
                    element[parseInt(wX) + 1][parseInt(wY)].click()
                }
            }
            else {
                if (wX == wymiar - 1) { // Dó³
                    console.log("x = wymiar-1")
                    var w = rand(0, 1)

                    if (w == 0) {
                        element[parseInt(wX)][parseInt(wY) - 1].click()

                    }
                    if (w == 1) {
                        element[parseInt(wX - 1)][parseInt(wY)].click()
                    }
                }
                else {
                    console.log("Srodek Pion")
                    //Warunek dla ka¿dego innego ni¿ x = 0 i y = 0
                    var w = rand(0, 2)

                    if (w == 0) {
                        element[parseInt(wX)][parseInt(wY) - 1].click()
                    }
                    if (w == 1) {
                        element[parseInt(wX - 1)][parseInt(wY)].click()
                    }
                    if (w == 2) {
                        element[parseInt(wX) + 1][parseInt(wY)].click()
                    }
                }
            }
        }
        if (wX == 0 && (wY != 0) && (wY != (wymiar - 1))) { // x = 0  i y nie boczne elementy
            console.log("gora srodek")
            var w = rand(0, 2)

            if (w == 0) {
                element[parseInt(wX)][parseInt(wY) - 1].click()
            }
            if (w == 1) {
                element[parseInt(wX + 1)][parseInt(wY)].click()
            }
            if (w == 2) {
                element[parseInt(wX)][parseInt(wY) + 1].click()
            }
        }
        if (wX == wymiar - 1 && (wY != 0) && (wY != (wymiar - 1))) {
            console.log("dol srodek")
            var w = rand(0, 2)

            if (w == 0) {
                element[parseInt(wX)][parseInt(wY) - 1].click()
            }
            if (w == 1) {
                element[parseInt(wX) - 1][parseInt(wY)].click()
            }
            if (w == 2) {
                element[parseInt(wX)][parseInt(wY) + 1].click()
            }
        }
        if (wX != 0 && wX != wymiar - 1 && wY != 0 && wY != wymiar - 1) {
            console.log("srodek caly")
            var w = rand(0, 3)

            if (w == 0) {
                element[parseInt(wX) - 1][parseInt(wY)].click()
            }
            if (w == 1) {
                element[parseInt(wX)][parseInt(wY) + 1].click()
            }
            if (w == 2) {
                element[parseInt(wX) + 1][parseInt(wY)].click()
            }
            if (w == 3) {
                element[parseInt(wX)][parseInt(wY) - 1].click()
            }

        }
        
    }
    
    //nieMieszaj()
    //Tylko trzy przesuniecia
    //intervalObj.start()
    //Mieszanie
}