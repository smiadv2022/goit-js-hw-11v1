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

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onImgFocus);

const API_KEY = '35628510-01ea92234f245f2047fa1b595';
                 

const URL = 'https://pixabay.com/api';

const page =1;
const options = {
  headers: {
    Authorization: API_KEY,
  },
};


async function getImages(search,page) {
  try{
     const {data}  = await axios.get(
    `${URL}/?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );

  // this.incrementPage();
  console.log ("data",data);
  return data;

  }catch (error) {
    console.error(error);
  }
 
}

function onSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const newSearchQuery = event.currentTarget.elements.searchQuery.value.trim();

  console.log('txt', page, newSearchQuery);
  const dataSearch = getImages(newSearchQuery, page)
    .then(({ hits }) => {
      console.log(hits);
      console.log(hits.length);
      if (hits.length === 0) {
        throw new Error('no data');
      }

      const markup = hits.reduce((markup, hit)=> markup+createMarkup(hit),"");
     updateGallary(markup);
      console.log("mark", markup)
    })
    .catch(onError)
    .finally(() => form.reset());
  console.log('search', dataSearch);
  
}

function onError(err) {
  console.log(err);
}
function createMarkup1(hit){
  console.log(hit);
}
function createMarkup({ largeImageURL, tags, webformatURL, likes, views, comments, downloads }) {
  return `
   <div class='photo__card'>
    <a href='${largeImageURL}' alt='${tags}' class='photo__link'>
     <img src='${webformatURL}' alt='${tags}' loading='lazy' class='photo__image' />
    </a>
    
        <div class='info overlay'>
      <p class='info-item'>
        <b>Likes</b>${likes}
      </p>
      <p class='info-item'>
        <b>Views</b>${views}
      </p>
      <p class='info-item'>
        <b>Comments</b>${comments}
      </p>
      <p class='info-item'>
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>`;
}
function  updateGallary (markup) {
  refs.gallery.innerHTML = markup;
}
const gallery = new SimpleLightbox('.gallery a');

refs.gallery.addEventListener('click', onImgFocus);

function onImgFocus(event) {
  event.preventDefault();

  let gallery = new SimpleLightbox('.gallery a',{captionDelay:250});
  gallery.on('show.simplelightbox');

  if (event.target.nodeName !== 'IMG') {
    return;
  }
}
function totalSearchImages() {
  getImages().then(({ totalHits }) => {
    return Notify.success(`Hooray! We found ${totalHits} images.`);
  });
}