const d=document;



async function getShows(){
   const $main=d.getElementById("main"),
    $section=d.querySelector("#content");
    let page=1,
    $loader=d.querySelector("#loader-container");
    let $section2=d.querySelector("#content-search");
    $section2.style.display="none";
  
    
    
    
    
     
    let res=await  fetch(`https://api.themoviedb.org/3/tv/popular?api_key=a4e65b6f99641fe9c6618d74e26d0b8a&language=en-US&page=${page}`),
    json=await res.json();


   


    
    if(!res.ok) throw {statusText: res.statusText, status: res.status};
    for(let i=0;i<json.results.length;i++){
  
    try{

        let shows=json.results[i];
        console.log(shows);
        window.addEventListener("scroll", e=>{
            const {scrollTop,clientHeight,scrollHeight}=d.documentElement;
            if(scrollTop+clientHeight>=scrollHeight){
                page++;
                getShows();

            }
        })
        $loader.style.display="none";

        $section.innerHTML+=`
        
        <div id="cards">
          <div id="card">
        
        <figure id="movie-figure">
        <img src="https://image.tmdb.org/t/p/original${shows.backdrop_path}" alt="${shows.name}" id="movie-poster">
        <h3 id="movie-title" ><b>Título</b>: ${shows.name}</h3>
        <figcaption id="movie-figcaption"><b>Descripción: </b>${shows.overview}</figcaption>
        <small><b>Fecha:</b> ${shows.first_air_date}</small>
        </figure>
        <p> <b class="icon-star-o">Puntuación:</b> ${shows.vote_average}</p>
        <p><b>Número de votos:</b> ${shows.vote_count}</p>
        </div>
        </div>
        `;
        
    console.log(json);
       
    
      


        
       
    
          
    }catch(err){

        let message=err.statusText || "Ocurrió un error inesperado al cargar los shows";

        $section.innerHtml=`<p class="error"> ${err.status} ${message}</p>`;

    }
    }

}








async function search(){

    const $button=d.querySelector("#search-button");
   
    
    

    $button.addEventListener("click",async e=>{
        

        let $sectionSearch=d.querySelector("#content-search"),
        $input=d.querySelector("#search").value;
        $section=d.querySelector("#content"),
        $loader=d.querySelector("#loader-container");
        let pageSearch=1;
        let res= await fetch(`
        https://api.themoviedb.org/3/search/movie?api_key=a4e65b6f99641fe9c6618d74e26d0b8a&language=en-US&query=${$input}&page=${pageSearch}&include_adult=false`),
        json= await res.json();
        console.log(json);
        
       
        

        for(let i=0;i<json.results.length;i++){

        try{

            let results=json.results[i];
            console.log(results);
           
            $sectionSearch.innerHTML+=`<div id="cards">
            <div id="card">
          
          <figure id="movie-figure">
          <img src="https://image.tmdb.org/t/p/original${results.backdrop_path}" alt="${results.title}" id="movie-poster">
          <h3 id="movie-title" ><b>Título</b>: ${results.title}</h3>
          <figcaption id="movie-figcaption"><b>Descripción: </b>${results.overview}</figcaption>
          <small><b>Fecha:</b> ${results.release_date}</small>
          </figure>
          <p> <b class="icon-star-o">Puntuación:</b> ${results.vote_average}</p>
          <p><b>Número de votos:</b> ${results.vote_count}</p>
          </div>
          </div>
          `;
          $section.style.display="none";
          $sectionSearch.style.display="flex";
            window.addEventListener("scroll",e=>{

                const {scrollTop,clientHeight,scrollHeight}=d.documentElement;
                if(scrollTop+clientHeight>=scrollHeight){
                    $sectionSearch.style.display="flex";
                    pageSearch++;
                    


                }


            });
            


        }catch(err){
            let message=err.statusText || "No hay ningún resultado para esta búsqueda";

        $section.innerHtml=`<p class="error"> ${err.status} ${message}</p>`;


        }

        
    }

    });

}
async function searchPage(){

    const $button=d.querySelector("#search-button");
   
    
    

    
        

        let $sectionSearch=d.querySelector("#content-search"),
        $input=d.querySelector("#search").value;
        $section=d.querySelector("#content"),
        $loader=d.querySelector("#loader-container");
        let pageSearch=1;
        let res= await fetch(`
        https://api.themoviedb.org/3/search/movie?api_key=a4e65b6f99641fe9c6618d74e26d0b8a&language=en-US&query=${$input}&page=${pageSearch}&include_adult=false`),
        json= await res.json();
        console.log(json);
        
       
        

        for(let i=0;i<json.results.length;i++){

        try{

            let results=json.results[i];
            console.log(results);
           
            $sectionSearch.innerHTML+=`<div id="cards">
            <div id="card">
          
          <figure id="movie-figure">
          <img src="https://image.tmdb.org/t/p/original${results.backdrop_path}" alt="${results.title}" id="movie-poster">
          <h3 id="movie-title" ><b>Título</b>: ${results.title}</h3>
          <figcaption id="movie-figcaption"><b>Descripción: </b>${results.overview}</figcaption>
          <small><b>Fecha:</b> ${results.release_date}</small>
          </figure>
          <p> <b class="icon-star-o">Puntuación:</b> ${results.vote_average}</p>
          <p><b>Número de votos:</b> ${results.vote_count}</p>
          </div>
          </div>
          `;
          $section.style.display="none";
          $sectionSearch.style.display="flex";
            window.addEventListener("scroll",e=>{

                const {scrollTop,clientHeight,scrollHeight}=d.documentElement;
                if(scrollTop+clientHeight>=scrollHeight){
                    $sectionSearch.style.display="flex";
                    pageSearch++;
                    


                }


            });
            


        }catch(err){
            let message=err.statusText || "No hay ningún resultado para esta búsqueda";

        $section.innerHtml=`<p class="error"> ${err.status} ${message}</p>`;


        }

        
    }

    

}
search();

d.addEventListener("DOMContentLoaded", getShows);