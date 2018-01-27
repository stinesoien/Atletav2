var loginBox = document.getElementById("loginForm");
var closeButtonLog = document.getElementById("closeLog");

closeButtonLog.onclick = function () {
    loginBox.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == loginBox){
        loginBox.style.display = "none";
    }
};