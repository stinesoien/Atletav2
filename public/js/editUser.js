
var updateUser = function() {
    console.log("in update");
    $.ajax({
        url: 'session',
        type: 'PUT',
        success: function (data) {
            console.log(data);
            $.ajax({
                url: 'users/' + data.epost,
                type: 'PUT',
                data: {
                    'fname': document.getElementById("fname").value,
                    'sname': document.getElementById("sname").value,
                    'address': document.getElementById("address").value,
                    'phone': document.getElementById("phone").value,
                    'email': data.epost
                },
                dataType: 'json',
                success: function(data){
                    alert("Profilen din er lagret!");
                },
                error: function(data) {
                    console.log(data);
                }

            });

        }
    })
};

var getUser = function() {
    $.ajax({
        url: 'session',
        type: 'GET',
        success: function(data){
            console.log(data);
            $.ajax({
                url: 'users/' + data.epost,
                type: 'GET',
                success: function (data) {
                    document.getElementById("address").value = data.User.address;
                    document.getElementById("phone").value = data.User.phone;
                    document.getElementById("fname").value = data.User.fname;
                    document.getElementById("sname").value = data.User.sname;

                },
                error: function (data) {
                    alert(data.responseJSON.message);
                }
            });
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

};

//var email = 1; dette er den 'email': email

getUser();