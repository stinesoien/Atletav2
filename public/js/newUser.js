var newMember = function () {
    $.ajax({
        url: '/newUser',
        type: 'POST',
        data: {
            'fname': document.getElementById("fname").value,
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
