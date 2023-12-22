function createSamplesList(keyList, directoryName, name, firstScale=0){
    samplesList = {};

    for (let key in keyList){
      if(name == 'piano'){
        for(let i=firstScale; i<(nscale+firstScale); i++){
          if(keyList[key]!==''){
            samplesList[keyList[key]+i]='sounds/'+directoryName+'/'+ keyList[key] + i +'.mp3';
          }
        } 
      }else{
        samplesList[keyList[key]]='sounds/'+directoryName+'/'+ keyList[key] +'.mp3';
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
      console.log(sample)
      if (sample) {
        sounds[sample].play();
        console.log("drum")      
      }
  }); 

  instrument.addEventListener('mouseup', (e) => {
    const sample = e.target.dataset.note;
    if (sample) {
      sounds[sample].fade(1, 0, 2000);
    }
  }); 
}


flat_to_sharp_dict = {
  C : "C",
  Db : "Cs",
  D : "D",
  Eb : "Ds",
  E : "E",
  F : "F",
  Gb : "Fs",
  G : "G",
  Ab : "Gs",
  A : "A",
  Bb : "As",
  B : "B"
};










