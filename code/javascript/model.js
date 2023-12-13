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
        container.innerHTML = drawKeyBoard();
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
        container.innerHTML = drawDrum();
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
        container.innerHTML = "Work in progress";
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
        container.innerHTML = "Work in progress";
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
  }

  
  model = {
    
    instruments: [],
    num_tracks: 8,
  
    getInstruments: function(){
      return this.instruments;
    },

    getNumTracks: function(){
      return this.num_tracks;
    },
  
    addInstrument: function(instrument){
      this.instruments.push(instrument);
    },

    deleteInstrument: function(num){
      this.instruments.splice(num,1);
      for(let i =num; i< this.instruments.length; i++){
        if(this.instruments[i].getCode() != i){
            this.instruments[i].setCode(i);
        }
      }
    
    }
  }