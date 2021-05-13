const movieList = document.querySelector('.movies');
const search = document.querySelector('.search');

const dataRequest = async (url) => {
  const request = await fetch(url);
  const responseData = await request.json();
  return responseData;
}

const render = (data) => {
  movieList.innerHTML = '';
  data.Search.forEach((movie) => {
    movieList.insertAdjacentHTML('beforeend', `
    <li data-id=${movie.imdbID}>
    <div class = 'overlay'>
    <img class='image' src='${movie.Poster === 'N/A' ? movie.Poster = '/images/default_image.jpg' : movie.Poster}'></img>
    </div>
    </li>
    `)}
  );
}

const renderHover =  (data) => {
  const overlay = document.querySelectorAll('.overlay');
  overlay.innerHTML = "";
    overlay.forEach(element => {
      element.insertAdjacentHTML('beforeend', `
      <p>
        <strong>${data.Title}</strong><br>
        <em><strong>plot:</strong> ${data.Plot}</em><br>
        <strong>imdb rating: ${data.imdbRating}</strong><br>
      </p>
      `);
  });
}

function handleEvent(e) {
  if(e.target.nodeName === 'FORM') {
    e.preventDefault();
    const url = `http://www.omdbapi.com/?apikey=89a15f2d&s=${e.target.firstElementChild.value}`
    dataRequest(url)
    .then((responseData) => {
    render(responseData);
    e.target.firstElementChild.value = '';
  })
  .then(() => {
    const image = document.querySelectorAll('.image');
    image.forEach(ele => {
      ele.addEventListener('mouseenter', handleHover);
    });
  })
  } 
} 

function handleHover(e) {
  const id = e.target.parentElement.parentElement.dataset.id;
  const url = `http://www.omdbapi.com/?apikey=89a15f2d&i=${id}`;
  dataRequest(url)
  .then(data => {
    renderHover(data);
  });
}

search.addEventListener('submit', handleEvent);