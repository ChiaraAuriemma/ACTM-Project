controller = {
  choose_instrument: function(event) {
		button = event.target;
    string = button.getAttribute("id");
		
    var num = model.getCountCodes();

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
    view.addInstrument(string, num);
    num++;
    model.updateCountCodes(num);
	},

  start_play: function(event){
    var father = event.target.parentNode.parentNode;
    view.visualizeInstrument(father);
  },

  play_metronome: function(event){
    event.preventDefault();
    var time = document.getElementById("metronome").value;
    metronome.start_stop(time);
  },

  activate_removal: function(event){ 
    target = event.target;
    target.classList.toggle("clickRemove");
  },

  delete_instrument: function(event){
    var bt = document.getElementById("remove_button");
    if(bt.classList.contains("clickRemove")){
      target = event.target.closest('.instrument');
      view.deleteInstrument(target);
      model.deleteInstrument(target.getAttribute("id").split('_')[1]);
    }
      
  },
}

