import axios from 'axios';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
  buttonSearch: document.querySelector('.search'),
  searchIcon: document.querySelector('.icon-search'),
  spinnerIcon: document.querySelector('.icon-spinner'),
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.buttonSearch.addEventListener('submit', onSearch);

const API_KEY = '35628510-01ea92234f245f2047fa1b595З';
// const API_KEY = '35413262-7ae9db1d2d6405a91836db282';
// 35628510-01ea92234f245f2047fa1b595З
const URL = 'https://pixabay.com/api';
// const searchQuery ="cat";
const page =1;
const options = {
  headers: {
    Authorization: API_KEY,
  },
};


// async function getImages(search,page) {
//   try{
//      const {data}  = await axios.get(
//     `${URL}/?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//   );

//   // this.incrementPage();
//   console.log ("data",data);
//   return data;

//   }catch (error) {
//     console.error(error);
//   }
 
// }

function onSearch(event) {
  event.preventDefault();

  const newSearchQuery = event.currentTarget.elements.searchQuery.value.trim();

  console.log ("txt",  newSearchQuery );

}

