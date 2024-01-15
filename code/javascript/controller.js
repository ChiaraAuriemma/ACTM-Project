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
    code = event.target.closest(".record_square").getAttribute("id").split('_')[1];
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
    let audioElement = record.getAudioElement();
    if(record.getFather().getMuteState() || record.getFather().getSoloMute()){
      volume = 0;
    }else{
      volume = record.getFather().getVolume();
    }

    
    if (audioElement) {
      if (record.getIsPlaying()) {
        audioElement.pause();
        view.play_record(record);
      }else{
        audioElement.volume = volume;
        audioElement.play();
        view.play_record(record);
      }
      record.setIsPlaying(!record.getIsPlaying());
    }else{
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
          if(record.getFather().getMuteState() || record.getFather().getSoloMute()){
            volume = 0;
          }else{
            volume = record.getFather().getVolume();
          }

          sound.volume(volume);
          sound.play();
      }, delay);
    });

    record.getOffArray().forEach((noteOff) => {
        const sound = instSamples[noteOff.sample];

        const delay = noteOff.timestamp - record.getStartTime();

        setTimeout(() => {
            if(record.getFather().getMuteState() || record.getFather().getSoloMute()){
              volume = 0;
            }else{
              volume = record.getFather().getVolume();
            }

            sound.fade(volume, 0, 2000);
        }, delay);
    });

    view.play_record(record);
    
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

    if(ins.getType() == 'voice'){
      ins.getRecords().forEach((rec) => {
        if(rec.getIsPlaying()){
          rec.getAudioElement().volume = volume/100;
        }
      });
    }
    
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
    inst = this.find_instrument_from_view(event);
    if(parseInt(event.target.value) > 0 && parseInt(event.target.value) <= 16){
      inst.setNumBars(parseInt(event.target.value));
    }else{
      alert('Choose a valid number of bars');
      inst.setNumBars(1);
      event.target.value = 1;
    } 
  },

  activate_mute: function(event){
    inst = this.find_instrument_from_view(event);
   
    inst.setMuteState(!inst.getMuteState());
    this.checkValidity(inst,"mute");
    
    view.activate_mute_solo(event.target);
    this.voice_mute_solo(inst);
    
    
  },

  activate_solo: function(event){
    inst = this.find_instrument_from_view(event);
    inst.setSoloState(!inst.getSoloState());
    this.checkValidity(inst, "solo");
    flag = false;

    if(inst.getSoloState()){
      inst.setSoloMute(false);
      model.getInstruments().forEach((el) => {
        if(el.getCode() != inst.getCode() && !el.getSoloState()){
          el.setSoloMute(true);
          this.voice_mute_solo(el);
        }
      });
    }else{
      model.getInstruments().forEach((el) => {
        if(el.getCode() != inst.getCode() && el.getSoloState()){
          flag=true;
        }
      });

      if(!flag){
        model.getInstruments().forEach((el) => {
          el.setSoloMute(false);
          this.voice_mute_solo(el);
        });
      }else{
        inst.setSoloMute(true);
      }
    }
    view.activate_mute_solo(event.target);  
  },

  voice_mute_solo: function(inst){
    if(inst.getType() == 'voice' && (inst.getMuteState() || inst.getSoloMute())){
      inst.getRecords().forEach((rec) => {
        if(rec.getIsPlaying()){
          rec.getAudioElement().volume = 0;
        }
      });
    }else if(inst.getType() == 'voice'){
      inst.getRecords().forEach((rec) => {
        if(rec.getIsPlaying()){
          rec.getAudioElement().volume = inst.getVolume();
        }
      });
    }
  },

  checkValidity: function(instrument, operation){
    if(operation == "mute" && instrument.getMuteState()){
      instrument.setSoloState(false);
      button = instrument.getRefDiv().querySelector(".s_button");
      view.validity_mute_solo(button);
    }

    if(operation == "solo" && instrument.getSoloState()){
      instrument.setMuteState(false);
      button = instrument.getRefDiv().querySelector(".m_button");
      view.validity_mute_solo(button);
    }

  }

}

