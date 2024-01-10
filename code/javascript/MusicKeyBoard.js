let whiteWidth = 80;
let blackWidth = whiteWidth/2;
n=7;
nscale=2;
let firstScale = 3; 


//servono per definire id di ogni tasto
const whiteKey = ["C", "D", "E", "F", "G", "A", "B"];
const blackKey = ["Db", "Eb", "", "Gb", "Ab", "Bb", ];

pianoKeys=whiteKey.concat(blackKey);
var pianoSamples = createSamplesList(pianoKeys, "pianoSamples", "piano", firstScale);

// questa funzione disegna la key board con nscale scale. (ora 3)
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

//disp -> displacement
//passo j per definire l'id di ogni tasto

// questa funzione disegna solo una scala
function drawKey(key, disp=0, startscale){
    //ciclo per le white key
    for (let i = 0; i <= n; i++) {
        let x = whiteWidth * i;
        key +=
            //"<rect onmousedown=\"noteon('"+ whiteKey[i] + (firstScale) +"',  pianoSamples , '"+ container_id +"')\" onmouseleave=\"this.style.fill='white'\" onmouseup=\"noteoff('"+ whiteKey[i] + (firstScale) +"',  pianoSamples , '"+ container_id +"')\" data-note='"+ whiteKey[i] + (firstScale) +"' id="+whiteKey[i] + (firstScale)+" x="+ (x+disp) +" y=\"20\" rx=\"0\" ry=\"0\" width="+whiteWidth+" height=\"350\"\n" +
            //"  class=\"whiteKey\" />\n";

            "<rect onmousedown=\"this.style.fill='gray'\" onmouseleave=\"this.style.fill='white'\"  onmouseup=\"this.style.fill='white'\" data-note='"+ whiteKey[i] + (startscale) +"' id="+whiteKey[i] + (startscale)+" x="+ (x+disp) +" y=\"20\" rx=\"0\" ry=\"0\" width="+whiteWidth+" height=\"350\"\n" +
            "  class=\"whiteKey\" />\n";
    }

    //ciclo per le black key
    for (let i = 1; i < n; i++) {
        if (i != 3) {
            let x = (i * whiteWidth) - blackWidth / 2;
            key += "<rect onmousedown=\"this.style.fill='gray'\" onmouseleave=\"this.style.fill='black'\" onmouseup=\"this.style.fill='black'\" data-note='"+ blackKey[i-1] + (startscale) +"' id="+blackKey[i-1] + (startscale)+"  x=" + (x+disp) + " y=\"20\" rx=\"5\" ry=\"5\" width=" + blackWidth + " height=\"200\"\n" +
            "  class=\"blackKey\" />\n";
            
            
            //"<rect onmousedown=\"noteon('"+ blackKey[i-1] + (firstScale) +"',  pianoSamples , '"+ container_id +"')\" onmouseleave=\"this.style.fill='black'\" onmouseup=\"noteoff('"+ blackKey[i-1] + (firstScale) +"',  pianoSamples , '"+ container_id +"')\" data-note='"+ blackKey[i-1] + (firstScale) +"' id="+blackKey[i-1] + (firstScale)+"  x=" + (x+disp) + " y=\"20\" rx=\"5\" ry=\"5\" width=" + blackWidth + " height=\"200\"\n" +
                //"  class=\"blackKey\" />\n";
        }
    }
    return key;
}



