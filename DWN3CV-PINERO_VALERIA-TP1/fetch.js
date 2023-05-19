const APIKEY = "0e76de788f0a469ba510d6cbb2659535";
const APITOMTOM = "EiRRpHwinakPOJU4omRnjiEgpLQKGiyr";


const inputElement = document.getElementById('inputBusqueda');
const buttonSearch = document.getElementById('buscar');
const inputBusqueda = document.getElementById('inputBusqueda');
const imagen = document.getElementById('imagen');
const resultElement = document.getElementById('resultado');
const mapa = document.getElementById('mapita');

inputBusqueda.addEventListener('keydown', function (event) {
  if (event.keyCode !== 13) return
	
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputElement.value}&appid=${APIKEY}&units=metric&lang=sp`)
	.then((response) => {
		if(response.ok){ //chequeo status
			return response.json(); // retorno al siguiente then el response como json
		}else{
		document.querySelector(".error").style.display = "block";
		}
	})
	
	.then(json => {
        console.log('json crudo:', json);   
   
   //Oculto el mensaje de error
   document.querySelector(".error").style.display = "none";

  
   // Creo el div con los datos del clima de la ciudad consultada.
   
   const card = document.createElement("div");
	
 // Le incerto los datos y el HTML
   resultElement.innerHTML = '<div class="card-body" style="color: #4B515D; border-radius: 35px;"><h2 class="flex-grow-1"> Tiempo Actual</h2>' + '<div class="d-flex flex-column text-center mt-5 mb-4"><h2 id="name" class="flex-grow-1">'+ json.name + '</h2>'+ '<h2 id="temp" class="display-4 mb-0 font-weight-bold" style="color: #1C2331;">' + Math.round(json.main.temp) + ' °c </h2><span id="minmax" class="small" style="color: #023047"> Min ' + Math.round(json.main.temp_min) + '°c | Max ' + Math.round(json.main.temp_max) + '°c </span></div><div class="d-flex align-items-center"><div class="flex-grow-1" style="font-size: 1rem;"><div><i id="viento" class="fas fa-wind fa-fw"></i> <span class="ms-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16"><path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/></svg> Viento: ' + Math.round(json.wind.speed) + 'km/h</span></div><div><i id="humedad" class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"/></svg> Humedad: ' + Math.round(json.main.humidity) + '%</span></div><div><i id="presion" class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span class="ms-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16"><path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/><path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/></svg> Presión: ' + json.main.pressure +'</span></div><div><i id="st" class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span class="ms-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer" viewBox="0 0 16 16"><path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0zM6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15V2.5z"/></svg>Sensación termica ' + Math.round(json.main.feels_like) +' °c</span></div></div></div><div class="d-flex flex-row-reverse"><div> <img src="imgs/weather/cloudy.png" class="imgclima rounded float-right" width="100px"><p id="descripcion" class=" small font-weight-light text-right"></p></div></div></div></div>';
	
	
	// Incerto el div en el HTML
  //resultElement.appendChild(card);
 const imgclima = document.querySelector(".imgclima"); // Traigo la etiqueta img
 const cardbody = document.querySelector(".card-body"); // Triago el card-body que imprime los resultados para insertarle la imagen con el if.
 const descripcion = document.getElementById('descripcion');

	// chequeo Cuál es el clima para insertar la imagen, el css y la descripción.
	if(json.weather[0].main == "Clouds"){
		imgclima.src = "imgs/weather/cloudy.png"; // Inserta la imagen según el clima
		descripcion.innerHTML = json.weather[0].description; // Trae la descripción del clima
		cardbody.classList.add("bgcloud"); // Cambia el css del fondo
	}else if(json.weather[0].main == "Clear"){
		imgclima.src = "imgs/weather/clear.png";
		descripcion.innerHTML = json.weather[0].description; 
		cardbody.classList.add("bgclear");
		
	}else if(json.weather[0].main == "Humidty"){
		imgclima.src = "imgs/weather/humidity.png";
		descripcion.innerHTML = json.weather[0].description; 
		cardbody.classList.add("bghumidity");
		
	}else if(json.weather[0].main == "Fog"){
		imgclima.src = "imgs/weather/Fog.png";
		descripcion.innerHTML = json.weather[0].description; 
		cardbody.classList.add("bgfog");
		
	}else if(json.weather[0].main == "Snow"){
		imgclima.src = "imgs/weather/snow.png";
		descripcion.innerHTML = json.weather[0].description; 
		cardbody.classList.add("bgsnow");
		
	}else if(json.weather[0].main == "Sun"){
		imgclima.src = "imgs/weather/sun.png";
		descripcion.innerHTML = json.weather[0].description; 
		cardbody.classList.add("bgsun");
		
	}else if(json.weather[0].main == "Rain"){
		imgclima.src = "imgs/weather/rain.png";
		descripcion.innerHTML = json.weather[0].description; 
		cardbody.classList.add("bgrain");
		
	}else if(json.weather[0].main == "Wind"){
		imgclima.src = "imgs/weather/wind.png";
		descripcion.innerHTML = json.weather[0].description; 
		cardbody.classList.add("bgwind");
		
	}else if(json.weather[0].main == "Drizzle"){
		imgclima.src = "imgs/weather/drizzle.png";
		descripcion.innerHTML = json.weather[0].description; 
		cardbody.classList.add("bgdrizzle");

	}else if(json.weather[0].main == "Mist"){
		imgclima.src = "imgs/weather/mist.png";
		descripcion.innerHTML = json.weather[0].description; 
		cardbody.classList.add("bgmist");
	}
 
 // traigo la imagen del mapa
	let center =  json.coord;
	let response =  `https://api.tomtom.com/map/1/staticimage?key=${APITOMTOM}&zoom=10&center=${center.lon},${center.lat}&format=jpg&layer=basic&style=main&width=512&height=512&view=Unified&language=es-MX`;
 
	 mapita = `<div class="card text-center">
					<img src="${response}" class="img-fluid" alt="video del clima"/>
				</div>`;
	 mapa.innerHTML = mapita;
	 
 
 
  })
	
.catch(err=>{
	console.log(`Hubo un error: ${err}`);
		document.querySelector(".error").style.display = "block"; 
	})
    .finally(final=>{
        // borra el loading
        console.log('ejecuto el finally');
    });
	 
});
