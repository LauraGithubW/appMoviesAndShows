const d = document;

//Creamos una función asíncrona que consulte películas en la API de https://developers.themoviedb.org/ y nos las  devuelva

async function getList() {
  //Guardamos en constantes y variables los elementos del Dom en los que vamos a inyectar el contenido de la API
  const $main = d.getElementById("main"),
    $section = d.querySelector("#content");
  let page = 1,
    $loader = d.querySelector("#loader-container");
  let $section2 = d.querySelector("#content-search");
  //En la sección que hemos creado para mostrar la info cuando busquemos una película le aplicamos el estilo display none para ocultarlo de momento
  $section2.style.display = "none";

  //HAcemos la petición al endpoint de las películas y la convertimos a json
  let res = await fetch(
      `https://api.themoviedb.org/4/list/1?page=${page}&api_key=a4e65b6f99641fe9c6618d74e26d0b8a`
    ),
    json = await res.json();
  //Aquí añadimos en el evento scroll de la ventana del navegador para que cuando se acabe la primera página de películas cargue la segunda
  //De esta manera conseguimos un scroll infinito
  window.addEventListener("scroll", (e) => {
    const { scrollTop, clientHeight, scrollHeight } = d.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      page++;

      getList();
    }
  });

  //console.log(json);
  //Aquí si no obtenemos la respuesta pasamos la ejecución al catch
  if (!res.ok) throw { statusText: res.statusText, status: res.status };
  //Creamos un bucle for para recorrer los recultados y poder imprimirlos en el documento html
  for (let i = 0; i <= json.results.length; i++) {
    try {
      //console.log(json.results[i]);
      let movies = json.results[i];

      //Ocultamos el icono de cargando... cuando se hayan cargado las películas
      $loader.style.display = "none";
      //Añadimos el contenido a la sección

      $section.innerHTML += `
      <div class="cards">
        <div class="card">
      
      <figure class="movie-figure">
      <img src="https://image.tmdb.org/t/p/original${
        movies.poster_path
      }" alt="${movies.title}" class="movie-poster">
      <h3 class="movie-title" ><b>Título</b>: ${movies.title}</h3>
      <figcaption id="${movies.title.substring(
        10,
        13
      )}" class="movie-figcaption"><b>Descripción: </b>${movies.overview}
     
      
      
      
      </figcaption>
      
      <small><b>Fecha:</b> ${movies.release_date}</small>
      </figure>
      <p> <b class="icon-star-o">Puntuación:</b> ${movies.vote_average}</p>
      <p><b>Número de votos:</b> ${movies.vote_count}</p>
      </div>
      </div>
      `;

      //Creamos un mensaje personalizado de error
    } catch (err) {
      let message =
        err.statusText || "Ocurrió un error inesperado al cargar las películas";

      $section.innerHtml = `<p class="error"> ${err.status} ${message}</p>`;
    } finally {
    }
  }
}

//Cargamos la función que obtiene las películas en la carga del documento

d.addEventListener("DOMContentLoaded", getList);

//Creamos una función asíncrona para el buscador que hemos creado
async function search() {
  //Seleccionamos el botón de buscar y le añadimos el evento click

  const $button = d.querySelector("#search-button"),
    //Seleccionamos el valor que introduzcamos en el input del buscador
    $input = d.querySelector("#search").value;

  $button.addEventListener("click", async (e) => {
    //Seleccionamos elementos del dom que nos interesen

    let $sectionSearch = d.querySelector("#content-search"),
      $input = d.querySelector("#search").value;
    ($section = d.querySelector("#content")),
      ($loader = d.querySelector("#loader-container"));
    let pageSearch = 1;

    //Realizamos la petición al endpoint correcto
    let res = await fetch(`
        https://api.themoviedb.org/3/search/movie?api_key=a4e65b6f99641fe9c6618d74e26d0b8a&language=en-US&query=${$input}&page=${pageSearch}&include_adult=false`),
      json = await res.json();
    if (!res.ok) throw { statusText: res.statusText, status: res.status };
    //console.log(json);

    //Volvemos a crear un bucle for para recorrer los resultados que aparecen y los imprimimos en la sección de búsqueda
    for (let i = 0; i < json.results.length; i++) {
      try {
        let results = json.results[i];
        // console.log(results);

        $sectionSearch.innerHTML += `<div class="cards">
            <div class="card">
          
          <figure class="movie-figure">
          <img src="https://image.tmdb.org/t/p/original${results.backdrop_path}" alt="${results.title}" class="movie-poster">
          <h3 class="movie-title" ><b>Título</b>: ${results.title}</h3>
          <figcaption class="movie-figcaption"><b>Descripción: </b>${results.overview}</figcaption>
          <small><b>Fecha:</b> ${results.release_date}</small>
          </figure>
          <p> <b class="icon-star-o">Puntuación:</b> ${results.vote_average}</p>
          <p><b>Número de votos:</b> ${results.vote_count}</p>
          </div>
          </div>
          `;
        //Ocultamos la sección principal para que podamos mostrar bien la sección de búsqueda
        $section.style.display = "none";
        $sectionSearch.style.display = "flex";
        //Creamos el scroll infinito
        window.addEventListener("scroll", (e) => {
          const { scrollTop, clientHeight, scrollHeight } = d.documentElement;
          if (scrollTop + clientHeight >= scrollHeight) {
            $sectionSearch.style.display = "flex";
            pageSearch++;
          }
        });

        //Vamos al catch si surge algún error
      } catch (err) {
        let message =
          err.statusText || "No hay ningún resultado para esta búsqueda";

        $section.innerHtml = `<p class="error"> ${err.status} ${message}</p>`;
      }
    }
  });
}
//Invocamos la función
search();
