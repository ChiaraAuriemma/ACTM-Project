const image = ["open-hihat", "closed-hihat", "crash1", "crash2", "kick1", "kick2", "snare", "clap"]; 

function drawDrum() {
    let drum = "<div class=\"drumkit\">";
    for(let i = 0; i <= 7; i++) {
        drum += "<div class=\"pad\"><img src=\"images/" + image[i] + ".png\" alt=\"" + image[i] + "\"></div>"
    }

    drum += "</div>";

    enableSoundDrum("drum_1_conteiner");

    console.log(drum); 

    return drum;
}

function enableSoundDrum(container_id){
    let drumSamples = createSamplesList(image, "drumSamples");
    loadSound(drumSamples, container_id );
}