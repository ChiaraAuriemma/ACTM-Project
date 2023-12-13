view = {
    addInstrument: function(string, num){
      let instrument_container = document.createElement("div");
      instrument_container.setAttribute("class","instrument");
      instrument_container.setAttribute("id",string + "_" + num);
      instrument_container.setAttribute("onclick", "controller.delete_instrument(event)");
      let div = document.getElementById("instruments_div");
      div.appendChild(instrument_container);

      let record_container = document.createElement("div");
      record_container.setAttribute("class","record_container");
      instrument_container.appendChild(record_container);
      for(i=0; i<model.getNumTracks(); i++){
        let record = document.createElement("div");
        record.setAttribute("id", "record_" + i);
        record.setAttribute("class","record_square");
        record.setAttribute("onclick", "controller.startPlay_recording(event)");
        record_container.appendChild(record);
      }

      let image_div= document.createElement("div");
      let image = document.createElement("img");
      image.setAttribute("src", "images/" + string + ".jpg")
      image.setAttribute("onclick","controller.start_play(event)")
      instrument_container.appendChild(image_div);
      image_div.appendChild(image);

      return instrument_container;
  
    },
  
    visualizeInstrument: function(father){

      if(father.getAttribute("id").split('_')[0] == "voice")
        return;
    
      if (document.getElementById(father.getAttribute("id") + "_container")){
        container = document.getElementById(father.getAttribute("id") + "_container").style.display = 'block';
      }
      else{
        container= document.createElement("div");
        container.setAttribute("id", father.getAttribute("id") + "_container");
        container.setAttribute("class", "instrument_container");
        father.appendChild(container);

        code = father.getAttribute("id").split('_')[1];
        ins = model.getInstruments();
        ins[code].draw(container);

        close_button = document.createElement("span");
        close_button.setAttribute("class", "close");
        close_button.setAttribute("onclick", "closePopup(event)");
        close_button.innerHTML = "&times;";
        container.appendChild(close_button);
      }

      return container;
     
    },

    deleteInstrument: function(target){
      num = target.getAttribute("id").split("_")[1];
      ins = model.getInstruments();
      target.remove();

      for(let i =num; i<model.getInstruments().length; i++){
        let div = ins[i].getRefDiv();
        if(ins[i].getCode() != div.getAttribute("id").split('_')[1]){
          div.setAttribute("id", ins[i].getType() + '_' + ins[i].getCode())
          if(ins[i].getRefInCont()){
            ins[i].getRefInCont().setAttribute("id", ins[i].getType() + '_' + ins[i].getCode()+ "_container" )
          }
          
        }
        
      }
    },

    activate_button: function(event){ 
      target = event.target;
      target.classList.toggle("active_button");
    },

    create_countdown: function () {
      var el = document.getElementById("countdown");
  
      if (!el) {
        el = document.createElement("div");
        el.setAttribute("id", "countdown");
        span = document.createElement("span");

        var div = document.getElementById("instruments_div");
        div.appendChild(el);
        el.appendChild(span);
      }

      el.style.display = "block";
    
      return el;  
    },
    
    update_countdown: function (el, seconds) {
      if (el) {
        el.children[0].innerText = seconds;
      }
    },

    hideCountdown: function(el){
      el.style.display = "none";
    }
  }