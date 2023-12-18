class Instrument{
    constructor(code){
      this.code = code;
      this.num_tracks = 8;
      this.refDiv;
      this.refInCont;
      this.records = [];
      for(let i=0 ; i < this.num_tracks; i++){
        let tmp = new Record_square(this, i);
        this.records.push(tmp);
      }
    }

    getCode(){
      return this.code;
    }

    setCode(code){
      this.code = code;
    }

    setRefDiv(div){
      this.refDiv = div;
    }

    getRefDiv(){
      return this.refDiv;
    }

    setRefInCont(div){
      this.refInCont = div;
    }

    getRefInCont(){
      return this.refInCont;
    }

    getRecords(){
      return this.records;
    }
  
  }
  
  class Piano extends Instrument{
    constructor(code){
      super(code);
      this.type = "piano";
    }

    draw(container){
        let container_id = container.getAttribute("id");
        container.innerHTML = drawKeyBoard(container_id);
    }

    getType(){
      return this.type;
    }
  }
  
  class Drum extends Instrument{
    constructor(code){
      super(code);
      this.type = "drum";
    }

    draw(container){
      let container_id = container.getAttribute("id");
      container.innerHTML = drawDrum(container_id);
    }

    getType(){
      return this.type;
    }
  }
  
  class Guitar extends Instrument{
    constructor(code){
      super(code);
      this.type = "guitar";
    }

    draw(container){
        container.innerHTML = drawGuitar();
        setup(container);
    }

    getType(){
      return this.type;
    }
  }
  
  class Bass extends Instrument{
    constructor(code){
      super(code);
      this.type = "bass";
    }

    draw(container){
        container.innerHTML = "Work in progress";
    }

    getType(){
      return this.type;
    }
  }

  class Voice extends Instrument{
    constructor(code){
      super(code);
      this.type = "voice";
    }

    draw(container){
        /*si potrebbe anche eliminare */
    }

    getType(){
      return this.type;
    }
  }

  class Record_square{
    constructor(father, code){
      this.father = father;
      this.code = code;
      this.can_record = false;
      this.is_recording = false;
      this.recorder = null;
      this.chunks = [];
      this.audio_data;
      this.audio_element;
      this.isPlaying = false;
      SetupAudio(code, father);
    }

    getCode(){
      return this.code;
    }

    getCanRecord(){
      return this.can_record;
    }

    setCanRecord(can_record){
      this.can_record = can_record;
    }

    getIsRecording(){
      return this.is_recording;
    }

    setIsRecording(is_recording){
      this.is_recording = is_recording;
    }

    getRecorder(){
      return this.recorder;
    }

    setRecorder(recorder){
      this.recorder = recorder;
    }

    getChunks(){
      return this.chunks;
    }

    setChunks(chunks){
      this.chunks = chunks;
    }

    getAudioData(){
      return this.audio_data;
    }

    setAudioData(audio_data){
      this.audio_data = audio_data;
    }

    getAudioElement(){
      return this.audio_element;
    }

    setAudioElement(audio_element){
      this.audio_element = audio_element;
    }

    getIsPlaying(){
      return this.isPlaying;
    }

    setIsPlaying(isPlaying){
      this.isPlaying = isPlaying;
    }
  }

  
  model = {
    
    instruments: [],
    num_tracks: 8,
    countdown: 5,
    rec_state:false,
    play_state:false,
    remove_state:false,
    delete_record_state:false,
  
    getInstruments: function(){
      return this.instruments;
    },

    getNumTracks: function(){
      return this.num_tracks;
    },

    getCountDown: function(){
      return this.countdown;
    },

    getRecState: function(){
      return this.rec_state;
    },

    setRecState: function(rec_state){
      this.rec_state= rec_state;
    },

    getPlayState: function(){
      return this.play_state;
    },

    setPlayState: function(play_state){
      this.play_state= play_state;
    },

    getRemoveState: function(){
      return this.remove_state;
    },

    setRemoveState: function(remove_state){
      this.remove_state= remove_state;
    },

    getDeleteRecordState: function(){
      return this.delete_record_state;
    },

    setDeleteRecordState: function(delete_record_state){
      this.delete_record_state= delete_record_state;
    },

    checkButtons: function(){
      let count = 0;

      if(this.getRecState()){
        count++;
      }

      if(this.getPlayState()){
        count++;
      }

      if(this.getRemoveState()){
        count++;
      }

      if(this.getDeleteRecordState()){
        count++;
      }

      if(count >= 2)
        return false;
      else return true;
    },

    resetStateButton: function(){
      this.setRecState(false);
      this.setPlayState(false);
      this.setRemoveState(false);
      this.setDeleteRecordState(false);
    },

    addInstrument: function(instrument){
      this.instruments.push(instrument);
    },

    deleteInstrument: function(num){
      this.instruments.splice(num,1);
      for(let i=num; i< this.instruments.length; i++){
        if(this.instruments[i].getCode() != i){
            this.instruments[i].setCode(i);
        }
      }
    
    }
  }