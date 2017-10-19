
var updateUser = function() {
    console.log("in update");
    $.ajax({
        url: 'users/' + email,
        type: 'PUT',
        data: {
            'fname': document.getElementById("fname").value,
            'sname': document.getElementById("sname").value,
            'address': document.getElementById("address").value,
            'phone': document.getElementById("phone").value,
            'email': email
        },
        dataType: 'json',
        success: function(data){
            alert("Profilen din er lagret!");
        },
        error: function(data) {
            console.log(data);
        }

    });
};

var getUser = function(email) {
    $.ajax({
        url: 'users/' + email,
        type: 'GET',
        success: function(data){
            document.getElementById("address").value = data.User.address;
            document.getElementById("phone").value = data.User.phone;
            document.getElementById("fname").value = data.User.fname;
            document.getElementById("sname").value = data.User.sname;

        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });
};

var email = 1; // her vil vi hente ut email fra f.eks en cookie, session eller token elns, lar den være hardkodet for nå.

getUser(email);