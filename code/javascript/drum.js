const image = ["open-hihat", "closed-hihat", "crash1", "crash2", "kick1", "kick2", "snare", "clap"]; 

function drawDrum() {
    let drum = "<div class=\"drumkit\">";
    for(let i = 0; i <= 7; i++) {
        drum += "<div class=\"pad\"><img src=\"./icons/" + image[i] + ".png\" alt=\"" + image[i] + "\"></div>"
    }

    drum += "</div>";

    console.log(drum); 

    return drum;
}

document.getElementById("drum").innerHTML = drawDrum();