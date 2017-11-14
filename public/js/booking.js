var getClassesForBooking = function () {
    $.ajax({
        url: 'booking/',
        type: 'GET'
    }).done(function(data) {

    })
};

var bookClass = function () {
    $.ajax({
        url: 'booking/',
        type: 'POST'
    }).done(function (data) {

    })
};

