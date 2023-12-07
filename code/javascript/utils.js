/* Some utils */
function closePopup(event) {
    popup = event.target.parentNode;
    popup.style.display = 'none';
  }
  
  function toggleDropdown(event) {
      button = event.target;
      string = button.getAttribute("id");
      id = string.split('_')[0];
      dropdownContent = document.getElementById(id);
      dropdownContent.classList.toggle('show');
  }
  
  
  window.onclick = function(event) {
    if (!event.target.matches('button')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (const dropdown of dropdowns) {
        if (dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
        }
      }
    }
  };


// funzioni per la creazione e il caricamento dei samples
  function createSampleList(keyList){
    samplesList = {};
    for(let key in keyList) {
        samplesList[keyList[key]] = './audio/' + keyList[key] + '.wav';
    }
    return samplesList;
};


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

  instrument.addEventListener('click', (e) => {
      const sample = e.target.dataset.note;
      
      if (sample) {
      sounds[sample].play();
      }
  }); 
} 