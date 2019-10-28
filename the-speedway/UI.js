document.addEventListener("keydown", (evt) => {
    switch (evt.key) {
        case " ":
            {
                document.querySelector(".overlay").classList.add("hidden")
                var el = document.querySelector("canvas");
                var container = document.querySelector(".container");
                var canvas = document.querySelector("canvas");
                container.classList.remove("hidden")


                // canvas.calssList.remove("visible")
                // el.remove();
                // container.appendChild(el);


                this.init();
                evt.preventDefault();
                break;
            }
    }
})