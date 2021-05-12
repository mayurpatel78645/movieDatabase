//call API request data
//parse data w/ .json()
//return data

//capture input from html form
//append user input to api call
//parse resposne
//insert into dom or render page

const url = 'http://www.omdbapi.com/?apikey=89a15f2d&s=transformers' //change later to receive
const movieList = document.querySelector('.movies')

//input from event listerner

const dataRequest = async (url) => {
  const request = await fetch(url)
  const responseData = await request.json()

  return responseData.Search
}

dataRequest(url)
.then((responseData) => {
  render(responseData)
})


const render = (data) => {

  data.forEach((movie) => {

    movieList.insertAdjacentHTML('beforeend', `
    <li>
    <img src='${movie.Poster}'></img>
    </li>
    `)

})
  
}


