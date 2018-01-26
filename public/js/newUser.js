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
        success: function (data) {
            /*
            var modalMemberSuccess = document.getElementById("alertSuccessMember");
            modalMemberSuccess.style.display = "block";
            document.getElementById("textSuccessMember").innerHTML = "Velkommen " + data.User.fname + data.User.sname;
            window.setTimeout(modalMemberSuccess, 10000);*/
            window.location.href = "/";
            //alert("Bruker opprettet");
        },
        error: function () {
            var modalMemberError = document.getElementById("alertErrorMember");
            modalMemberError.style.display="block";
            document.getElementById("textErrorMember").innerHTML = "Noe gikk galt";
            window.setTimeout(modalMemberError, 10000);
        }
    })
});


//Modal: Bli Medlem
var newUserBtn = document.getElementById("newBtn");
var newUserPop = document.getElementById("modalNew");
var closeNewBtn = document.getElementById("closeNew");

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