"use strict";

getJSON(function (){
    console.log("got callback");
}, "test.json");


let currentLanguage = ko.observable();

/**
 * Get JSON helper function
 */
function getJSON(callback, jsonFile) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', jsonFile, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {

            let object = JSON.parse(xobj.responseText);

            let observabledata = ko.observable(object);

            currentLanguage = observabledata;
            currentLanguage = ko.observable();
            callback();

        }
    };
    //Need to handle possible file errors
    xobj.send(null);
}