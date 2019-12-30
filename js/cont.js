let rootAccounts = 'https://my-json-server.typicode.com/impetros/CodingCourses/accounts';
let rootCourses = 'https://my-json-server.typicode.com/impetros/CodingCourses/courses';

var myInterval;

$( document ).ready(function() {
    let logged = sessionStorage.getItem('logged');
    if(logged == null){
        document.getElementById("loggedDiv").remove();
        document.getElementsByClassName('container')[0].style.height = '40%';
        document.getElementsByClassName('container')[0].style.width = '20%';
        document.getElementById("loginDiv").style.width = '50%';
        document.getElementById("loginDiv").style.margin = '0 auto';
    } else {
        document.getElementById("loginDiv").remove();
        var account = {};
        $.ajax ({
            url: rootAccounts + '?id=' + logged,
            dataType: "json",
            method: 'GET',
            async: false,
            success: function(response){ 
                account.id = response[0].id
                account.firstName = response[0].firstName;
                account.lastName = response[0].lastName;
                account.email = response[0].email;
                account.courses = response[0].courses;
                document.getElementById('nume').value = account.firstName;
                document.getElementById('prenume').value = account.lastName;
                document.getElementById('email').value = account.email;
            },
            error: function(request,errorType, errorMsg){
                alert("Ajax Fehlfunktion:" + errorMsg);
            },
        });
        var courses = [];
        for(let i = 0; i < account.courses.length; i++){
            $.ajax ({
                url: rootCourses + '?id=' + account.courses[i],
                dataType: "json",
                method: 'GET',
                async: false,
                success: function(response){
                    if(response.length > 0){
                        courses.push(response[0]);
                        var option = document.createElement("option");
                        option.text = response[0].nume;
                        document.getElementsByTagName('select')[0].add(option)
                    } 
                },
                error: function(request,errorType, errorMsg){
                    alert("Ajax Fehlfunktion:" + errorMsg);
                },
            });
        }
        var audioDiv = document.createElement("div");
        var audio = document.createElement("AUDIO");
        audio.setAttribute("src","audio/curs1.mp3");
        audio.setAttribute("controls", "controls");
        var list = document.getElementById("loggedForm");
        audioDiv.appendChild(audio);
        list.insertBefore(audioDiv, list.childNodes[list.childNodes.length-2]);
        linebreak = document.createElement("br");
        list.insertBefore(linebreak, list.childNodes[list.childNodes.length-2]);
        var video = document.createElement("VIDEO");
        video.setAttribute("src","video/curs1.mp4");
        video.setAttribute("controls", "controls");
        list.insertBefore(video, list.childNodes[list.childNodes.length-2]);
        list.insertBefore(linebreak, list.childNodes[list.childNodes.length-2]);
    }

});

function logins(){
    let email = document.getElementById("loginemail").value;
    let password = document.getElementById("loginpassword").value;
    
    $.ajax ({
        url: rootAccounts + '?email=' +email,
        dataType: "json",
        method: 'GET',
        success: function(response){ 
            if(response.length > 0){
                if(response[0].password == password){
                    sessionStorage.setItem('logged', response[0].id);
                    location.reload();
                } else {
                    Swal.fire(
                        'Logarea nu s-a putut!',
                        'Emailul sau parola nu este corecta',
                        'error'
                    )
                }
            } else {
                Swal.fire(
                    'Logarea nu s-a putut!',
                    'Emailul sau parola nu este corecta',
                    'error'
                )
            }

        },
        error: function(request,errorType, errorMsg){
            alert("Ajax Fehlfunktion:" + errorMsg);
        },
    });
}

function registers(){
    document.getElementById('loginDiv').classList.add('hidden');
    document.getElementsByClassName('container')[0].style.height = '70%';
    document.getElementsByClassName('container')[0].style.width = '40%';
    document.getElementById('registerDiv').classList.remove('hidden');
}

function backToLogin(){
    document.getElementById('registerDiv').classList.add('hidden');
    document.getElementsByClassName('container')[0].style.height = '40%';
    document.getElementsByClassName('container')[0].style.width = '20%';
    document.getElementById('loginDiv').classList.remove('hidden');
}

function logouts(){
    sessionStorage.removeItem('logged');
    location.reload();
}

function inregistrare(){
    if(validare()){
        Swal.fire(
            'Te-ai inregistrat cu succes!',
            'Vei primi un mail cu confirmarea in cel mai scurt timp!',
            'success'
        );
        setTimeout(function(){ location.reload() }, 3000);
    }
}

function validare(){
    return true;
}

function alreadyAccount(){
    myInterval = setInterval(boolWarning,5000);
}

function boolWarning(){
    Swal.fire(
        'Folosesti contul!',
        'Daca ai participat la curs, inseamna ca ai cont CoolCode. Foloseste-l pentru a-ti tine toate datele intr-un singur loc.',
        'warning'
    )
}

function stopInterval(){
    clearInterval(myInterval);
}