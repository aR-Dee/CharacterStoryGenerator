    var placement = ["in","at","over","under", "in front of", "at the back of"];
    var gInfo, filtered;

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

function generateStory(filtered){
console.log(filtered)
}

function storyFilter(){


var checks = document.querySelectorAll("input[type='checkbox']:checked");
var filtered_sections = [];
    for (let i in checks){
            ////how to pass checkbox values to filtered global var?
            if($(checks[i]).val()){
                filtered_sections.push($(checks[i]).val());
            }
    }

    return filtered_sections
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
        filtered = storyFilter();
        generateStory(filtered);

        });
});