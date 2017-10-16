

var updateUser = function() {
    console.log("in update");
    $.ajax({
        url: 'users/' + email,
        type: 'PUT',
        data: {
            'fornavn': document.getElementById("fornavn").value,
            'etternavn': document.getElementById("etternavn").value,
            'adresse': document.getElementById("adresse").value,
            'mobilnr': document.getElementById("mobilnr").value,
            'epost': email
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
            document.getElementById("adresse").value = data.User.adresse;
            document.getElementById("mobilnr").value = data.User.mobilnr;
            document.getElementById("fornavn").value = data.User.fornavn;
            document.getElementById("etternavn").value = data.User.etternavn;

        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });
};

var email = 1; // her vil vi hente ut email fra f.eks en cookie, session eller token elns, lar den være hardkodet for nå.
getUser(email);