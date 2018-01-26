var thisDate = document.getElementById("showDate");
thisDate.innerHTML = Date.today().toString("dd-MM-yyyy");
var today = Date.today();
var date = Date.today().toString("yyyy-MM-dd");
var thisBook= document.getElementById("bookClass");

var op = 0;
var compareDate = "";
var correctDate = "";

var getNextDay = function() {
    if(op <= 6) {
        correctDate = Date.today().addDays(op + 1).toString("yyyy-MM-dd");
        getClassesForBooking(correctDate);
        thisDate.innerHTML = Date.today().addDays(op+1).toString("dd-MM-yyyy");
        op++;
    }
};

var getPastDay = function () {
    compareDate = Date.today().addDays(op - 1);
    var compareRes = today.compareTo(compareDate);
    if(op >= -6 && compareRes < 1) {
        correctDate = Date.today().addDays(op - 1).toString("yyyy-MM-dd");
        getClassesForBooking(correctDate);
        thisDate.innerHTML = Date.today().addDays(op-1).toString("dd-MM-yyyy");
        op--;
    }
};


var getClassesForBooking = function (date) {
    $.ajax({
        url: 'loggedInBooking/' + date,
        type: 'GET'
    }).done(function (data) {
        document.getElementById("groupClass").innerHTML = ' ';
        for (var i = 0; i < data.length; i++) {
            thisBook = data[i].b_id;
            document.getElementById("groupClass").innerHTML += '<div id="bookClass" >' + JSON.stringify("       " +
                data[i].time + "                       " + data[i].b_name).replace(/\"/g, "")
                + '<button type="button" class="'+ i +'" id="bookButton" onclick="makeBooking(this)" data-id=' + thisBook + '>Book time</button>' + '</div>';
        }
    })
};


var makeBooking = function (e) {
    var test = $(e).data("id");
    buttons1= document.getElementById("bookButton");
    for(var i= 0; i<buttons1.length; i++){
        buttons1[i].style.visibility="hidden";
    }
    //document.getElementById("bookButton").style.visibility="hidden";
    $.ajax({
        url: 'booking/',
        type: 'POST',
        data: {
            'b_id': test
        },
        dataType: 'json',

        error: function (data) {
            console.log(data);
        }
    });
};

makeBooking(thisBook);
getClassesForBooking(date);

