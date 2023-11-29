function choose_instrument(event) {
  button = event.target;
  string = button.getAttribute("id");

  instrument = document.createElement("div");
  instrument.setAttribute("class","instrument");
  instruments_div = document.getElementById("instruments_div");
  instruments_div.appendChild(instrument);

  image_div= document.createElement("div");
  image = document.createElement("img");
  image.setAttribute("src", "images/" + string + ".jpg")
  instrument.appendChild(image_div);
  image_div.appendChild(image);
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



