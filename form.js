let listProducts = document.getElementById('listProducts');
let total = document.getElementById('total');
listProducts.style.maxHeight = '300px';
listProducts.style.minHeight = '300px';

let databank = JSON.parse(localStorage.getItem('databank'));
let totalInt = 0;

const form = document.getElementById('form');

databank.forEach ( element => {
	let li = document.createElement('li');
	li.innerText = `${element.name} : ${element.price}€`;
	li.classList = 'list-group-item';
	listProducts.appendChild(li);
	totalInt += element.price; 
});

total.innerText = 'Total: ' + Math.round(totalInt * 100) / 100 +'€';

function usp(){

	const usp = new URLSearchParams({
		firstName : document.getElementById('firstname').value.toString(),
		lastName : document.getElementById('lastname').value.toString(),
		email : document.getElementById('email').value.toString(),
		city : document.getElementById('city').value.toString(),
		state : document.getElementById('state').value.toString(),
		zipcode : document.getElementById('zipcode').value.toString()
	});

	return usp;
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	window.location = `recive.html?${usp().toString()}`;
});



function onSubmit() {
	
	window.location = `recive.html?${usp().toString()}`;
  }

  window.onSubmit = onSubmit;
