//Mine reservasjoner
var closeButton4 = document.getElementById("closePopRes");
var resButton = document.getElementById("reserv");
var resPopup = document.getElementById("myBookingsBox");

// popup - mine reservasjoner
resButton.onclick = function () {
    resPopup.style.display = "block";
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
        type: 'GET',
        success: function (data) {
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
                        + '<button type="button" id="deleteReservation" onclick="deleteReservations(this); window.location.reload(true);" data-id=' + thisReservation + '>Avbestill time</button>' + '</div>';
                }
            }
        }
    });
};

var deleteReservations = function (e) {
    getReservations();
    var test = $(e).data("id");
    //document.getElementById("deleteReservation").style.visibility="hidden";
    $.ajax({
        url: 'deleteReservation/',
        type: 'DELETE',
        data: {
            'b_id': test
        }
    }).done(function () {
        getReservations();
    })
};

getReservations();
deleteReservations(thisReservation);