"use strict";

document.getElementById("button_landingpage").addEventListener("click", togglePage);
document.getElementById("button_episodes").addEventListener("click", togglePage);

document.getElementById("button_english").addEventListener("click", chooseLanguage);
document.getElementById("button_piglatin").addEventListener("click", chooseLanguage);


function togglePage(event) {
    if(event.target.id == "button_landingpage") {
        document.getElementById("page_episodes").classList.add("collapse");
        document.getElementById("page_home").classList.remove("collapse");
    } else if(event.target.id == "button_episodes") {
        document.getElementById("page_home").classList.add("collapse");
        document.getElementById("page_episodes").classList.remove("collapse");
    } 
}

function chooseLanguage(event) {
    if(event.target.id =="button_english") {
        console.log("Hit English");
    } else if(button_piglatin) {
        console.log("Hit Pig laten");
        getJSON(function(){}, "la_PG.json");
    }
}


/**
 * Init bindings for english
 */
getJSON(function (){

    console.log("appliedbinding");
    binding = ko.applyBindings(stdurham);
}, "en_US.json");

/**
 * Get JSON helper function
 */
function getJSON(callback, jsonFile) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', jsonFile, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {

            
            
            //let object = JSON.parse(xobj.responseText);

            //stdurham.gallery = ko.observableArray(object.gallery);

            stdurham = ko.mapping.fromJS(xobj.responseText);

            ko.mapping.fromJS(stdurham, stdurham);
            //let observabledata = ko.observable(object);
            
            //stdurham.currentLanguage = observabledata;

            console.log(stdurham);
            callback();

        }
    };
    //Need to handle possible file errors
    xobj.send(null);
}



