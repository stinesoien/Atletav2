$(function() {
    $('.scroll-down1').click (function() {
        $('html, body').animate({scrollTop: $('section.second').offset().top }, 'slow');
        return false;
    });
});

$(function() {
    $('.scroll-down2').click (function() {
        $('html, body').animate({scrollTop: $('section.third').offset().top }, 'slow');
        return false;
    });
});

$(function() {
    $('.scroll-down3').click (function() {
        $('html, body').animate({scrollTop: $('section.fourth').offset().top }, 'slow');
        return false;
    });
});

$(function() {
    $('.scroll-down4').click (function() {
        $('html, body').animate({scrollTop: $('section.fifth').offset().top }, 'slow');
        return false;
    });
});

var modal1 = document.getElementById("modalGym1");
var modal2 = document.getElementById("modalGym2");

var iconBtn1 = document.getElementById("gym1Btn");
var iconBtn2 = document.getElementById("gym2Btn");

var newUserBtn = document.getElementById("newBtn");
var newUserPop = document.getElementById("modalNew");

var closeBtn1 = document.getElementById("closeNew");
var closeBtn2 = document.getElementById("closeGym1");
var closeBtn3 = document.getElementById("closeGym2");

//Åpner modal 1
iconBtn1.onclick = function() {
    modal1.style.display = "block";
};

//Åpner modal 2
iconBtn2.onclick = function() {
    modal2.style.display = "block";
};

//Lukker når klikker utenfor
window.onclick = function (event) {
    if(event.target == modal1 || event.target == modal2 || event.target == newUserPop) {
        modal1.style.display = "none";
        modal2.style.display = "none";
        newUserPop.style.display = "none";
    }
};

// åpner bli medlem
newUserBtn.onclick = function () {
    console.log("Trykker bli medlem");
    newUserPop.style.display = "block";
}

// Lukker popup ved å trykke på x
closeBtn1.onclick = function () {
    newUserPop.style.display = "none";
}

closeBtn2.onclick = function () {
    modal1.style.display = "none";
}

closeBtn3.onclick = function () {
    modal2.style.display = "none";
}

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