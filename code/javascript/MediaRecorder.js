function SetupAudio(code, ins){
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({
      audio:true
    }).then((stream) => {
        
        records = ins.getRecords();
        const chunks = records[code].getChunks();

        recorder = new MediaRecorder(stream);
        records[code].setRecorder(recorder);

        recorder.ondataavailable = e => {
          chunks.push(e.data);
        }

        recorder.onstop = e => {
          const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus"});
          records[code].setAudioData(blob);
          records[code].setChunks([]);
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

  record.setIsRecording(!record.getIsRecording());

  if(record.getIsRecording()){
    record.getRecorder().start();
    console.log("Start Recording");
  }else{
    record.getRecorder().stop();
    console.log("Stop Recording");
  }
}