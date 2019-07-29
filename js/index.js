var App = (function(){
    "use strict";
    
    document.getElementById("button_landingpage").addEventListener("click", togglePage);
    document.getElementById("button_episodes").addEventListener("click", togglePage);
    
    document.getElementById("button_english").addEventListener("click", chooseLanguage);
    document.getElementById("button_piglatin").addEventListener("click", chooseLanguage);
    
    
    /**
     * Toggle the Home and episodes view
     * @param event 
     */
    function togglePage(event) {
        if(event.target.id == "button_landingpage") {
            document.getElementById("page_episodes").classList.add("collapse");
            document.getElementById("page_home").classList.remove("collapse");
        } else if(event.target.id == "button_episodes") {
            document.getElementById("page_home").classList.add("collapse");
            document.getElementById("page_episodes").classList.remove("collapse");
        } 
    }
    
    /**
     * Switch languages from interface input 
     * @param event The event object
    */
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
    
    /** The viewmodel */
    var viewModel = {};
    
    /**
     * Init mapping of JSON and bind data as an observable
     * @param parsed Parsed JSON file into object
     */
    getJSON(function(parsed){
    
        viewModel = ko.mapping.fromJS(parsed);
    
        ko.applyBindings(viewModel);
    }, "en_US.json")
    
    
    
    /**
     * Get JSON helper function
     * @param callback Async callback function
     * @param jsonFile String name of JSON file
     */
    function getJSON(callback, jsonFile) {
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', jsonFile, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 ) {
                if(xobj.status == "200") {
                    var jsonString = xobj.responseText;
    
                jsonString = cleanData(jsonString);
    
                var parsed  = JSON.parse(jsonString);
    
                callback(parsed);
                }else {
                    document.getElementById("page_episodes").classList.add("collapse");
                    document.getElementById("page_home").classList.add("collapse");
                    document.getElementById("page_error").classList.remove("collapse");
                }
                
            }
        };
        xobj.send(null);
    }
    
    /**
     * Fix bad JSON variable name format
     * @param jsonString JSON string with bad variable names
     * @return Fixed JSON string
     */
    function cleanData(jsonString) {
    
        var fixedJSONString = jsonString.replace("video-embed", "videoembed");
        fixedJSONString = fixedJSONString.replace("episode-list", "episodelist");
    
        return fixedJSONString;
    }
    
    }());