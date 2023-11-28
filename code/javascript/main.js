document.getElementById("piano_button").addEventListener("click", (e) => {
    instrument = document.createElement("div");
    instrument.setAttribute("class","instrument");
    instruments_div = document.getElementById("instruments_div");
    instruments_div.appendChild(instrument);

    image_div= document.createElement("div");
    image = document.createElement("img");
    image.setAttribute("src", "images/piano.jpg")
    instrument.appendChild(image_div);
    image_div.appendChild(image);

})

document.getElementById("drum_button").addEventListener("click", (e) => {
    instrument = document.createElement("div");
    instrument.setAttribute("class","instrument");
    instruments_div = document.getElementById("instruments_div");
    instruments_div.appendChild(instrument);

    image_div= document.createElement("div");
    image = document.createElement("img");
    image.setAttribute("src", "images/drum.jpg")
    instrument.appendChild(image_div);
    image_div.appendChild(image);

})

document.getElementById("guitar_button").addEventListener("click", (e) => {
    instrument = document.createElement("div");
    instrument.setAttribute("class","instrument");
    instruments_div = document.getElementById("instruments_div");
    instruments_div.appendChild(instrument);

    image_div= document.createElement("div");
    image = document.createElement("img");
    image.setAttribute("src", "images/guitar.jpg")
    instrument.appendChild(image_div);
    image_div.appendChild(image);

})

document.getElementById("bass_button").addEventListener("click", (e) => {
    instrument = document.createElement("div");
    instrument.setAttribute("class","instrument");
    instruments_div = document.getElementById("instruments_div");
    instruments_div.appendChild(instrument);

    image_div= document.createElement("div");
    image = document.createElement("img");
    image.setAttribute("src", "images/bass.jpg")
    instrument.appendChild(image_div);
    image_div.appendChild(image);

})

function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
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



