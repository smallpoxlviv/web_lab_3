dwelling = {
    imageSrc: "",
    title: "",
    areaInSquareMeters: 0,
    priceInUSD: 0,
    location: "",
    floors: 0,
    swimmingPool: 0
};

submit__btn.onclick = function() {
	image = document.getElementById('add__input__image').files[0].name;
	name = document.getElementById('add__input__name').value;
	area = document.getElementById('add__input__area').value;
	price = document.getElementById('add__input__price').value;
	location_ = document.getElementById('add__input__location').value;
	floors = document.getElementById('add__input__floors').value;
	swimmingPool = document.getElementById('add__input__pool').checked;
	console.log(image);
	console.log(name);
	console.log(area);
	console.log(price);
	console.log(location_);
	console.log(floors);
	console.log(swimmingPool);

	// var input = document.getElementById("inputFile");
	// var fReader = new FileReader();
	// fReader.readAsDataURL(input.files[0]);
	// fReader.onloadend = function(event){
	//     var img = document.getElementById("yourImgTag");
	//     img.src = event.target.result;
	// }

};

