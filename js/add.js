function getDwellingFromInput() {
    const dwelling = {
        imageSrc: "",
        title: "",
        areaInSquareMeters: 0,
        priceInUSD: 0,
        location: "",
        floors: 0,
        swimmingPool: 0
    };

    // image = document.getElementById('add__input__image').files[0].name;
    let name = document.getElementById('add__input__name').value;
    let area = document.getElementById('add__input__area').value;
    let price = document.getElementById('add__input__price').value;
    let location_ = document.getElementById('add__input__location').value;
    let floors = document.getElementById('add__input__floors').value;
    let swimmingPool = document.getElementById('add__input__pool').checked;
    // console.log(image);
    console.log(name);
    console.log(area);
    console.log(price);
    console.log(location_);
    console.log(floors);
    console.log(swimmingPool);

    // let input = document.getElementById("add__input__image");
    // let fileReader = new FileReader();
    // fileReader.readAsDataURL(input.files[0]);
    // fileReader.onloadend = function(event){
    //     var img = document.getElementById("yourImgTag");
    //     img.src = event.target.result;
    //     console.log(event.target.result);
    // }

    dwelling.title = name

};


submit__add__btn.onclick = function() {
    getDwellingFromInput();
    dwellings.append(dwelling);
};



