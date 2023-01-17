const parametes = new URLSearchParams(window.location.search);
const recive = document.getElementById('recive');
const email = document.getElementById('email');
const name = document.getElementById('name');
const address = document.getElementById('address');
let totalPrice = 0;
let databank = [];

if(localStorage.getItem('databank')  !== null ) {

	databank = JSON.parse(localStorage.getItem('databank'));


	databank.forEach(element => {
		const item = document.createElement('p');
		item.innerText = `${element.name} : ${element.price}€`;
		totalPrice += element.price;
		recive.appendChild(item);
	});

	
	email.innerText += ` ${parametes.get('email')}`;
	name.innerText += ` ${parametes.get('firstName')} ${parametes.get('lastName')}`;
	address.innerHTML += ` ${parametes.get('city')} ${parametes.get('zipcode')} \n
                           ${parametes.get('state')}` ;
    

	const totalPriceP = document.createElement('p');
	totalPriceP.classList += 'border-top text-end';
	totalPriceP.innerHTML = Math.round(totalPrice * 100) / 100  + '€';
	recive.appendChild(totalPriceP);


	localStorage.clear();
}

else {
	recive.classList += 'visability-hidden';
	document.getElementById('header').innerText = '404 ticket niet gevonden ';
}