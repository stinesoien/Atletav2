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
        success: function(){
            var modalSuccess = document.getElementById("alertSuccess");
            modalSuccess.style.display = "block";
        },
        error: function(data){
            var modalError = document.getElementById("alertError");
            modalError.style.display="block";
        }
    });
};