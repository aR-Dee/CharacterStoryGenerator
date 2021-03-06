    var placement = ["in","at","over","under", "in front of", "at the back of"];
    var gInfo;
    let filtered = [];

    function loadJSONfiles(){
  // !!! names in array must mach filenames !!!
    let g_info = {"character":"", "place":"", "action":""}
    let keys = Object.keys(g_info)

    for(let i in keys){
        $.getJSON(keys[i]+".json", function(data){
            g_info[keys[i]] = data
        }).fail(function(){
            console.log("An error has occurred when loading :" + keys[i]);
        });
    }
    return g_info;
};

function displayStory(){


}

function generateStory(filtered){
    let character = [], action = [], place = [];

    //divides into basic categories that make story from chosen filters
    for (let i in filtered){
        if(filtered[i].search("character") != -1){ character = character.concat(getStoryPart(filtered[i])) }
        if(filtered[i].search("place") != -1){place = place.concat(getStoryPart(filtered[i]))}
        if(filtered[i].search("action") != -1){action = action.concat(getStoryPart(filtered[i]))}
    }

    var rndChar = rndElementPickup(character);
    var rndPlace = rndElementPickup(place);
    var rndAct = rndElementPickup(action).toLowerCase();
    var rndPlaceGlue = rndElementPickup(placement).toLowerCase();

    return rndChar +" "+ rndAct +" "+ rndPlaceGlue +" "+ rndPlace;
}

function getStoryPart(filteredObj){
    let a = filteredObj.split(".")
    return gInfo[a[0]][a[1]]
}

function rndElementPickup(elArray){
    return singleRandom = elArray[Math.floor(Math.random() * elArray.length)];
}

function storyFilter(){
var checks = document.querySelectorAll("input[type='checkbox']:checked");
let filtered_sections = [];
    for (let i in checks){
            ////how to pass checkbox values to filtered global var?
            if(checks[i].checked == true){
                filtered_sections.push(checks[i].value);
            }
    }
    return filtered_sections
}

function checkBoxStates(){
    var charChecks = validateChecks(document.querySelectorAll("input.char_box"));
    var placeChecks = validateChecks(document.querySelectorAll("input.action_box"));
    var actionChecks = validateChecks(document.querySelectorAll("input.place_box"));

    if(charChecks & placeChecks & actionChecks) return true
    else return false
}

function validateChecks(boxChecks){
    var counter = 0;
    for(i in boxChecks){
        if (boxChecks[i].checked == true) counter ++;
        }
    if (counter >= 1 ) return true
    else return false
}

$(document).ready(function(){

    gInfo = loadJSONfiles()

//for debug only
/*    setTimeout (() => {
    filtered = [gInfo.character.fanart, gInfo.place.generic, gInfo.action.generic]
    }, 2000);
*/

$('.randomizer-btn').on('click', function(event){
    event.preventDefault();
    if(!checkBoxStates()){
        $("#checkbox-error").show();
    }
    else{
        $("#checkbox-error").hide();
        filtered = storyFilter();
        //console.log(storyFilter());
        story = generateStory(storyFilter());
        $(".generated-story").text(story)
        console.log(story);}
    });
});