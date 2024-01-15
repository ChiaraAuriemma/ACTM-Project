let whiteWidth = 80;
let blackWidth = whiteWidth/2;
n=7;
nscale=3;
let firstScale = 2; 


const whiteKey = ["C", "D", "E", "F", "G", "A", "B"];
const blackKey = ["Db", "Eb", "", "Gb", "Ab", "Bb", ];

pianoKeys=whiteKey.concat(blackKey);
var pianoSamples = createSamplesList(pianoKeys, "pianoSamples", "piano", firstScale);

function drawKeyBoard(container_id) {
    let startscale = firstScale;
    let key = "<svg width=\"4000\" height=\"500\">\n";
    
    for (let j = 0; j < nscale; j++){
        key += drawKey(key, (n * whiteWidth*j), startscale, container_id);
        startscale = startscale+1;
    }
    key+="</svg>";

    let instrument=document.getElementById(container_id);
    instrument.addEventListener("mousedown", (e) => {
        noteon(sounds=pianoSamples, e=e);

    });
    instrument.addEventListener("mouseup", (e) => {
        noteoff(sounds=pianoSamples, e=e);

    });
    startscale = firstScale;
    return key;
}

//draw a single octave
function drawKey(key, disp=0, startscale){
    //white key
    for (let i = 0; i <= (n-1); i++) {
        let x = whiteWidth * i;
        key +=
            "<rect onmousedown=\"this.style.fill='gray'\" onmouseleave=\"this.style.fill='white'\"  onmouseup=\"this.style.fill='white'\" data-note='"+ whiteKey[i] + (startscale) +"' id="+whiteKey[i] + (startscale)+" x="+ (x+disp) +" y=\"20\" rx=\"0\" ry=\"0\" width="+whiteWidth+" height=\"350\"\n" +
            "  class=\"whiteKey\" />\n";
    }

    //black key
    for (let i = 1; i < n; i++) {
        if (i != 3) {
            let x = (i * whiteWidth) - blackWidth / 2;
            key += "<rect onmousedown=\"this.style.fill='gray'\" onmouseleave=\"this.style.fill='black'\" onmouseup=\"this.style.fill='black'\" data-note='"+ blackKey[i-1] + (startscale) +"' id="+blackKey[i-1] + (startscale)+"  x=" + (x+disp) + " y=\"20\" rx=\"5\" ry=\"5\" width=" + blackWidth + " height=\"200\"\n" +
            "  class=\"blackKey\" />\n";

        }
    }
    return key;
}



