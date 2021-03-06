$('#form').submit(function(e){
    e.preventDefault();
        $.ajax({
            url: '/newUser',
            type: 'POST',
            data: {
                'fname': document.getElementById("fname").value,
                'sname': document.getElementById("sname").value,
                'phone': document.getElementById("phone").value,
                'email': document.getElementById("email").value,
                'address': document.getElementById("address").value,
                'password': document.getElementById("password").value
            },
            dataType: 'json',
            success: function () {
                var modalMemberSuccess = document.getElementById("alertSuccess");
                modalMemberSuccess.style.display = "block";
                window.location.href = "/";

            },
            error: function () {
                var modalMemberError = document.getElementById("alertError");
                modalMemberError.style.display="block";
            }
        })
});


//Modal: Bli Medlem
var newUserBtn = document.getElementById("newBtn");
var newUserPop = document.getElementById("modalNew");
var closeNewBtn = document.getElementById("closeNew");
var closeError = document.getElementById("closeErr");
var errorPop = document.getElementById("alertError");

//Lukker når klikker utenfor
window.onclick = function (event) {
    if(event.target == newUserPop) {
        newUserPop.style.display = "none";
    }
};

// Åpner bli medlem
newUserBtn.onclick = function () {
    newUserPop.style.display = "block";
};

// Lukker popup ved å trykke på x
closeNewBtn.onclick = function () {
    newUserPop.style.display = "none";
};

closeError.onclick = function () {
    errorPop.style.display = "none";
};