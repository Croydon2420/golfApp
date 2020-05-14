let numplayers = 0;
let numholes = 18;
let allcourses;
let mycourse;
let mytee;
let idNumber = 0;

loadDoc();
function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            allcourses = JSON.parse(this.responseText);
            for(let i = 0; i < allcourses.courses.length; i++){
                $("#mycourses").append(`<option value="${allcourses.courses[i].id}">${allcourses.courses[i].name}</option>`)
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}

function getcourse(theid) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            mycourse = JSON.parse(this.responseText);
                mycourse = JSON.parse(this.responseText);
                for(let i = 0; i < mycourse.data.holes[0].teeBoxes.length; i++){
                    $("#mytees").append(`<option value="${i}">${mycourse.data.holes[0].teeBoxes[i].teeType}</option>`);
                }
            }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${theid}`, true);
    xhttp.send();
}

function setTee(teeid) {
    mytee = teeid;
    buildcol();
}


function buildcol() {
    for(let c = 1; c <= numholes; c++){
        let adj = c -1;
        $(".box").append(`<div id="col${c}" class="column">
                                <div class="header">
                                    <div class="holenuma">${c}</div>
                                    <div class="ydg">${mycourse.data.holes[adj].teeBoxes[mytee].yards} ydg</div>
                                    <div class="par">Par ${mycourse.data.holes[adj].teeBoxes[mytee].par}</div>
                                </div>
                            </div>`)
    }
}

function buildholes() {
    for(let h = 1; h <= numholes; h++){
        $("#col" + h).append(`<div><input id="p${numplayers}h${h}" class="minibox"></div>`)
    }
    $(".minibox").keyup(function () {
       console.log($(this).attr("id"));
    });
}

function addplayer() {
    numplayers++;
    idNumber++;
    buildholes();
    $(".namelist").append(`<div class="namebox" id="name${idNumber}" contenteditable="true">Enter Name</div>`)
}