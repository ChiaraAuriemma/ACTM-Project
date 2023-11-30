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
  image.setAttribute("onclick","start_recording(event)")
  instrument.appendChild(image_div);
  image_div.appendChild(image);
}

function start_recording(event){
  string = event.target.getAttribute("src");
  id = string.split("/")[1].split(".")[0];

  container= document.createElement("div");
  container.setAttribute("id", id + "_container");
  container.setAttribute("class", "instrument_container");
  father = document.getElementById("instruments_div");
  father.appendChild(container);

  container.innerHTML = drawKeyBoard(); /* da generalizzare quando avremo più strumenti */

  close_button = document.createElement("span");
  close_button.setAttribute("class", "close");
  close_button.setAttribute("onclick", "closePopup(event)");
  close_button.innerHTML = "&times;";
  container.appendChild(close_button);

  let lastScrollLeft = 0;
  container.addEventListener('scroll', function(event) {
    const currentScrollLeft = container.scrollLeft;

    if (currentScrollLeft > lastScrollLeft) {
        /*Scorrimento a destra */
        container.childNodes[1].style.left = (parseFloat(container.childNodes[1].style.left) + currentScrollLeft) + 'px';
    } else if (currentScrollLeft < lastScrollLeft) {
       /*Scorrimento a sinistra */
       container.childNodes[1].style.left = (parseFloat(container.childNodes[1].style.left) - currentScrollLeft) + 'px';
    }

    lastScrollLeft = currentScrollLeft;
    });
  }


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



