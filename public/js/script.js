window.setTimeout(function () {
    window.location.href = "chat";
}, 6000);

window.setTimeout(function(){
    document.getElementsByClassName('start')[0].style.display = 'block';
}, 4500);

window.onload = (event) => {
    var i = 0;
    var txt = 'Translate your life...';
    var speed = 50;

    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("moving-text").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
}