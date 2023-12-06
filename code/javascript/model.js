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
    
    instruments: [], 
    count_codes: 0,
  
    getInstruments: function(){
      return this.instruments;
    },

    getCountCodes: function(){
      return this.count_codes;
    },

    updateCountCodes: function(num){
      this.count_codes = num;
    },
  
    addInstrument: function(instrument){
      this.instruments.push(instrument);
    },

    deleteInstrument: function(num){
      this.instruments.splice(num,1);
    },
  
    saveRecord: function(){
  
    }
  }