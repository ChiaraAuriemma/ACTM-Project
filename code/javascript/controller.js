controller = {
  choose_instrument: function(event) {
		button = event.target;
    string = button.getAttribute("id");
		
    var num = model.getInstruments().length;

    if(string == "piano"){
      var instrument = new Piano(num);
    }else if(string == "drum"){
      var instrument = new Drum(num);
    }else if(string == "guitar"){
      var instrument = new Guitar(num);
    }else if(string == "bass"){
      var instrument = new Bass(num);
    }else{
      var instrument = new Voice(num);
    }

  
    model.addInstrument(instrument);
    ref = view.addInstrument(string, num);
    instrument.setRefDiv(ref);
	},

  start_play: function(event){
    var father = event.target.parentNode.parentNode;
    index = father.getAttribute("id").split('_')[1];
    ref = view.visualizeInstrument(father);
    ins = model.getInstruments();
    ins[index].setRefInCont(ref);

  },

  play_metronome: function(event){
    event.preventDefault();
    var time = document.getElementById("metronome").value;
    metronome.start_stop(time);
  },

  activate_button: function(event){
    target = event.target.getAttribute("id").split("_")[0];
    if(target == "rec"){
      model.setRecState(!model.getRecState());
    }else if(target == 'play'){
      model.setPlayState(!model.getPlayState());
    }else if(target == 'remove'){
      model.setRemoveState(!model.getRemoveState());
    }else if(target == 'deleteRecord'){
      model.setDeleteRecordState(!model.getDeleteRecordState());
    }

    if(!model.checkButtons()){ /* per il momento è possibile attivare un bottone alla volta, rec e play sarebbe carino attivarli insieme*/
      alert('You can activate one button at a time');
      model.resetStateButton();
      view.reset_active_button();
    }else{
      view.activate_button(event);
    }

  },

  delete_instrument: function(event){
    if(model.getRemoveState()){
      target = event.target.closest('.instrument');
      model.deleteInstrument(target.getAttribute("id").split('_')[1]);
      view.deleteInstrument(target);
    }    
  },

  find_instrument_from_view: function(event){ /* dalla view trova l'oggetto*/
    ins_view = event.target.closest('.instrument');
    code = parseInt(ins_view.getAttribute("id").split('_')[1]);

    array = model.getInstruments();

    return array[code];
  },

  find_record_from_view: function(event, instrument){ /* dalla view trova l'oggetto*/
    code = event.target.getAttribute("id").split('_')[1];
    records = instrument.getRecords();

    return records[code];
  },

  startPlay_recording: function(event){
    ins = this.find_instrument_from_view(event);
    record = this.find_record_from_view(event, ins);
    
    if(model.getRecState()){
      this.manage_recording(event,record,ins.getType());
    }else if(model.getPlayState() && ins.getType() == 'voice'){
      this.play_voice_recording(record);
    }else if(model.getDeleteRecordState()){
      this.delete_recording(event,record);
    }else if(model.getPlayState() && ins.getType() != 'voice'){
      this.play_inst_recording(record);
    }

  },

  manage_recording: function(event,record,type){
    if(ins.getType() == 'voice')
      ToggleMic(record);
    else{
      model.saveInstRec(record);
    }
    view.now_recording(event);
  },

  play_voice_recording: function(record){ 
    let audioBlob = record.getAudioData();
    let audioElement = record.getAudioElement();

    if (audioBlob) {
      if (audioElement) {
        if (record.getIsPlaying()) {
          audioElement.pause(); 
        }else{
          audioElement.play();
        }
        record.setIsPlaying(!record.getIsPlaying());
      }else{
        record.setAudioElement(new Audio(window.URL.createObjectURL(audioBlob))); 
        record.getAudioElement().addEventListener('ended', () => {
          record.setIsPlaying(false);
        });
        record.getAudioElement().play();
        record.setIsPlaying(true);
      }
    } else {
      console.error('Audio data not avaible');
    }
    
  },

  play_inst_recording: function(record){

    /* chiedere ad Anna di suddividere meglio le funzioni in modo da non necessitare di questa parte di codice*/
    /*Chiedere anche chiarimenti sulle modifiche del mapping delle note */
    let pianoSamples = createSamplesList(pianoKeys, "pianoSamples", "piano", 3);

    const sounds = {};

    for(const sample in pianoSamples){
        const sound = new Howl({
            src: pianoSamples[sample]
        });
     sounds[sample] = sound;
    }

    if (record.getOnArray().length === 0 || record.getOffArray().length === 0) {
      console.warn('No Data');
      return;
    }


    record.getOnArray().forEach((noteOn) => {
        const sound = sounds[noteOn.sample];

        const delay = noteOn.timestamp - record.getStartTime();

        setTimeout(() => {
            sound.play();
        }, delay);
    });

    record.getOffArray().forEach((noteOff) => {
        const sound = sounds[noteOff.sample];

        const delay = noteOff.timestamp - record.getStartTime();

        setTimeout(() => {
            sound.fade(1, 0, 2000);
        }, delay);
    });
  },

  delete_recording: function(event,record){ 
    record.resetRecord();
    view.resetRecording(event);
  },

}

