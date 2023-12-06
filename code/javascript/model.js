class Instrument{
    constructor(code){
      this.code = code;
      this.num_tracks = 8;
      this.tracks = [],
      this.refDiv;
      this.refInCont;
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
        container.innerHTML = "Work in progress";
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

  
  model = {
    
    instruments: [], 
  
    getInstruments: function(){
      return this.instruments;
    },

    getCountCodes: function(){
      return this.count_codes;
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
    
    },
  
    saveRecord: function(){
  
    }
  }