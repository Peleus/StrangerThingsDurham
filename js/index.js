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
        getJSON(function(parsed){
            ko.mapping.fromJS(parsed, viewModel);
        }, "en_US.json");
    } else if(button_piglatin) {
        getJSON(function(parsed){
            ko.mapping.fromJS(parsed, viewModel);
        }, "la_PG.json");
    }
}

var viewModel = {
    //heading: ko.observable()
    
}


getJSON(function(parsed){

    viewModel = ko.mapping.fromJS(parsed);

    ko.applyBindings(viewModel);
}, "en_US.json")



/**
 * Get JSON helper function
 */
function getJSON(callback, jsonFile) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', jsonFile, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {

            var jsonString = xobj.responseText;
            var parsed  = JSON.parse(jsonString);

            //applyBinding(parsed);
            
            callback(parsed);

        }
    };
    //Need to handle possible file errors
    xobj.send(null);
}

function applyBinding(parsed) {
    //viewModel.heading(parsed.heading);
}
