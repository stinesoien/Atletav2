var gym1 = document.getElementById("modalGym1");
var gym2 = document.getElementById("modalGym2");

var iconGym1 = document.getElementById("gym1Btn");
var iconGym2 = document.getElementById("gym2Btn");

var closeGym1 = document.getElementById("closeGym1");
var closeGym2 = document.getElementById("closeGym2");


//Åpner gymmodal 1
iconGym1.onclick = function() {
    gym1.style.display = "block";
};

//Åpner gymmodal 2
iconGym2.onclick = function() {
    gym2.style.display = "block";
};

//Lukker gymmodal 1
closeGym1.onclick = function () {
    gym1.style.display = "none";
};

//Lukker gymmodal 2
closeGym2.onclick = function () {
    gym2.style.display = "none";
};

//Lukker hvis klikk utenfor
window.onclick = function (event) {
    if(event.target == gym1 || event.target == gym2) {
        gym1.style.display = "none";
        gym2.style.display = "none";
    }
};