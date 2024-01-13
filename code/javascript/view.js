view = {
    addInstrument: function(string, num){
      let instrument_container = document.createElement("div");
      instrument_container.setAttribute("class","instrument");
      instrument_container.setAttribute("id",string + "_" + num);
      instrument_container.setAttribute("onclick", "controller.delete_instrument(event)");
      let div = document.getElementById("instruments_div");
      div.appendChild(instrument_container);

      let image_div= document.createElement("div");
      let image = document.createElement("img");
      image.setAttribute("src", "images/" + string + ".jpg")
      image.setAttribute("onclick","controller.start_play(event)")
      image.setAttribute("class","image")
      instrument_container.appendChild(image_div);
      image_div.appendChild(image);

      
      let record_container = document.createElement("div");
      record_container.setAttribute("class","record_container");
      instrument_container.appendChild(record_container);
      for(i=0; i<model.getNumTracks(); i++){
        let record = document.createElement("div");
        record.setAttribute("id", "record_" + i);
        record.setAttribute("class","record_square");
        record.setAttribute("onclick", "controller.startPlay_recording(event)");
        record_container.appendChild(record);

        let tempoDiv = document.createElement("div");
        tempoDiv.setAttribute("class","tempo_div");
        record.appendChild(tempoDiv);

        this.create_canvas(record);
      }

      if(string != 'voice'){
        let beats_container = document.createElement("div");
        beats_container.setAttribute("class","beats_container");
        instrument_container.appendChild(beats_container);

        let input = document.createElement('input');
        input.setAttribute('class','beats_input');
        input.setAttribute("type", "number");
        input.setAttribute("name", "numero");
        input.setAttribute("min", "1");
        input.setAttribute("max", "16");
        input.setAttribute("step", "1");
        input.setAttribute("value", "1");
        input.addEventListener('input', function(event) {
          controller.checkNumBars(event, num);
        });        
        let label = document.createElement('label');
        label.setAttribute('class','label_beats');
        label.textContent = 'Number of Bars:';
        beats_container.appendChild(label);
        beats_container.appendChild(input);
      }


      let instrument_settings = document.createElement("div");
      let instrument_volume = document.createElement("input");
      let instrument_mute = document.createElement("button");
      let instrument_solo = document.createElement("button");

      instrument_settings.setAttribute("class","instrument_settings");

      instrument_volume.setAttribute("type","range");
      instrument_volume.setAttribute("min", "0");
      instrument_volume.setAttribute("max", "100");
      instrument_volume.setAttribute("value", "100");
      instrument_volume.setAttribute("class", "slider");
      instrument_volume.setAttribute("oninput", "controller.change_volume(event)");

      instrument_mute.setAttribute("type","button");
      instrument_mute.setAttribute("class","m_button");
      instrument_mute.setAttribute("onclick","controller.activate_mute(event)");
      instrument_mute.innerHTML = "Mute";

      instrument_solo.setAttribute("type","button");
      instrument_solo.setAttribute("class","s_button");
      instrument_solo.setAttribute("onclick","controller.activate_solo(event)");
      instrument_solo.innerHTML = "Solo";

      image_div.appendChild(instrument_settings);
      instrument_settings.appendChild(instrument_volume);
      instrument_settings.appendChild(instrument_mute);
      instrument_settings.appendChild(instrument_solo);

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
        close_button.addEventListener('click', function(event) {
          closePopup(event);
        });
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

    reset_active_button: function(){
      document.getElementById("rec_button").classList.remove("active_button");
      document.getElementById("play_button").classList.remove("active_button");
      document.getElementById("remove_button").classList.remove("active_button");
      document.getElementById("deleteRecord_button").classList.remove("active_button");
      document.getElementById("loop_button").classList.remove("active_button");
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
    },

    resetCountdown: function(el, seconds){
      el.children[0].innerText = seconds;
    },

    now_recording: function(event){ /* accorpare con printTime ?? */
      target = event.target.closest('.record_square');
      target.classList.add("recording");
    },

    resetRecording: function(event){
      target = event.target.closest('.record_square');
      target.classList.remove("recording");

      target.children[0].style.display = "none";
      target.children[1].style.display = "none";
    },

    printTime: function(event, record){
      tempoDiv = event.target.closest('.record_square').children[0];
      tempoDiv.innerText = record.getBeats() + 'beats' + '_' + record.getBPM() + 'bpm';
      tempoDiv.style.display = "block";
    },

    activate_mute_solo: function(event){
      event.target.classList.toggle("activate_mute_solo");
    },

    create_canvas: function(recordSquare){
      var canvas = document.createElement("canvas");
      canvas.setAttribute("class", "canvas_record");
      

      recordSquare.appendChild(canvas);
    },

    play_record: function(record) {
      canvas = record.getFather().getRefDiv().children[0].children[record.getCode()].children[1]; /*boh migliorabile */
      canvas.style.display = "block";

      let ctx = canvas.getContext('2d');
      let centerX = canvas.width / 2;
      let centerY = canvas.height / 2;
      let radius = 110; 
      let duration = record.getDuration();

      if(!record.getAnimationState()){
        startAnimation();
      }else if(record.getAnimationState() && record.getFather().getType() == 'voice'){
        pauseAnimation();
      }
     
      function drawCircle() {

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'red';

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);

          for (var i = 0; i <= record.getAnimationAngle(); i += 0.01) {
              var x = centerX + radius * Math.cos(i);
              var y = centerY + radius * Math.sin(i);
              ctx.lineTo(x, y);
          }

          ctx.fill();
          
          record.setAnimationAngle(record.getAnimationAngle() + 0.04);

          if (record.getAnimationAngle() > Math.PI * 2) {
              stopAnimation();
          }
      }

      function startAnimation() {
          let animationInterval = setInterval(drawCircle, duration/(2*Math.PI/0.04));
          record.setAnimationInt(animationInterval);
          record.setAnimationState(true);
      }

      function stopAnimation() {
          clearInterval(record.getAnimationInt());
          record.setAnimationAngle(0);
          record.setAnimationState(false);
      }

      function pauseAnimation() {
        tmp = record.getAnimationAngle();
        stopAnimation();
        record.setAnimationAngle(tmp);
      }
      
    }
  }