function setUpMidiInstrument(instrument){
    const pitch_to_note = {};

    const note_name = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    let pitch_start = 24;

    for (let i = 1; i < 8; i++) {
        for (let j = 0; j < note_name.length; j++) {
            pitch_to_note[pitch_start] = note_name[j] + i;
            pitch_start++;
        }
    }

    pitch_to_note[pitch_start] = 'C8';

    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    }

    function onMIDISuccess(midiAccess) {
        midiAccess.addEventListener("statechange", updateDevices);
    
        const inputs = [...midiAccess.inputs];
        console.log(inputs);
        if(inputs.length > 0){
            model.setMidiFlag(true);
        }
    
        inputs.forEach((input) =>{
            console.log(input);
            console.log(input[1]);
            input[1].addEventListener('midimessage', function(event) {
                hendleInput(event, pitch_to_note);
              });
        })
    }
}

//collegare velocity a volume

function hendleInput(input, pitch_to_note) {
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];
    
    const sample = pitch_to_note[note];

    if(model.getMidi().getType() == 'piano'){
        instSamples = pianoSamples;
    }else if(model.getMidi().getType() == 'drum'){
        instSamples = drumSamples;
    }else if(model.getMidi().getType() == 'guitar'){
        instSamples = guitarSamples;
    }else{
    /* spazio per il basso */
    }
    

    switch (command) {
        case 144:
            // note on
            if (velocity > 0) {
                noteon(sounds=instSamples, e=null, midi=true, midiSample=sample, midiInstrument = model.getMidi());
                console.log();
            } else {
                noteoff(sounds=instSamples, e=null, midi=true, midiSample=sample, midiInstrument = model.getMidi());
            }
        break;
        case 128:
            // note off
            noteoff(sounds=instSamples, e=null, midi=true, midiSample=sample, midiInstrument = model.getMidi());
        break;
    }
}


function updateDevices(event) {
    console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State: ${event.port.state}, Type: ${event.port.type}`);
}

function onMIDIFailure() {
    console.log("Could not access your MIDI devices.");
}


  