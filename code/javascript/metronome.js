metronome = {

    click1: new Audio('sounds/metronome/click1_metronome.mp3'),
    click2: new Audio('sounds/metronome/click2_metronome.mp3'),

    bpm: 140,
    beatsPerMeasure: 4, /* potremmo dare la possibilità di cambiare questo paramentro */
    count: 0,
    isRunning: false,
    interval: 0,


    start_stop : function(time){
        this.count = 0;

        if(time <= 20 || time>= 250){
            alert("Please enter a valid number");
            tmp = document.getElementById("metronome");
            tmp.value = "140";
            this.bpm = "140";
        }else{
            this.bpm = time;
        }
        
        if (!this.isRunning) {
            this.start();
            this.isRunning = true;
        } else {
            this.stop();
            this.isRunning = false;
        }
    },

    start: function(){
        this.interval = setInterval(() => this.playClick(), 60000 / this.bpm);
    },

    stop: function(){
        clearInterval(this.interval);
    },

    playClick: function(){
        if (this.count == this.beatsPerMeasure) {
            this.count = 0;
        }
        if (this.count == 0) {
            this.click1.play();
        } else {
            this.click2.play();
        }
        this.count++;
    },

    getBPM : function(){
        return this.bpm;
    }

}


