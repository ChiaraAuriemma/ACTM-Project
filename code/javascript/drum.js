const image = ["open-hihat", "closed-hihat", "crash1", "crash2", "kick1", "kick2", "snare", "clap"]; 
var drumSamples = createSamplesList(image, "drumSamples", "drum", 0);

function drawDrum(container_id) {
    let drum = "<div class=\"drumkit\">";
    for(let i = 0; i <= 7; i++) {
        drum += "<div data-note="+ image[i] + " class=\"pad\"><img src=\"images/" + image[i] + ".png\" alt=\"" + image[i] + "\"></div>"
    }
    drum += "</div>";

    let instrument=document.getElementById(container_id);
    instrument.addEventListener("mousedown", (e) => {
        noteon(sounds=drumSamples, e=e);
    });
    instrument.addEventListener("mouseup", (e) => {
       
        noteoff(sounds=drumSamples, e=e);
    });
    return drum;
}



