function Ui() {
    this.overlay = document.getElementById("overlay");

    window.addEventListener('resize', () => {
        level.camera.aspect = window.innerWidth / window.innerHeight;
        level.camera.updateProjectionMatrix();
        level.renderer.setSize(window.innerWidth, window.innerHeight);
    }, false)


    document.addEventListener("mousedown", utils.findRaycasted, false);
}