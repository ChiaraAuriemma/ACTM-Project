function createSamplesList(keyList, directoryName, name, firstScale=0){
  samplesList = {};

  for (let key in keyList){
    key_name = sharp_to_flat_function(keyList[key]);
    if(name == 'piano'){
      for(let i=firstScale; i<(nscale+firstScale); i++){
        if(keyList[key]!==''){
          samplesList[keyList[key]+i]='sounds/'+directoryName+'/'+ key_name + i +'.mp3';
        }
      } 
    }else{
      samplesList[keyList[key]]='sounds/'+directoryName+'/'+ key_name +'.mp3';
    }  
  }
  
  const sounds = {};
  for(const sample in samplesList){
  
    const sound = new Howl({
        src: samplesList[sample],
    });
    sounds[sample] = sound;
  }

  return sounds;
};


function noteon(sounds=null, e=null, midi=false, midiSample=null, midiInstrument=null){
  let sample=null;
  let instrument=null;

  if(midi){
    sample = midiSample;
    instrument = midiInstrument;
  }else{
    sample = e.target.dataset.note;
    instrument = controller.find_instrument_from_view(e);
  }

  if (sample) {

    if(instrument.getMuteState()){
      volume = 0;
    }else{
      volume = instrument.getVolume();
    }
    sounds[sample].volume(volume);
    sounds[sample].play();
 

    if(model.getRecState() == true && model.getOutFlag() == false){

      if(model.getStartTime() == null && model.getCurrent_inst_rec() == null){
        model.setStartTime(Date.now());
        type = instrument.getType();
        model.setCurrent_inst_rec(type);
      }

      const recordingDuration = Date.now() - model.getStartTime();
      const bpm = metronome.getBPM();
      const beats = instrument.getNumBars() * 4; 
      const maxRecordingDuration = (60 / bpm) * beats * 1000; // milliseconds convertion

      if (recordingDuration > maxRecordingDuration) {
          alert('Maximum time reached, now save the record!');
          model.setOutFlag(true);
      }else{
        model.getOnTime().push({
          sample: sample,
          timestamp: Date.now()
        });
      }
          
    }
    
  }
}

function noteoff(sounds=null, e=null, midi=false, midiSample=null, midiInstrument=null){
  let sample=null;
  let instrument=null;

  if(midi){
    sample = midiSample;
    instrument = midiInstrument;
  }else{
    sample = e.target.dataset.note;
    instrument = controller.find_instrument_from_view(e);
  }
  if (sample) {

    if(instrument.getMuteState()){
      volume = 0;
    }else{
      volume = instrument.getVolume();
    }

    sounds[sample].fade(volume, 0, 2000);

    if(model.getRecState() == true && model.getOutFlag() == false){
      model.getOffTime().push({
        sample: sample,
        timestamp: Date.now()
      });
    }

  }
}


//function that maps flat notes in sharp notes
function sharp_to_flat_function(note){
  sharp_to_flat={
    C : "C",
    Cs : "Db",
    D : "D",
    Ds : "Eb",
    E : "E",
    F: "F",
    Fs : "Gb",
    G : "G",
    Gs : "Ab",
    A : "A", 
    As : "Bb",
    B : "B"
  };

  new_note="";
    if (note[1]=='s'){
      new_note=sharp_to_flat[note.slice(0,2)];
      new_note = new_note + note.slice(-1);
    }else{
      new_note=note;
    }
  return new_note
}















