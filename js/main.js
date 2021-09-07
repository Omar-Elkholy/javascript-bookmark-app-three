var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var submitBtn = document.getElementById('submitBtn');
var favItems = document.getElementById('favItems');
var validateMsg = document.querySelectorAll(".val");
var inputs = document.querySelectorAll("input");

var favList = [];


// Display Items From Local Storage
getFromLocal();


// Validation & Submit
submitBtn.addEventListener('click', function () {
  validate();
  display();
  addToLocal();

});


// validate 
function validate() {
  var a = true;
  for (var i = 0; i < inputs.length; i++) {
    validateMsg[i].style.opacity = "0";
    if(inputs[i].value == ""){
      validateMsg[i].style.opacity = "1";
      a = false;
    }
  }
  if (a) {
    addToList();
    clearForm();
  }
}


// Display
function display() {
  var str = "";
  for (var i = 0; i < favList.length; i++) {
    str +=
      `
      <div class="col-md-6">
        <div class = "favSites py-3 px-2">
          <h3>${favList[i].name}</h3>
          <div class = "d-inline-block float-end">
            <a class="btn btn-primary" href="${favList[i].url}" target = "_blank">Visit</a>
            <button class="btn btn-danger" id="delete" onclick = "deleteItem(${i})">Delete</button>
          </div>
        </div>
      </div>
      `
  }
  favItems.innerHTML = str;
}


// Add To List
function addToList() {
  var siteObj = {
    name: siteName.value,
    url: siteURL.value,
  }

  favList.push(siteObj);

}

// Delete Item
function deleteItem(x) {
  favList.splice(x, 1);
  addToLocal();
  display();
}

// Clear Form
function clearForm() {
  siteURL.value = "";
  siteName.value = "";
}

// Add To Local
function addToLocal() {
  localStorage.setItem("allFavourites", JSON.stringify(favList));
}

// Get From Local
function getFromLocal() {
  var x = localStorage.getItem("allFavourites");
  if (x == null) {
    favList = [];
  } else {
    favList = JSON.parse(x);
    display();
  }
}


