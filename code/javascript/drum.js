const image = ["open-hihat", "closed-hihat", "crash1", "crash2", "kick1", "kick2", "snare", "clap"]; 

function drawDrum() {
    let drum = "<div class=\"drumkit\">";
    for(let i = 0; i <= 7; i++) {
        drum += "<div data-note="+ image[i] + " class=\"pad\"><img src=\"images/" + image[i] + ".png\" alt=\"" + image[i] + "\"></div>"
    }

    drum += "</div>";

    

    //console.log(drum); 

    enableSoundDrum("drum_0_container");

    return drum;
}

function enableSoundDrum(container_id){
    let drumSamples = createSamplesList(image, "drumSamples", "drum");
    console.log(drumSamples);
    loadSound(drumSamples, container_id );
}