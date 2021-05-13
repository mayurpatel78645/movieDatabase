//call API request data
//parse data w/ .json()
//return data

//capture input from html form
//append user input to api call
//parse resposne
//insert into dom or render page


const movieList = document.querySelector('.movies')
const search = document.querySelector('.search')


//input from event listerner

const dataRequest = async (url) => {
  const request = await fetch(url)
  const responseData = await request.json()

  return responseData
}

const render = (data) => {
  console.log(data.Search)
  movieList.innerHTML = ''
  data.Search.forEach((movie) => {
    movieList.insertAdjacentHTML('beforeend', `
    <li data-id=${movie.imdbID}>
    <div class = 'overlay'>
    <img class='image' src='${movie.Poster === 'N/A' ? movie.Poster = '/images/default_image.jpg' : movie.Poster}'></img>
    
    </div>
    </li>
    `
    )
}
)
}

const renderHover =  (data) => {
  console.log(data)
  const overlay = document.querySelectorAll('.overlay')
  overlay.innerHTML = ''
  overlay.forEach(ele => {
    
    ele.insertAdjacentHTML('beforeend', `
    <p>${data.Title}</p>
    <p>${data.Plot}</p>
    <p>${data.imdbRating}</p>
    
    `
    )

  })
  
  
  
  


}


function handleEvent(e) {
  
  if(e.target.nodeName === 'FORM') {
    
    e.preventDefault()
    console.log('event happened')
    const url = `http://www.omdbapi.com/?apikey=89a15f2d&s=${e.target.firstElementChild.value}`
    dataRequest(url)
    .then((responseData) => {
    render(responseData)
    e.target.firstElementChild.value = ''
    const image = document.querySelectorAll('.image')
    image.forEach(ele => {
      ele.addEventListener('mouseenter', handleHover)
    })
    

  })
    

  } 
} 

function handleHover(e) {
  //console.log(e.target)
  const id = e.target.parentElement.parentElement.dataset.id;
  const url = `http://www.omdbapi.com/?apikey=89a15f2d&i=${id}`;
  dataRequest(url)
  .then(data => {
    console.log(data.Title, data.imdbRating, data.Plot)
  renderHover(data)

  }
    ) ;
  

 }




search.addEventListener('submit', handleEvent);