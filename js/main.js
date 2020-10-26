let a = 'a';
console.log(a);

const dwellingList = document.getElementById('dwelling__list');
const inputDwelling = document.getElementById('header__input');
const clearButton = document.getElementById('clear__btn');


let dwellings = [];

dwellingsString = dwellingsString.replaceAll('&quot;', '"');
if (dwellingsString != '') {
    dwellings = JSON.parse(dwellingsString);
}

let shownDwellings = dwellings;

function getDwellingItem (id, imageSrc, title, areaInSquareMeters, priceInUSD, location, floors, swimmingPool) {
    let no = ' '
	if (!swimmingPool){
        no = ' no '
    }
    return `
    <li id="${id}" class="dwelling__item">
        <div class="item__img__wrap">
            <img src="${imageSrc}" alt="dwelling image" class="gwelling__img">
        </div>
        <h3 class="dwelling__item__title">${title}</h3>
        <p class="dwelling__item__paragraph">Area: ${areaInSquareMeters} m^2</p>
        <p class="dwelling__item__paragraph">Price: ${priceInUSD} USD</p>
        <p class="dwelling__item__paragraph">Location: ${location}</p>
        <p class="dwelling__item__paragraph">Has ${floors} floors</p>
        <p class="dwelling__item__paragraph">Has${no}swimming pool</p>
        <div class= "control__buttons">
            <button class="item__btn edit__btn popup__link" href="#popup__edit" id="edit__btn">Edit</button>
            <button class="item__btn delete__btn" id="delete__btn">Delete</button>
        </div>
    </li>
    `   
}

//display items
const displayDwellings = (dwellings) => {
    const displayItems = dwellings.map((dwelling)=>{
    	return getDwellingItem(dwelling.id, dwelling.imageSrc, dwelling.title, dwelling.areaInSquareMeters, dwelling.priceInUSD, dwelling.location, dwelling.floors, dwelling.swimmingPool)
    }).join('');

    dwellingList.innerHTML = displayItems;
}

//sort
function showDwellingListSorted(){
    let sortType = document.getElementById('sort__select').value;
    if (sortType == 'none'){
        displayDwellings(shownDwellings);
        return;
    } else if (sortType == 'name'){
        shownDwellings.sort(nameComparator);
    } else if (sortType == 'area'){
        shownDwellings.sort(areaComparator);
    } else if (sortType == 'price'){
        shownDwellings.sort(priceComparator);
    } else if (sortType == 'floors'){
        shownDwellings.sort(floorsComparator);
    } else if (sortType == 'pool'){
        shownDwellings.sort(poolComparator);
    }
    displayDwellings(shownDwellings);
}

// comparators
function nameComparator(dwellingFirst, dwellingSecond){
    let dwellingNameFirst = dwellingFirst.title.toLowerCase();
    let dwellingNameSecond = dwellingSecond.title.toLowerCase();
    if (dwellingNameFirst < dwellingNameSecond) {
        return -1;
    }
    if (dwellingNameFirst > dwellingNameSecond) {
        return 1;
    }
    return 0;
}

function areaComparator(dwellingFirst, dwellingSecond){
	return dwellingFirst.areaInSquareMeters - dwellingSecond.areaInSquareMeters;
}

function priceComparator(dwellingFirst, dwellingSecond){
	return dwellingFirst.priceInUSD - dwellingSecond.priceInUSD;
}

function floorsComparator(dwellingFirst, dwellingSecond){
	return dwellingFirst.floors - dwellingSecond.floors;
}

function poolComparator(dwellingFirst, dwellingSecond){
	return dwellingFirst.swimmingPool - dwellingSecond.swimmingPool;
}

//write input
inputDwelling.addEventListener('keyup', (searchedString) => {
    const findFilterString = searchedString.target.value.toLowerCase();
    const findDwellingsByTitle = dwellings.filter(dwelling =>{
        return dwelling.title.toLowerCase().includes(findFilterString);
    });
    shownDwellings = findDwellingsByTitle;
    showDwellingListSorted();
})

//clear input
clearButton.addEventListener('click', ()=> {
    inputDwelling.value = '';
    shownDwellings = dwellings;
    showDwellingListSorted();
})

//count total price
function countTotalPrice(){
    let sum = 0;
    let totalPrice = document.getElementById('total__price');
    shownDwellings.forEach(dwelling => sum += dwelling.priceInUSD);
    totalPrice.textContent = 'Total price: ' + sum +' USD';
}

displayDwellings(shownDwellings)


//  popup add and edit //

const popupLinks = document.querySelectorAll('.popup__link');
const body = document.querySelectorAll('body')[0];
const lockPadding = document.querySelectorAll('.lock__padding'); 

let unlock = true;

const timeout = 500;

for (let index = 0; index < popupLinks.length; index++){
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (element) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const curentPopup = document.getElementById(popupName);
        popupOpen(curentPopup);
        element.preventDefault();
    });
}

const popupCloseIcons = document.querySelectorAll('.close__popup');
for (let index = 0; index < popupCloseIcons.length; index++){
    const popupCloseIcon = popupCloseIcons[index];
    popupCloseIcon.addEventListener('click', function(element) {
        popupClose(popupCloseIcon.closest('.popup'));
        element.preventDefault();
    });        
}

function popupOpen(curentPopup){
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open__popup');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open__popup');
        curentPopup.addEventListener('click', function (element) {
            if (!element.target.closest('.popup__content')) {
                popupClose(element.target.closest('.popup'))
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true){
    if (unlock) {
        popupActive.classList.remove('open__popup');
        if (doUnlock){
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.header').offsetWidth + 'px';
    
    for (let index = 0; index < lockPadding.length; index++){
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
    } 
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock__body');

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
 }

 function bodyUnLock(){
    setTimeout(function() {
    for (let index = 0; index < lockPadding.length; index++){
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
    } 
    body.style.paddingRight = '0px';
    body.classList.remove('lock__body');
    }, timeout)

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
 }

 //close popup with esc
 document.addEventListener('keydown', function (element) {
    if (element.which === 27) {
        const popupActive = document.querySelector('.popup.open__popup');
        popupClose(popupActive);
    }
});


//  submit in add popup  //

//submit
let addDwellingExceptions = [];
const addSubmitBtn = document.getElementById('submit__add__dwelling__btn');
const addInputName = document.getElementById('add__input__name');
const addInputArea = document.getElementById('add__input__area');
const addInputPrice = document.getElementById('add__input__price');
const addInputLocation = document.getElementById('add__input__location');
const addInputFloors = document.getElementById('add__input__floors');
const addInputImage = document.getElementById('add__input__image');
const addInputPool = document.getElementById('add__input__pool');

let imageFile;
addInputImage.addEventListener('change', (event) => {
    const fileList = event.target.files;
    imageFile = fileList[0];
});

let name;
let area;
let price;
let location_;
let floors;
let swimmingPool;
let imageValue;

addSubmitBtn.addEventListener('click', function (event) {
    name = addInputName.value;
    area = addInputArea.value;
    price = addInputPrice.value;
    location_ = addInputLocation.value;
    floors = addInputFloors.value;
    swimmingPool = addInputPool.checked;
    imageValue = addInputImage.value;

    if(name === '') {
        addDwellingExceptions.push('Please, enter the name.');
    }
    if(area === '') {
        addDwellingExceptions.push('Please, enter the area.');
    }
    if(price === '') {
        addDwellingExceptions.push('Please, enter the price.');
    }
    if(location_ === '') {
        addDwellingExceptions.push('Please, enter the location.');
    }
    if(floors === '') {
        addDwellingExceptions.push('Please, enter the number of floors.');
    }
    if(imageValue === '') {
        addDwellingExceptions.push('Please, choose the image.');
    }
    if (addDwellingExceptions.length > 0){
        alert(addDwellingExceptions[0]);
        addDwellingExceptions = [];
    } else {
        readImage(imageFile);  
        //when image is ready calls AddDwelling()
        whenImageIsReadyAddDwelling(); 
        //close popup 
        const popupActive = document.querySelector('.popup.open__popup');
        popupClose(popupActive);
        //clean input
        addInputName.value = '';
        addInputArea.value = '';
        addInputPrice.value = '';
        addInputLocation.value = '';
        addInputFloors.value = 1;
        addInputPool.checked = false;
        addInputImage.value = '';
    }
});

//read image
let ready = false;
let imageSrc = '';
function readImage(file) {
    // Check if the file is an image.
    if (file.type && file.type.indexOf('image') === -1) {
        console.log('File is not an image.', file.type, file);
        return;
    }
    if (!file) { 
        console.log('There is no file');
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
        imageSrc = reader.result;
        ready = true;
    };
}

function whenImageIsReadyAddDwelling() {
    if (ready === true) {
        ready = false;
        addDwelling();
        return;
    }
    setTimeout(whenImageIsReadyAddDwelling, 1000);
}

//add dwelling
async function addDwelling(){
    let id = 1;
    if (dwellings.length > 0) {
        id = dwellings[dwellings.length - 1]['id'] + 1;
    }
   
    dwelling = {
        "id": id,
        "imageSrc": imageSrc,
        "title": name,
        "areaInSquareMeters": area,
        "priceInUSD": price,
        "location": location_,
        "floors": floors,
        "swimmingPool": swimmingPool
    }

    dwellingString = JSON.stringify(dwelling);

    let response = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: dwellingString
    });
    // let result = await response.json();
    if (response.status == 200) {
        console.log(response.status, ': Dwelling was added successfully.'); 
    } else {
        console.log(response.status, ': Something went wrong while add!');
        alert('Something went wrong! Please, try again later.')
    }
}


//   delete dwelling button  //

const deleteButtons = document.querySelectorAll('#delete__btn');

for (let index = 0; index < deleteButtons.length; index++){
    const deleteButton = deleteButtons[index];
    deleteButton.addEventListener('click', function (element) {
        id = deleteButton.closest('.dwelling__item').id;
        deleteDwelling(id);
    });
}

async function deleteDwelling(id){

    dwelling = {
        "id": id
    }
    dwellingString = JSON.stringify(dwelling);

    let response = await fetch('/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: dwellingString
    });

    if (response.status == 200) {
        console.log(response.status, ': Dwelling was deleted successfully.');
        hideElement(id); 
    } else {
        console.log(response.status, ': Something went wrong while delete!');
        alert('Something went wrong! Please, try again later.')
    }
}

function hideElement(id){
    let element = document.getElementById(id);
    element.classList.add('hiden');
}



//////////////////////////////////////////


//   edit dwelling button //

const editButtons = document.querySelectorAll('#edit__btn');
let editId;
for (let index = 0; index < editButtons.length; index++){
    const editButton = editButtons[index];
    editButton.addEventListener('click', function (element) {
        editId = editButton.closest('.dwelling__item').id;
    });
}


//  submit in edit popup  //
//submit
const editSubmitBtn = document.getElementById('submit__edit__dwelling__btn');
const editInputName = document.getElementById('edit__input__name');
const editInputArea = document.getElementById('edit__input__area');
const editInputPrice = document.getElementById('edit__input__price');
const editInputLocation = document.getElementById('edit__input__location');
const editInputFloors = document.getElementById('edit__input__floors');
const editInputImage = document.getElementById('edit__input__image');
const editInputPool = document.getElementById('edit__input__pool');

imageFile = undefined;
imageSrc = '';
editInputImage.addEventListener('change', (event) => {
    const fileList = event.target.files;
    imageFile = fileList[0];
});

let nameUpdate;
let areaUpdate;
let priceUpdate;
let location_Update;
let floorsUpdate;
let swimmingPoolUpdate;

editSubmitBtn.addEventListener('click', function (event) {
    nameUpdate = editInputName.value;
    areaUpdate = editInputArea.value;
    priceUpdate = editInputPrice.value;
    location_Update = editInputLocation.value;
    floorsUpdate = editInputFloors.value;
    swimmingPoolUpdate = editInputPool.checked;

    if (imageFile != undefined) {
        readImage(imageFile);  
        //when image is ready calls AddDwelling()
        whenImageIsReadyUpdateDwelling();
    } else {
        updateDwelling();
    }
    //close popup 
    const popupActive = document.querySelector('.popup.open__popup');
    popupClose(popupActive);
    //clean input
    addInputName.value = '';
    addInputArea.value = '';
    addInputPrice.value = '';
    addInputLocation.value = '';
    addInputFloors.value = '';
    addInputPool.checked = false;
    addInputImage.value = '';
});

function whenImageIsReadyUpdateDwelling() {
    if (ready === true) {
        ready = false;
        updateDwelling();
        return;
    }
    setTimeout(whenImageIsReadyUpdateDwelling, 1000);
}

//update dwelling
async function updateDwelling(){
       
    dwelling = {
        "id": editId,
        "imageSrc": imageSrc,
        "title": nameUpdate,
        "areaInSquareMeters": areaUpdate,
        "priceInUSD": priceUpdate,
        "location": location_Update,
        "floors": floorsUpdate,
        "swimmingPool": swimmingPoolUpdate
    }

    dwellingString = JSON.stringify(dwelling);

    let response = await fetch('/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: dwellingString
    });
    // let result = await response.json();
    if (response.status == 200) {
        console.log(response.status, ': Dwelling was edited successfully.'); 
    } else {
        console.log(response.status, ': Something went wrong while edit!');
        alert('Something went wrong! Please, try again later.')
    }
}

// function hideElement(id){
//     let element = document.getElementById(id);
//     element.classList.add('hiden');
// }