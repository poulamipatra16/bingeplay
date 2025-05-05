import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjBkYWU2M2Y2MjUzMTFiZDg1OWE4ZGZjYzllNDlmNSIsIm5iZiI6MTc0NjM2NDI3NC41NzEsInN1YiI6IjY4MTc2NzcyNzcxOWUzYjk1YjU3NmRmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yvUzFkL5zUBtUF2kdmAKN713oS9vyFf652-vXDIxxP0'
      }
})

export default instance;