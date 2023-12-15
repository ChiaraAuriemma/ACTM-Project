function createSamplesList(keyList, directoryName){
    samplesList = {};
    for (let key in keyList){
        
        for(let i=1; i<=nscale; i++){
          if(keyList[key]!==''){
            samplesList[keyList[key]+i]='sounds/'+directoryName+'/'+ keyList[key] + i +'.mp3';
          }
        }
    }
    return samplesList;
};


//caricamento dei suoni di un determinato strumento: ogni tasto avrà il riferimento al suono corretto
function loadSound(samplesList, instrumentId=""){
  //i parametri della funzione saranno:
  //samplesList: il "dzionario" con i riferimenti tra chiave e samples dello strumento in questione
  //instrumentId = l'id del div in cui si trova lo strumento
  const instrument = document.getElementById(instrumentId);
  const sounds = {};

  for(const sample in samplesList){
      const sound = new Howl({
          src: samplesList[sample]
      });
      sounds[sample] = sound;
  }

  instrument.addEventListener('mousedown', (e) => {
      const sample = e.target.dataset.note;
      if (sample) {
        sounds[sample].play();       
      }
  }); 

  instrument.addEventListener('mouseup', (e) => {
    const sample = e.target.dataset.note;
    if (sample) {
      sounds[sample].fade(1, 0, 2000);
    }
  }); 
} 




