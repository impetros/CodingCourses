$( document ).ready(function() {
    document.getElementById("nume").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("submit").click();
    }
    });
    document.getElementById("prenume").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
         event.preventDefault();
         document.getElementById("submit").click();
        }
    });
    document.getElementById("email").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("submit").click();
        }
    });
    document.getElementById("subject").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("submit").click();
        }
    });
});

function inscriere(){
    //validare();
    let account = {
        "firstName": document.getElementById('nume').value,
        "lastName": document.getElementById('prenume').value,
        "email": document.getElementById('email').value,
        "password": null,
        "courses":[
        ]
    }
    let root = "http://my-json-server.typicode.com/impetros/CodingCourses/accounts";
    let relativeRoot = "db.json";
    $.ajax ({
        url: root,
        dataType: "json",
        method: 'GET',
        success: function(response){ 
            console.log(response);
        },
        error: function(request,errorType, errorMsg){
            alert("Ajax Fehlfunktion:" + errorMsg);
        },
    });

    $.ajax ({
        url: root,
        dataType: "json",
        method: 'POST',
        data: account,
        success: function(response){ 
            console.log(response);
        },
        error: function(request,errorType, errorMsg){
            alert("Ajax Fehlfunktion:" + errorMsg);
        },
    });

    fetch(root, {
        method: 'POST',
        body: JSON.stringify({
            "firstName": document.getElementById('nume').value,
            "lastName": document.getElementById('prenume').value,
            "email": document.getElementById('email').value,
            "password": null,
            "courses":[
            ]
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(json => console.log(json))
    

      fetch(root)
      .then(response => response.json())
      .then(json => console.log(json))

    $.ajax (root, {
        dataType: "json",
        method: 'POST',
        data: account1,
        success: function(response){ 
            console.log(response);
        },
        error: function(request,errorType, errorMsg){
            alert("Ajax Fehlfunktion:" + errorMsg);
        },
    });

    
    $.ajax (root, {
        dataType: "json",
        method: 'POST',
        body: account1,
        success: function(response){ 
            account1.id = response.id;
            $.ajax (root, {
                dataType: "json",
                method: 'POST',
                body: account1,
                success: function(response){ 
                    console.log(response);
                },
                error: function(request,errorType, errorMsg){
                    alert("Ajax Fehlfunktion:" + errorMsg);
                }});
        },
        error: function(request,errorType, errorMsg){
            alert("Ajax Fehlfunktion:" + errorMsg);
        },
    });
    
}
function validare() {
    let nameRegex = /^[a-z ,.'-]+$/i;
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const firstName = document.getElementById('nume').value;
    const lastName = document.getElementById('prenume').value;
    const email = document.getElementById('email').value;
    if(!nameRegex.test(firstName)){
        Swal.fire(
            'Nu te-ai inscris cu succes!',
            'Numele de familie nu este valid',
            'error'
        )
    } else if(!nameRegex.test(lastName)){
        Swal.fire(
            'Nu te-ai inscris cu succes!',
            'Prenumele nu este valid',
            'error'
        )
    } else if(!emailRegex.test(email)){
        Swal.fire(
            'Nu te-ai inscris cu succes!',
            'Emailul nu este valid',
            'error'
        )
    } else {

        Swal.fire(
            'Te-ai inscris cu succes!',
            'Vei primi un mail cu confirmarea in cel mai scurt timp!',
            'success'
        );
        // location.reload();
    }

}