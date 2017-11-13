var updatePassword = function () {
    var newPassword = document.getElementById("newPassword1").value;
    var oldPassword = document.getElementById("oldPassword").value;
    var confirmPassword = document.getElementById("newPassword2").value;
    console.log("in update");

    $.ajax({
        url: '/updatePassword',
        type: 'PUT',
        data:{
            'newPassword': newPassword,
            'oldPassword': oldPassword,
            'confirmPassword': confirmPassword
        },
        dataType: 'json',
        success: function(data){
            alert("Passordet ditt er lagret!");
        },
        error: function(data){
            console.log(data);
        }
    });
};