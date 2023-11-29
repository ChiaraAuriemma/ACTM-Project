let whiteWidth = 80;
let blackWidth = 40;
n=7;
nscale=3;

//servono per definire id di ogni tasto
whiteKey = ["C", "D", "E", "F", "G", "A", "B"];
blackKey = ["C#", "D#", "", "F#", "G#", "A#", ];

// questa funzione disegna la key board con nscale scale. (ora 3)
function drawKeyBoard() {
    let key = "<svg width=\"4000\" height=\"500\">\n";
    for (let j = 0; j < nscale; j++){
        key += drawKey(key, (n * whiteWidth*j), j);
    }
    key+="</svg>";
    return key;
}

//disp -> displacement
//passo j per definire l'id di ogni tasto

// questa funzione disegna solo una scala
function drawKey(key, disp=0, j){
    //ciclo per le white key
    for (let i = 0; i < n; i++) {
        let x = whiteWidth * i;
        key +=
            "<rect id="+ whiteKey[i] + j +" x="+ (x+disp) +" y=\"20\" rx=\"0\" ry=\"0\" width="+whiteWidth+" height=\"350\"\n" +
            "  style=\"fill:white;stroke:black;stroke-width:3px;opacity:1\" />\n";
    }

    //ciclo per le black key
    for (let i = 1; i < n; i++) {
        if (i != 3) {
            let x = (i * whiteWidth) - blackWidth / 2;
            key += "<rect id="+ blackKey[i-1] + j +"  x=" + (x+disp) + " y=\"20\" rx=\"0\" ry=\"0\" width=" + blackWidth + " height=\"200\"\n" +
                "  style=\"fill:black;stroke:black;stroke-width:3px;opacity:1\" />\n";
        }
    }
    return key;
}


document.getElementById("piano_container").innerHTML = drawKeyBoard();