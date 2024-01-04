function createSamplesList(keyList, directoryName, name, firstScale=0){
    samplesList = {};

    for (let key in keyList){
      //console.log(keyList[key]);
      key_name = sharp_to_flat_function(keyList[key]);
      //console.log(key_name);
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
  
    return samplesList;
};


//caricamento dei suoni di un determinato strumento: ogni tasto avrà il riferimento al suono corretto
function loadSound(samplesList, instrumentId=""){
  //i parametri della funzione saranno:
  //samplesList: il "dzionario" con i riferimenti tra chiave e samples dello strumento in questione
  //instrumentId = l'id del div in cui si trova lo strumento
  const instrument = document.getElementById(instrumentId);
  const sounds = {};
  

  for(const sample in samplesList){
    
      const sound = new Howl({
          src: samplesList[sample],
          preload: true  /*Serve ??? */
      });
      sounds[sample] = sound;
  }


  instrument.addEventListener('mousedown', (e) => {
      const sample = e.target.dataset.note;
      let instrument = controller.find_instrument_from_view(e);

      console.log(sample)
      if (sample) {
        sounds[sample].volume(instrument.getVolume());
        sounds[sample].play();

        if(model.getRecState() == true && model.getOutFlag() == false){
          model.getOnTime().push({
            sample: sample,
            timestamp: Date.now()
          });

          if(model.getStartTime() == null && model.getCurrent_inst_rec() == null){
            model.setStartTime(Date.now());
            type = e.target.closest('.instrument_container').getAttribute("id").split('_')[0];
            model.setCurrent_inst_rec(type);
          }
              
        }
      
      }
  }); 

  instrument.addEventListener('mouseup', (e) => {
    const sample = e.target.dataset.note;
    let instrument = controller.find_instrument_from_view(e);
    if (sample) {
      sounds[sample].fade(instrument.getVolume(), 0, 2000);

      if(model.getRecState() == true && model.getOutFlag() == false){
        model.getOffTime().push({
          sample: sample,
          timestamp: Date.now()
        });

        const recordingDuration = Date.now() - model.getStartTime();
        const bpm = metronome.getBPM();
        const beatsPerBar = model.getBeatsPerBar(); 
        const maxRecordingDuration = (60 / bpm) * beatsPerBar * 1000; // Converti in millisecondi

        if (recordingDuration > maxRecordingDuration) {
            alert('Maximum time reached, now save the record!');
            model.setOutFlag(true);
        }
      }

    }
  }); 
}


// funzione per chitarra che converte tutte le note in # in b

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

sharp_to_flat_function("Ds4");












