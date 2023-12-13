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
