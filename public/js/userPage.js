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

//Endre passord
var pswButton = document.getElementById("editPsw");
var editPswPop = document.getElementById("editPswBox");

//Mine reservasjoner
var resButton = document.getElementById("reserv");
var resPopup = document.getElementById("myBookingsBox");


// popup - endre info
endreInfoBtn.onclick = function () {
    editInfoPopup.style.display = "block";
}

// popup - treningsprogram
workoutProgBtn.onclick = function () {
    woProgPopup.style.display = "block";
}

// popup - endre passord
pswButton.onclick = function () {
    editPswPop.style.display = "block";
}

// popup - mine reservasjoner
resButton.onclick = function () {
    resPopup.style.display = "block";
}

window.onclick = function (event) {
    if (event.target == editInfoPopup || event.target == woProgPopup) {
        editInfoPopup.style.display = "none";
        woProgPopup.style.display = "none";
    }

    if (event.target == editPswPop) {
        editPswPop.style.display = "none";
        editInfoPopup.style.display = "block";
    }
}


closeButton.onclick = function () {
    editInfoPopup.style.display = "none";
}

closeButton2.onclick = function () {
    woProgPopup.style.display = "none";
}

closeButton3.onclick = function () {
    editPswPop.style.display = "none";
}

closeButton4.onclick = function () {
    resPopup.style.display = "none";

}

//reservasjoner js-kode
var month = Date.today().toString("MM");
var day = Date.today().toString("dd");
var year = Date.today().toString("yyyy");

var todaysDate = day + month + year;
var intDate = parseInt(todaysDate);
console.log("Dagens dato:" + intDate);

var thisReservation = document.getElementById("reservation")

var getReservations = function () {
    $.ajax({
        url: 'myReservations/',
        type: 'GET'
    }).done(function (data) {
        document.getElementById("oneReservation").innerHTML = ' ';
        for (var i = 0; i < data.length; i++) {
            var daySql = data[i].sqlDay;
            var monthSql = data[i].sqlMonth;
            var yearSql = data[i].sqlYear;
            var currentDate = daySql + monthSql + yearSql;
            var intCurrentDate = parseInt(currentDate);

            console.log("current dato:" + intCurrentDate + " b id:" + data[i].b_id);

            if (intCurrentDate >= intDate) {
                thisReservation = data[i].b_id;
                console.log("thisReservation:" + thisReservation);
                document.getElementById("oneReservation").innerHTML += '<div id="reservation">' + JSON.stringify("        " + data[i].b_name + "          " + data[i].time + "         " + data[i].dateFormat).replace(/\"/g, "")
                    + '<button type="button" id="deleteReservation" onclick="deleteReservations(this)" data-id=' + thisReservation + '>Avbestill time</button>' + '</div>';
            }
        }
    })
};

var deleteReservations = function (e) {
    var test = $(e).data("id");
    $.ajax({
        url: 'deleteReservation/',
        type: 'DELETE',
        data: {
            'b_id': test
        }
    }).done(function () {
        getReservations();
    })

}

getReservations();
deleteReservations(thisReservation);