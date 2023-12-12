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
    }else{
      var instrument = new Bass(num);
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
    view.activate_button(event);
  },

  delete_instrument: function(event){
    var bt = document.getElementById("remove_button");
    if(bt.classList.contains("active_button")){
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
    var bt1 = document.getElementById("rec_button");
    var bt2 = document.getElementById("play_button");

    ins = this.find_instrument_from_view(event);
    record = this.find_record_from_view(event, ins);
    
    if(bt1.classList.contains("active_button")){
      this.manage_recording(record);
    }else if(bt2.classList.contains("active_button")){
      this.play_recording(record);
    }

  },

  manage_recording: function(record){
    ToggleMic(record);
  },

  play_recording: function(record){
    let audioBlob = record.getAudioData();

    if (audioBlob) {
      let audioElement = new Audio(window.URL.createObjectURL(audioBlob));
      audioElement.play();
    } else {
      console.error('Audio data not avaible');
    }
    
  }
}

