var newMember = function () {
    $.ajax({
        url: '/newUser',
        type: 'POST',
        data: {
            'fname': document.getElementById("fname").value = text,
            'sname': document.getElementById("sname").value,
            'phone': document.getElementById("phone").value,
            'email': document.getElementById("email").value,
            'address': document.getElementById("address").value,
            'password': document.getElementById("password").value,
        },
        dataType: 'json',
        success: function (res) {
            window.location.href = "/";
            alert("Bruker opprettet");
        }
    })
};

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