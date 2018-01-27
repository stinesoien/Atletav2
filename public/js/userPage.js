//Endre info
var endreInfoBtn = document.getElementById("editInfo");
var editInfoPopup = document.getElementById("editInfoBox");

//Treninsprogram
var workoutProgBtn = document.getElementById("woProg");
var woProgPopup = document.getElementById("workoutProgBox");

var closeButton = document.getElementById("closePop");
var closeButton2 = document.getElementById("closePop2");
var closeButton3 = document.getElementById("closePsw");
var closeButton4 = document.getElementById("closePopRes");
var closeSucc = document.getElementById("closePopSuccess");
var closeErr = document.getElementById("closePopError");

//Oppdater Profil
var editButton = document.getElementById("updateUsr");

//Endre passord
var pswButton = document.getElementById("editPsw");
var editPswPop = document.getElementById("editPswBox");

//Mine reservasjoner
var resButton = document.getElementById("reserv");
var resPopup = document.getElementById("myBookingsBox");

var alertSucc = document.getElementById("alertSuccess");
var alertErr = document.getElementById("alertError");

closeSucc.onclick = function () {
    alertSucc.style.display = "none";
};

closeErr.onclick = function () {
    alertErr.style.display="none";
};

editButton.onclick = function () {
    updateUser();
}

// popup - endre info
endreInfoBtn.onclick = function () {
    editInfoPopup.style.display = "block";
};

// popup - treningsprogram
workoutProgBtn.onclick = function () {
    woProgPopup.style.display = "block";
};

// popup - endre passord
pswButton.onclick = function () {
    editPswPop.style.display = "block";
};

// popup - mine reservasjoner
resButton.onclick = function () {
    resPopup.style.display = "block";
};

window.onclick = function (event) {
    if (event.target == editInfoPopup || event.target == woProgPopup) {
        editInfoPopup.style.display = "none";
        woProgPopup.style.display = "none";
    }

    if (event.target == editPswPop) {
        editPswPop.style.display = "none";
        editInfoPopup.style.display = "block";
    }
};

closeButton.onclick = function () {
    editInfoPopup.style.display = "none";
};

closeButton2.onclick = function () {
    woProgPopup.style.display = "none";
};

closeButton3.onclick = function () {
    editPswPop.style.display = "none";
};

closeButton4.onclick = function () {
    resPopup.style.display = "none";

};
