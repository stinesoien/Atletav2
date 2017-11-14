var getClassesForBooking = function (date) {
    $.ajax({
        url: 'booking/' + date,
        type: 'GET'
    }).done(function(data) {
        document.get

    })
};

var bookClass = function () {
    $.ajax({
        url: 'booking/',
        type: 'POST'
    }).done(function (data) {

    })
};

