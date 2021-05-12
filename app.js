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

  return responseData.Search
}




const render = (data) => {
  console.log(movieList.innerHTML)
  movieList.innerHTML = ''
  data.forEach((movie) => {

    movieList.insertAdjacentHTML('beforeend', `
    <li>
    <img src='${movie.Poster === 'N/A' ? movie.Poster = '/images/default_image.jpg' : movie.Poster}'></img>
    </li>
    `)

})
console.log(movieList.innerHTML)
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
  })
        
  } 
} 

search.addEventListener('submit', handleEvent)

