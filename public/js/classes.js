// Slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

var startLevel = slider.value;
var info;

var getLevel = function (level) {
    $.ajax({
        url: 'classes/' + level,
        type: 'GET'
    }).done(function (data) {
        info = data;
        document.getElementById("allClasses").innerHTML = '';
        for (var i = 0; i < data.length; i++) {
            document.getElementById("allClasses").innerHTML += '<ul id="' + i + '" class="thisClass">'
                + JSON.stringify(data[i].class_name).replace(/\"/g, "") + '</ul>';

        }
        buttons = document.getElementsByClassName("thisClass");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", redirect, false);
        }
    });

};

slider.oninput = function () {
    output.innerHTML = this.value;
    var level = this.value;
    getLevel(level);
}

getLevel(startLevel);


function redirect(ev) {
    console.log("redirect");
    var index = ev.target.id;
    ev.target.innerHTML = info[index].information;
}