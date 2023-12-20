function drawGuitar(container_id) {
    enableSoundGuitar(container_id);
    let id_guitar = document.getElementById(container_id);
    let guitar_settings_div = document.createElement("div");
    guitar_settings_div.setAttribute("class", "settings");
    id_guitar.appendChild(guitar_settings_div);
    let instrument_selector_label = document.createElement("label");
    instrument_selector_label.setAttribute("for", "instrument-selector");
    instrument_selector_label.innerHTML = "Instrument: ";
    guitar_settings_div.appendChild(instrument_selector_label);
    let instrument_selector_select = document.createElement("select");
    instrument_selector_select.setAttribute("name", "instrument-selector");
    instrument_selector_select.setAttribute("id", "instrument-selector");
    guitar_settings_div.appendChild(instrument_selector_select);
    let accidental_selector = document.createElement("div");
    accidental_selector.setAttribute("class", "accidental-selector");
    let flats_input = document.createElement("input");
    flats_input.setAttribute("type", "radio");
    flats_input.setAttribute("class", "acc-select");
    flats_input.setAttribute("id", "flats");
    flats_input.setAttribute("name", "accidentals");
    accidental_selector.appendChild(flats_input);
    let flats_label = document.createElement("label");
    flats_label.setAttribute("for", "flats");
    flats_label.innerHTML = "♭";
    accidental_selector.appendChild(flats_label);
    let sharps_input = document.createElement("input");
    sharps_input.setAttribute("type", "radio");
    sharps_input.setAttribute("class", "acc-select");
    sharps_input.setAttribute("id", "sharps");
    sharps_input.setAttribute("name", "accidentals");
    accidental_selector.appendChild(sharps_input);
    let sharps_label = document.createElement("label");
    sharps_label.setAttribute("for", "sharps");
    sharps_label.innerHTML = "♯";
    accidental_selector.appendChild(sharps_label);
    let number_of_frets_label = document.createElement("label");;
    number_of_frets_label.setAttribute("for", "numberOfFrets");
    number_of_frets_label.innerHTML = "Number of frets: ";
    guitar_settings_div.appendChild(number_of_frets_label);
    let number_of_frets_input = document.createElement("input");
    number_of_frets_input.setAttribute("type", "number");
    number_of_frets_input.setAttribute("id", "number-of-frets");
    number_of_frets_input.setAttribute("min", "5");
    number_of_frets_input.setAttribute("max", "30");
    number_of_frets_input.setAttribute("value", "20");
    guitar_settings_div.appendChild(number_of_frets_input);
    let show_all_notes_label = document.createElement("label");
    show_all_notes_label.setAttribute("for", "show-all-notes");
    show_all_notes_label.innerHTML = "Show all notes: ";
    guitar_settings_div.appendChild(show_all_notes_label);
    let show_all_notes_input = document.createElement("input");
    show_all_notes_input.setAttribute("type", "checkbox");
    show_all_notes_input.setAttribute("id", "show-all-notes");
    guitar_settings_div.appendChild(show_all_notes_input);
    let show_multiple_notes_label = document.createElement("label");
    show_multiple_notes_label.setAttribute("for", "show-multiple-notes");
    show_multiple_notes_label.innerHTML = "Show multiple notes: ";
    guitar_settings_div.appendChild(show_multiple_notes_label);
    let show_multiple_notes_input = document.createElement("input");
    show_multiple_notes_input.setAttribute("type", "checkbox");
    show_multiple_notes_input.setAttribute("id", "show-multiple-notes");
    guitar_settings_div.appendChild(show_multiple_notes_input);
    let fretboard_div = document.createElement("div");
    fretboard_div.setAttribute("class", "fretboard");
    id_guitar.appendChild(fretboard_div);
    let note_name_selection_div = document.createElement("div");
    note_name_selection_div.setAttribute("class", "note-name-section");
    id_guitar.appendChild(note_name_selection_div);
    setup();
}


function enableSoundGuitar(container_id, firstScale){
    pianoKeys=whiteKey.concat(blackKey);
    let pianoSamples = createSamplesList(pianoKeys, "guitarSamples", "guitar");
    console.log(pianoSamples);
    loadSound(pianoSamples, container_id );
}

function setup() {
    const root = document.documentElement;
    const fretboard = container.querySelector('.fretboard');
    const instrumentSelector = container.querySelector('#instrument-selector');
    const accidentalSelector = container.querySelector('.accidental-selector');
    const numberOfFretsSelector = container.querySelector('#number-of-frets');
    const showAllNotesSelector = container.querySelector('#show-all-notes');
    const showMultipleNotesSelector = container.querySelector('#show-multiple-notes');
    const noteNameSection = container.querySelector('.note-name-section');
    const singleFretMarkPosition = [3, 5, 7, 9, 15, 17, 19, 21];
    const doubleFretMarkPosition = [12, 24];
    const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const instrumentTuningPresets = {
        'Guitar': [4, 11, 7, 2, 9, 4],
        'Bass (4 strings)': [7, 2, 9, 4],
        'Bass (5 strings)': [7, 2, 9, 4, 11],
        'Ukulele': [9, 4, 0, 7]
    };

    let allNotes;
    let showMultipleNotes = false;
    let showAllNotes = false;
    let numberOfFrets = 20;
    let accidentals = 'flats';
    let selectedInstrument = 'Guitar';
    let numberOfStrings = instrumentTuningPresets[selectedInstrument].length;

    const app = {
        init() {
            this.setupFretboard();
            this.setupinstrumentSelector();
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
        generateNoteNames(noteIndex, accidentals) { //accidentals è una variabile globale la lascio?
            noteIndex = noteIndex % 12;
            let noteName;
            if(accidentals === 'flats') {
                noteName = notesFlat[noteIndex];
            } else if(accidentals === 'sharps') {
                noteName = notesSharp[noteIndex];
            }
            return noteName;
        },
        setupinstrumentSelector() {
            for (instrument in instrumentTuningPresets) {
                let instrumentOption = tools.createElement('option', instrument);
                instrumentSelector.appendChild(instrumentOption);
            }
        },
        setupNoteNamesection() {
            noteNameSection.innerHTML = '';
            let noteNames;
            if (accidentals === 'flats') {
                noteNames = notesFlat;
            } else {
                noteNames = notesSharp;
            }
            noteNames.forEach((noteName) => {
                let noteNameElement = tools.createElement('span', noteName);
                noteNameSection.appendChild(noteNameElement);
            });
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
        showNoteDot(event) {
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
        setNumberOfFrets() {
            numberOfFrets = numberOfFretsSelector.value;
            app.setupFretboard();
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
        setupEventListeners() {
            fretboard.addEventListener('mouseover', this.showNoteDot);
            fretboard.addEventListener('mouseout', this.hideNoteDot);
            instrumentSelector.addEventListener('change', this.setSelectedInstrument)
            accidentalSelector.addEventListener('click', this.setAccidentals);
            numberOfFretsSelector.addEventListener('change', this.setNumberOfFrets);
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



    // play the guitar


}