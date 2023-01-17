'use strict';
let itemCount = document.getElementById('itemCount');
let totalPrice = document.getElementById('totalPrice');
const container = document.getElementById('cards');
let offcanvas = document.getElementById('offcanvasRightBody');
let buyBtn = document.getElementById('buyBtn');
let databank = [];

if(localStorage.getItem('databank')  !== null ) {

	databank = JSON.parse(localStorage.getItem('databank'));

}

//fun for update shopingcart
function upDateitemCountAndtotalPrice(){

	//item count
	if(databank.length != 0){
		itemCount.classList.remove('invisible');
		itemCount.innerText = databank.length;
	}
	else{
		itemCount.classList.add('invisible');
	}

	//price lable
	let justInt = 0;
	databank.forEach( element => {
		justInt += element.price;
	});

	totalPrice.textContent = Math.round(justInt * 100) / 100 + '€';
}
upDateitemCountAndtotalPrice();


//function to add item to offcanvas
function addToOffCanvas(item){

	//card
	let card = document.createElement('div');
	card.classList += 'card h-100 h-100';
	card.id = 'cardOffCanvas' + item.index;

	//image
	let img = document.createElement('img');
	img.classList.add('card-img-top');
	img.alt = item.name;
	img.src = item.picture;
	card.appendChild(img);

	//card body
	let cardBody = document.createElement('div');
	cardBody.classList += 'card-body';

	//card title
	let cardTitle = document.createElement('h5');
	cardTitle.classList += 'card=title';
	cardTitle.innerText = item.name;
	cardBody.appendChild(cardTitle);
	card.appendChild(cardBody);

	//card footer
	let cardFooter = document.createElement('div');
	cardFooter.classList += 'card-footer row justify-content-evenly';
        

	//card price
	let cardPrice = document.createElement('p');
	cardPrice.innerText = '€ ' + item.price;
	cardPrice.classList += 'col ';
	cardFooter.appendChild(cardPrice);

	//card button 
	let cardBtn = document.createElement('a');
	cardBtn.classList += 'btn btn-primary col d-grid gap-2';
            
	cardBtn.id = 'cardbtn' + item.index;
	cardBtn.innerText = 'Verwijderen';
	cardFooter.appendChild(cardBtn);

	//button event listener
	cardBtn.addEventListener('click', (e) => {

		e.preventDefault();
		card.remove();
		databank.splice(databank.indexOf(item), 1);
		localStorage.setItem('databank', JSON.stringify(databank));
		upDateitemCountAndtotalPrice();
	});
        
	card.appendChild(cardFooter);

	//just small style adjustment 
	let divToALine = document.createElement('div');
	divToALine.classList += 'col mt-2';
    
	offcanvas.appendChild(divToALine);
	divToALine.appendChild(card);
}

//fun for creating cards
function cardsCreation (item){

	//card
	let card = document.createElement('div');
	card.classList += 'card h-100 h-100';
	card.id = 'card' + item.index;
    

	//image
	let img = document.createElement('img');
	img.classList.add('card-img-top');
	img.alt = item.name;
	img.src = item.picture;
	card.appendChild(img);

	//card body
	let cardBody = document.createElement('div');
	cardBody.classList += 'card-body';

	//card title
	let cardTitle = document.createElement('h5');
	cardTitle.classList += 'card=title';
	cardTitle.innerText = item.name;
	cardBody.appendChild(cardTitle);

	//card text
	let cardText = document.createElement('p');
	cardText.classList += 'card-text';
	cardText.innerText = item.about;
	cardBody.appendChild(cardText);
	card.appendChild(cardBody);

	//card footer
	let cardFooter = document.createElement('div');
	cardFooter.classList += 'card-footer container justify-content-between';

        

	//card price
	let cardPrice = document.createElement('p');
	cardPrice.innerText = '€ ' + item.price;
	cardFooter.appendChild(cardPrice);

	//card button 
	let cardBtn = document.createElement('a');
	cardBtn.classList += 'btn btn-primary';
	cardBtn.id = 'cardbtn' + item.index;
	cardBtn.innerText = 'Tovoegen';
	cardFooter.appendChild(cardBtn);

	//button event listener
	cardBtn.addEventListener('click', (e) => {

		e.preventDefault();
		databank.push(item);
		addToOffCanvas(item);
		localStorage.setItem('databank', JSON.stringify(databank));
		upDateitemCountAndtotalPrice();
                
	});
        
	card.appendChild(cardFooter);

	//just small style adjustment 
	let divToALine = document.createElement('div');
	divToALine.classList += 'col';
	container.appendChild(divToALine);
	divToALine.appendChild(card);
        
}



// buyBtn 
buyBtn.addEventListener('click', (e) =>{
	e.preventDefault();
	if(databank.length != 0){
		window.location = 'form.html';
	}
	else{
		alert('Jouw winkelwagen is leeg');
	}
    
});


// load all products  
fetch  ('./JSON/products.json').then((response) => {
	if (response.ok) {
		return response.json();
	}
})
	.then((data) => {
		data.forEach( element => {
			cardsCreation(element);
		});
	});

//add products to page and offcanvas
databank.forEach(element => {
	addToOffCanvas(element);
});