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
    view.addInstrument(string, num);
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
    event.preventDefault();
    var bt = document.getElementById("remove_button");
    if(bt.classList.contains("clickRemove")){
      target = event.target.closest('.instrument');
      target.remove();
    }
      
  },
}

