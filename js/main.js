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

function getDwellingItem (imageSrc, title, areaInSquareMeters, priceInUSD, location, floors, swimmingPool) {
    let no = ' '
	if (!swimmingPool){
        no = ' no '
    }
    return `
    <li class="dwelling__item">
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
            <button class="item__btn edit__btn" id="edit__btn">Edit</button>
            <button class="item__btn delete__btn" id="delete__btn">Delete</button>
        </div>
    </li>
    `   
}

//display items
const displayDwellings = (dwellings) => {
    const displayItems = dwellings.map((dwelling)=>{
    	return getDwellingItem(dwelling.imageSrc, dwelling.title, dwelling.areaInSquareMeters, dwelling.priceInUSD, dwelling.location, dwelling.floors, dwelling.swimmingPool)
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


//  popup add  //

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

addSubmitBtn.addEventListener('click', function (element) {
    let name = addInputName.value;
    let area = addInputArea.value;
    let price = addInputPrice.value;
    let location_ = addInputLocation.value;
    let floors = addInputFloors.value;
    let imageSrc = addInputImage.value;
    let swimmingPool = addInputPool.checked;

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
    if(imageSrc === '') {
        addDwellingExceptions.push('Please, choose the image.');
    }
    if (addDwellingExceptions.length > 0){
        alert(addDwellingExceptions[0]);
        addDwellingExceptions = [];
    } else {
        addDwelling(name, area, price, location_, floors, imageSrc, swimmingPool); 
        //close popup  
        // const popupActive = document.querySelector('.popup.open__popup');
        // popupClose(popupActive);
    }
});

function addDwelling(name, area, price, location_, floors, imageSrc, swimmingPool){
    console.log()
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
    console.log(dwelling)
    dwellingString = JSON.stringify(dwelling);
// //////////////////////

    let request = fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: dwellingString
    });
}