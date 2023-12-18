let whiteWidth = 80;
let blackWidth = whiteWidth/2;
n=7;
nscale=2;


//servono per definire id di ogni tasto
const whiteKey = ["C", "D", "E", "F", "G", "A", "B"];
const blackKey = ["Db", "Eb", "", "Gb", "Ab", "Bb", ];

// questa funzione disegna la key board con nscale scale. (ora 3)
function drawKeyBoard(container_id) {
    let key = "<svg width=\"4000\" height=\"500\">\n";
    let firstScale = 3; 
    for (let j = 0; j < nscale; j++){
        key += drawKey(key, (n * whiteWidth*j), firstScale);
        firstScale = firstScale+1;
    }
    key+="</svg>";

    enableSoundPiano(container_id, 3);
    return key;
}

//disp -> displacement
//passo j per definire l'id di ogni tasto

// questa funzione disegna solo una scala
function drawKey(key, disp=0, firstScale){
    //ciclo per le white key
    for (let i = 0; i <= n; i++) {
        let x = whiteWidth * i;
        key +=
            "<rect onmousedown=\"this.style.fill='grey'\" onmouseleave=\"this.style.fill='white'\" onmouseup=\"this.style.fill='white'\" data-note='"+ whiteKey[i] + (firstScale) +"' id="+whiteKey[i] + (firstScale)+" x="+ (x+disp) +" y=\"20\" rx=\"0\" ry=\"0\" width="+whiteWidth+" height=\"350\"\n" +
            "  class=\"whiteKey\" />\n";
    }

    //ciclo per le black key
    for (let i = 1; i < n; i++) {
        if (i != 3) {
            let x = (i * whiteWidth) - blackWidth / 2;
            key += "<rect onmousedown=\"this.style.fill='grey'\" onmouseleave=\"this.style.fill='black'\" onmouseup=\"this.style.fill='black'\" data-note='"+ blackKey[i-1] + (firstScale) +"' id="+blackKey[i-1] + (firstScale)+"  x=" + (x+disp) + " y=\"20\" rx=\"5\" ry=\"5\" width=" + blackWidth + " height=\"200\"\n" +
                "  class=\"blackKey\" />\n";
        }
    }
    return key;
}

function enableSoundPiano(container_id, firstScale){
    pianoKeys=whiteKey.concat(blackKey);
    let pianoSamples = createSamplesList(pianoKeys, "pianoSamples", "piano", firstScale);
    console.log(pianoSamples);
    loadSound(pianoSamples, container_id );
}
