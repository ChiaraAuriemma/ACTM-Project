window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
document.body.onclick = () => {
    ctx.resume();
}
const startButton = document.querySelector('button');
const oscillators = {};

function midiToFrequency(number) {
    const a = 440;
    return (a / 32) * (2 ** ((number - 9) / 12));
}

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}

function onMIDISuccess(midiAccess) {
    midiAccess.addEventListener("statechange", updateDevices);

    const inputs = midiAccess.inputs;

    inputs.forEach((input) =>{
        input.addEventListener('midimessage', hendleInput);
    })
}

function hendleInput(input) {
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];
    
    switch (command) {
        case 144:
            // note on
            if (velocity > 0) {
                noteOn(note, velocity);
                console.log(note);
            } else {
                noteOff();
            }
        break;
        case 128:
            // note off
            noteOff(note);
        break;
    }
}

function noteOn(note, velocity) {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.33;
    const velocityGainAmount = (1 / 127) * velocity;
    const velocityGain = ctx.createGain();
    velocityGain.gain.value = velocityGainAmount;
    osc.type = 'saw';
    osc.frequency.value = midiToFrequency(note);
    osc.connect(oscGain);
    oscGain.connect(velocityGain);
    velocityGain.connect(ctx.destination);
    osc.gain = oscGain;
    oscillators[note.toString()] = osc;
    console.log(oscillators);
    osc.start();
}

function noteOff(note) {
    const osc = oscillators[note.toString()];
    const oscGain = osc.gain;
    oscGain.gain.setValueAtTime(oscGain.gain.value, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
    setTimeout(() => {
        osc.stop();
        osc.disconnect();
    }, 20);
    delete oscillators[note.toString()];
    console.log(oscillators);
}

function updateDevices(event) {
    console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State: ${event.port.state}, Type: ${event.port.type}`);
}

function onMIDIFailure() {
    console.log("Could not access your MIDI devices.");
}