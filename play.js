window.addEventListener("DOMContentLoaded", function() {
  const sceneEl = document.querySelector("a-scene");
  sceneEl.addEventListener("enter-vr", function() {
    document.querySelector('#play-button').style.visibility = "hidden";
  });
  sceneEl.addEventListener("exit-vr", function() {
    document.querySelector('#play-button').style.visibility = "visible";
  });
})