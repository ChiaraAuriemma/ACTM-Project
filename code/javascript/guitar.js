function drawGuitar() {
    return "\<div class=\"settings\"\> \<div class=\"accidental-selector\"\> \<input type=\"radio\" class=\"acc-select\" id=\"flats\" name=\"accidentals\" value=\"flats\" checked\> \<label for=\"flats\"\>♭\</label\> \<input type=\"radio\" class=\"acc-select\" id=\"sharps\" name=\"accidentals\" value=\"sharps\"\> \<label for=\"sharps\"\>♯\</label\> \</div\>\<label for=\"show-all-notes\"\>Show all notes: \</label\> \<input type=\"checkbox\" id=\"show-all-notes\"\> \<label for=\"show-multiple-notes\"\>Show multiple notes: \</label\> \<input type=\"checkbox\" id=\"show-multiple-notes\"\> \</div\> \<div class=\"fretboard\"\> \</div\> \<div class=\"note-name-section\"\> \</div\> ";
}

//guitar setup
notesGuitar = ["E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", 'C4', 'Db4', "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "Fs2", "Gs2", "As2", "Cs3", "Ds3", "Fs3", "Gs3","As3", "Cs4", "Ds4", "Fs4", "Gs4", "As4", "Cs5"];
var guitarSamples = createSamplesList(notesGuitar, "guitarSamples", "guitar");


const notesGuitarFlat = ["C2", "Db2", "D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", 'C4', 'Db4', "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5"];
const notesGuitarSharp = ["C2", "Cs2", "D2", "Ds2", "E2", "F2", "Fs2", "G2", "Gs2", "A2", "As2", "B2", "C3", "Cs3", "D3", "Ds3", "E3", "F3", "Fs3", "G3", "Gs3", "A3", "As3", "B3","C4", "Cs4", "D4", "Ds4", "E4", "F4", "Fs4", "G4", "Gs4", "A4", "As4", "B4", "C5", "Cs5"];

function setupGuitar() {
    
    const root = document.documentElement;
    const fretboard = container.querySelector('.fretboard');
    const instrumentSelector = container.querySelector('#instrument-selector');
    const accidentalSelector = container.querySelector('.accidental-selector');

    const showAllNotesSelector = container.querySelector('#show-all-notes');
    const showMultipleNotesSelector = container.querySelector('#show-multiple-notes');
    const noteNameSection = container.querySelector('.note-name-section');
    const singleFretMarkPosition = [3, 5, 7, 9, 15, 17, 19, 21];
    const doubleFretMarkPosition = [12, 24];
    let instrumentTuningPresets;

    instrumentTuningPresets = {
        'Guitar 1': [28, 23, 19, 14, 9, 4],
    }
    numberOfFrets = 9;

    let allNotes;
    let showMultipleNotes = false;
    let showAllNotes = false;
    
    let accidentals = 'flats';
    let selectedInstrument = 'Guitar';
    selectedInstrument = 'Guitar 1'; 
   

    let numberOfStrings = instrumentTuningPresets[selectedInstrument].length;


    const app = {
        init() {
            this.setupFretboard();
            this.setupNoteNamesection();
            handlers.setupEventListeners();
        },
        setupFretboard() {
            fretboard.innerHTML = '';
            root.style.setProperty('--number-of-strings', numberOfStrings);
            // Add stringd to fretbord
            for (let i = 0; i < numberOfStrings; i++) {
                let string = tools.createElement('div');
                string.classList.add('string');
                fretboard.appendChild(string);

                // Create frets
                for (let fret = 0; fret <= numberOfFrets; fret++) {
                    let noteFret = tools.createElement('div');
                    noteFret.classList.add('note-fret');
                    
                    string.appendChild(noteFret);

                    let noteName = this.generateNoteNames((fret + instrumentTuningPresets[selectedInstrument][i]), accidentals);
                    noteFret.setAttribute('data-note', noteName);
                    
                    // Add single fret marks
                    if (i === 0 && singleFretMarkPosition.indexOf(fret) !== -1) {
                        noteFret.classList.add('single-fretmark');
                    }

                    if (i === 0 && doubleFretMarkPosition.indexOf(fret) !== -1) {
                        let doubleFretMark = tools.createElement('div');
                        doubleFretMark.classList.add('double-fretmark');
                        noteFret.appendChild(doubleFretMark);
                    }
                    
                }
            }
            allNotes = document.querySelectorAll('.note-fret');
        },
        generateNoteNames(noteIndex, accidentals) { 
            let noteName;
            if(accidentals === 'flats') {
                noteName = notesGuitarFlat[noteIndex];
            } else if(accidentals === 'sharps') {
                noteName = notesGuitarSharp[noteIndex];
            }
            return noteName;
        },
        
        setupNoteNamesection() {
           
        },

        toggleMultipleNotes(noteName, opacity) {
            
            for (let i = 0; i < allNotes.length; i++) {
                if (allNotes[i].dataset.note === noteName) {
                    allNotes[i].style.setProperty('--noteDotOpacity', opacity);
                }
            }
        }
    }

    const handlers = {
        showNoteDot(event){
            // Check if show all notes is selected
            if (showAllNotes) { 
                return;
            } 
            if (event.target.classList.contains('note-fret')) {
                if (showMultipleNotes) {
                    app.toggleMultipleNotes(event.target.dataset.note, 1);
            
                } else {
                    event.target.style.setProperty('--noteDotOpacity', 1);   
                }
            }
        },

        playnote(event){
            noteon(sounds=guitarSamples, e=event); 
        },
        releasenote(event){
            noteoff(sounds=guitarSamples, e=event); 
        },

        hideNoteDot(event) {
            if (showAllNotes) {
                return;
            }
            if (showMultipleNotes) {
                app.toggleMultipleNotes(event.target.dataset.note, 0);
            } else {
                event.target.style.setProperty('--noteDotOpacity', 0);
            }
        },
        setSelectedInstrument(event) {
            selectedInstrument = event.target.value;
            numberOfStrings = instrumentTuningPresets[selectedInstrument].length;
            app.setupFretboard();
        },
        setAccidentals(event) {
            if (event.target.classList.contains('acc-select')) {
                accidentals = event.target.value;
                app.setupFretboard();
                app.setupNoteNamesection();
            } else {
                return;
            }
        },


        setShowAllNote() {
            showAllNotes = showAllNotesSelector.checked;
            if (showAllNotes) {
                root.style.setProperty('--noteDotOpacity', 1);
                app.setupFretboard();
            } else {
                root.style.setProperty('--noteDotOpacity', 0);
                app.setupFretboard();
            }
        },
        setShowMultipleNotes() {
            showMultipleNotes = !showMultipleNotes;
        },
        setNotesToShow(event) {
            let noteToShow = event.target.innerText;
            
            app.toggleMultipleNotes(noteToShow, 1);
        },
        setNotesToHide(event) {
            if (!showAllNotes) {
                let noteToHide = event.target.innerText;
                app.toggleMultipleNotes(noteToHide, 0);
            } else {
                return;
            }
        },
  
        setupEventListeners(){
            fretboard.addEventListener('mousedown', this.playnote);
            fretboard.addEventListener('mouseup', this.releasenote);
            fretboard.addEventListener('mouseover', this.showNoteDot);
            fretboard.addEventListener('mouseout', this.hideNoteDot);
            accidentalSelector.addEventListener('click', this.setAccidentals);
            showAllNotesSelector.addEventListener('change', this.setShowAllNote);
            showMultipleNotesSelector.addEventListener('change', this.setShowMultipleNotes);
            noteNameSection.addEventListener('mouseover', this.setNotesToShow);
            noteNameSection.addEventListener('mouseout', this.setNotesToHide);
        }
        
    }
    
    const tools = {
        createElement(element, content) {
            element = document.createElement(element);
            if (arguments.length > 1) {
                element.innerHTML = content;
            }
           
            return element;
        }
    }
    
    app.init();

}