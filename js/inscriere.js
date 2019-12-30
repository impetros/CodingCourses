let nameRegex = /^[a-z ,.'-]+$/i;
let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    $('.firstname').on('keypress keydown keyup',function(){
        if (!$(this).val().match(nameRegex)) {
         // there is a mismatch, hence show the error message
            $('.firstnamemsg').removeClass('hidden');
            $('.firstnamemsg').show();
        }
      else{
           // else, do not display message
           $('.firstnamemsg').addClass('hidden');
          }
    });

    $('.lastname').on('keypress keydown keyup',function(){
        if (!$(this).val().match(nameRegex)) {
         // there is a mismatch, hence show the error message
            $('.lastnamemsg').removeClass('hidden');
            $('.lastnamemsg').show();
        }
      else{
           // else, do not display message
           $('.lastnamemsg').addClass('hidden');
          }
    });

    $('.email').on('keypress keydown keyup',function(){
        if (!$(this).val().match(emailRegex)) {
         // there is a mismatch, hence show the error message
            $('.emailmsg').removeClass('hidden');
            $('.emailmsg').show();
        }
      else{
           // else, do not display message
           $('.emailmsg').addClass('hidden');
          }
    });
});

function inscriere(){
    if(validare()){
        const tombola = document.getElementById('tombola').value;
        if(parseInt(tombola) === Math.floor(Math.random() * 5)+1){
            Swal.fire(
                'Felicitari ai castigat 10% discount si te-ai inscris cu succes!',
                'Vei primi un mail cu confirmarea in cel mai scurt timp!',
                'success'
            );
        } else {
            Swal.fire(
                'Te-ai inscris cu succes!',
                'Vei primi un mail cu confirmarea in cel mai scurt timp!',
                'success'
            );
        }
    }

}
function validare() {
    const firstName = document.getElementById('nume').value;
    const lastName = document.getElementById('prenume').value;
    const email = document.getElementById('email').value;
    if(!nameRegex.test(firstName)){
        Swal.fire(
            'Nu te-ai inscris cu succes!',
            'Numele de familie nu este valid',
            'error'
        )
        return false;
    } else if(!nameRegex.test(lastName)){
        Swal.fire(
            'Nu te-ai inscris cu succes!',
            'Prenumele nu este valid',
            'error'
        )
        return false;
    } else if(!emailRegex.test(email)){
        Swal.fire(
            'Nu te-ai inscris cu succes!',
            'Emailul nu este valid',
            'error'
        )
        return false;
    }
    return true;

}