function SetupAudio(code, ins){
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({
      audio:true
    }).then((stream) => {
        
        records = ins.getRecords();

        recorder = new MediaRecorder(stream);
        records[code].setRecorder(recorder);

        recorder.ondataavailable = e => {
          records[code].getChunks().push(e.data);
        }

        recorder.onstop = e => {
          records[code].setTimeStop(Date.now());
          records[code].setDuration(records[code].getTimeStop()- records[code].getTimeStart());
          const blob = new Blob(records[code].getChunks(), {type: "audio/ogg; codecs=opus"});
          records[code].setChunks([]);

          
          records[code].setAudioElement(new Audio(window.URL.createObjectURL(blob))); 

          records[code].getAudioElement().addEventListener('ended', () => {
            records[code].setIsPlaying(false);
          });
        }

      records[code].setCanRecord(true);

    })
    .catch(err => {
      console.error(err)
    });
  }
}

function ToggleMic(record){
  if(!record.getCanRecord() || !record.getRecorder())  return;
  if(record.getAudioElement()){
    alert("This record is already full");
    return;
  }

  record.setIsRecording(!record.getIsRecording());

  if(record.getIsRecording()){
    el = view.create_countdown();
    time = (60 / metronome.getBPM()) * 1000 * model.getCountDown();
    CountDown(el,model.getCountDown());
    setTimeout(function () {
      record.getRecorder().start();
      record.setTimeStart(Date.now());
      
    }, time);
  }else{
    record.getRecorder().stop();
    
  }
}

function CountDown(el,seconds){
  delay = (60 / metronome.getBPM()) * 1000;
  if (seconds > 0) {
    setTimeout(function () {
      view.update_countdown(el,seconds);
      CountDown(el,seconds - 1); 
    }, delay);
  }else{
    view.hideCountdown(el);
    view.resetCountdown(el, model.getCountDown());
  }
}





