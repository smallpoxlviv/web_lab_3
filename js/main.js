let a = 'a';
console.log(a);

const dwellingList = document.getElementById('dwelling__list');
const inputDwelling = document.getElementById('header__input');
const clearButton = document.getElementById('clear__btn');

let dwellings = [
    {
        id: 1,
        imageSrc: "images/dwelling/a.jpg",
        title: "shwadchack",
        areaInSquareMeters: 150,
        priceInUSD: 20000,
        location: "Manhattan",
        floors: 3,
        swimmingPool: true
    },
    {
        id: 2,
        imageSrc: "images/dwelling/a.jpg",
        title: "kakak",
        areaInSquareMeters: 150,
        priceInUSD: 205400,
        location: "Manhattan",
        floors: 1,
        swimmingPool: true
    },
    {
        id: 3,
        imageSrc: "images/dwelling/a.jpg",
        title: "vytr",
        areaInSquareMeters: 150,
        priceInUSD: 2000026,
        location: "Manhattan",
        floors: 3,
        swimmingPool: true
    },
    {
        id: 4,
        imageSrc: "images/dwelling/a.jpg",
        title: "morty",
        areaInSquareMeters: 150,
        priceInUSD: 100600,
        location: "Manhattan",
        floors: 3,
        swimmingPool: true
    },
    {
        id: 5,
        imageSrc: "images/dwelling/a.jpg",
        title: "dubnevich",
        areaInSquareMeters: 150,
        priceInUSD: 680000,
        location: "Manhattan",
        floors: 3,
        swimmingPool: false
    }  
]

let shownDwellings = dwellings;

function getDwellingItem (imageSrc, title, areaInSquareMeters, priceInUSD, location, floors, swimmingPool) {
	if (swimmingPool){
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
            <p class="dwelling__item__paragraph">Has swimming pool</p>
            <div class= "control__buttons">
                <button class="item__btn edit__btn" id="edit__btn">Edit</button>
                <button class="item__btn delete__btn" id="delete__btn">Delete</button>
            </div>
        </li>
        ` 
    } else {
    	return `
        <li class="dwelling__item">
            <div class="item__img__wrap">
                <img src="images/dwelling/a.jpg" alt="dwelling image" class="gwelling__img">
            </div>
            <h3 class="dwelling__item__title">${title}</h3>
            <p class="dwelling__item__paragraph">Area: ${areaInSquareMeters} m^2</p>
            <p class="dwelling__item__paragraph">Price: ${priceInUSD} USD</p>
            <p class="dwelling__item__paragraph">Location: ${location}</p>
            <p class="dwelling__item__paragraph">Has ${floors} floors</p>
            <p class="dwelling__item__paragraph">Has no swimming pool</p>
            <div class= "control__buttons">
                <button class="item__btn edit__btn" id="edit__btn">Edit</button>
                <button class="item__btn delete__btn" id="delete__btn">Delete</button>
            </div>
        </li>
        ` 
    } 
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