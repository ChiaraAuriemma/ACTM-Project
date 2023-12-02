class Instrument{
    constructor(code){
      this.code = code;
      this.tracks = [];
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
  }
  
  class Drum extends Instrument{
    constructor(code){
      super(code);
      this.type = "drum";
    }

    draw(container){
        container.innerHTML = "Work in progress";
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
  }
  
  class Bass extends Instrument{
    constructor(code){
      super(code);
      this.type = "bass";
    }

    draw(container){
        container.innerHTML = "Work in progress";
    }
  }
  
  model = {
    
    instrumets: [],
  
    getInstruments: function(){
      return this.instrumets;
    },
  
    addInstrument: function(instrument){
      this.instrumets.push(instrument);
    },
  
    saveRecord: function(){
  
    }
  }