view = {
    addInstrument: function(string, num){
      let instrument_container = document.createElement("div");
      instrument_container.setAttribute("class","instrument");
      instrument_container.setAttribute("id",string + "_" + num);
      instrument_container.setAttribute("onclick", "controller.delete_instrument(event)");
      let div = document.getElementById("instruments_div");
      div.appendChild(instrument_container);

      let record_container = document.createElement("div");
      record_container.setAttribute("id","record_container");
      instrument_container.appendChild(record_container);
      for(i=0; i<8; i++){
        let record = document.createElement("div");
       /* record.setAttribute("id","track"+ "_" + track_num); */
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
    }
  }