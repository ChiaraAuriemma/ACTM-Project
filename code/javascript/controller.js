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
    if(model.getMidiFlag() == false){
      setUpMidiInstrument();
    }
    ins[index].setUpMidi();

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
    }else if(target == 'loop'){
      model.setLoopState(!model.getLoopState());
    }

    if(!model.checkButtons()){ 
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
    }else if(model.getLoopState()){
      this.manageLoop(record);
    }

  },

  manage_recording: function(event,record){
    if(ins.getType() == 'voice'){
      ToggleMic(record);
      view.now_recording(event);
    }
    else if(model.getStartTime() != null){
      model.saveInstRec(event,record);
    }
  },

  play_voice_recording: function(record){ 
    let audioBlob = record.getAudioData();
    let audioElement = record.getAudioElement();

    if (audioBlob) {
      if (audioElement) {
        if (record.getIsPlaying()) {
          audioElement.pause(); 
        }else{
          audioElement.volume = record.getFather().getVolume();
          audioElement.play();
        }
        record.setIsPlaying(!record.getIsPlaying());
      }else{
        record.setAudioElement(new Audio(window.URL.createObjectURL(audioBlob))); 
        record.getAudioElement().volume = record.getFather().getVolume();
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
    
    let instSamples;

    
    if(record.getFather().getType() == 'piano'){
      instSamples = pianoSamples;
    }else if(record.getFather().getType() == 'drum'){
      instSamples = drumSamples;
    }else if(record.getFather().getType() == 'guitar'){
      instSamples = guitarSamples;
    }else{
      instSamples = bassSamples;
    }


    if (record.getOnArray().length === 0 || record.getOffArray().length === 0) {
      console.log('No Data');
      return;
    }


    
    record.getOnArray().forEach((noteOn) => {
      const sound = instSamples[noteOn.sample];

      const delay = noteOn.timestamp - record.getStartTime();

      setTimeout(() => {
          sound.volume(record.getFather().getVolume());
          sound.play();
      }, delay);
    });

    record.getOffArray().forEach((noteOff) => {
        const sound = instSamples[noteOff.sample];

        const delay = noteOff.timestamp - record.getStartTime();

        setTimeout(() => {
            sound.fade(record.getFather().getVolume(), 0, 2000);
        }, delay);
    });
    
  },

  delete_recording: function(event,record){ 
    record.resetRecord();
    view.resetRecording(event);
  },

  change_volume: function(event){
    volume = event.target.value;
    console.log(volume);
    ins = this.find_instrument_from_view(event);

    ins.setVolume(volume/100);
  },

  manageLoop: function(record){

    if(!record.getIsPlaying() && record.getFather().getType() != 'voice'){
        
      record.setIsPlaying(true);

      controller.play_inst_recording(record);

      int = setInterval(controller.play_inst_recording, record.getDuration(), record);
      record.setIntLoop(int);
      
    }else if(record.getFather().getType() != 'voice'){
      clearInterval(record.getIntLoop());
      record.setIsPlaying(false);
      record.setIntLoop(null);
    }else if(record.getFather().getType() == 'voice'){
      alert('You cannot loop a vocal track');
    }
    
  },

  checkNumBars: function(event, num){
    tmp = model.getInstruments();
    if(parseInt(event.target.value) > 0 && parseInt(event.target.value) <= 16){
      tmp[num].setNumBars(parseInt(event.target.value));
    }else{
      alert('Choose a valid number of bars');
      tmp[num].setNumBars(1);
      event.target.value = 1;
    }
    
  }

}

