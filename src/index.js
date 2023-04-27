import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import LoadMoreBtn from './js/LoadMoreBtn.js';
import NewApiService from './js/api.js';

const newApiService = new NewApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

console.log (loadMoreBtn.button.disabled);

const refs = {
  buttonSearch: document.querySelector('.search'),

  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),

};
loadMoreBtn.button.addEventListener("click",fetchImages);
refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onImgFocus);

const API_KEY = '35628510-01ea92234f245f2047fa1b595';

const URL = 'https://pixabay.com/api';
const currentHit =0;
const page = 1;
const options = {
  headers: {
    Authorization: API_KEY,
  },
};



function onSearch(event) {
  event.preventDefault();
loadMoreBtn.show();
  const form = event.currentTarget;
  const newSearchQuery = event.currentTarget.elements.searchQuery.value.trim();
  newApiService.query = newSearchQuery;
  newApiService.blok = 0;
  console.log('txt', page, newSearchQuery);
  
  newApiService.resetPage();
  // newApiService.resetBlok();
  clearGallary();
 fetchImages()
    .finally(() => form.reset());
  // console.log('search', dataSearch);
}

function onError(err) {
  console.log(err);
  clearGallary();
  updateGallary("<p> Sorry, there are no images </p>");
  loadMoreBtn.hide();
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function createMarkup({
  largeImageURL,
  tags,
  webformatURL,
  likes,
  views,
  comments,
  downloads,
}) {
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
function updateGallary(markup) {
  // refs.gallery.innerHTML = markup;
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
function clearGallary(){
    refs.gallery.innerHTML = "";
}
const gallery = new SimpleLightbox('.gallery a');

refs.gallery.addEventListener('click', onImgFocus);

function onImgFocus(event) {
  event.preventDefault();

  let gallery = new SimpleLightbox('.gallery a', { captionDelay: 250 });
  gallery.on('show.simplelightbox');

  if (event.target.nodeName !== 'IMG') {
    return;
  }
}

function fetchImages(){
  loadMoreBtn.disable();
  return getImagesMarkup().then((markup)=>{updateGallary(markup);
    loadMoreBtn.enable();
  }).catch(onError);
 
}
function getImagesMarkup (){
  return newApiService.getImages()
    .then(({ hits, totalHits, total}) => {
      
      if (hits.length === 0) {
        throw new Error('no data');
        // Notiflix.Notify.warning(
        //   'Sorry, there are no images matching your search query. Please try again.'
        // );
        updateGallary("");
      }
      // currentHit=Number(hits.length);
      newApiService.blok=newApiService.blok+hits.length;
      console.log("bbb",newApiService.blok);
      if (newApiService.blok<total){
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images. Opened: ${newApiService.blok }`);
       
      } else  Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
      return  hits.reduce(
        (markup, hit) => markup + createMarkup(hit),
        ''
      );
      // newApiService.blok=40;
      // console.log("bbb",newApiService.blok)
    }
    )
 
}
// function handleScroll(){
//   const {scrollTop, scrollHeight, clientHeight} =document.documentElement;
//   if (scrollHeight-clientHeight<=scrollTop+5){
//     fetchImages();
//     console.log("11111111top:",scrollTop, " height:", scrollHeight, " cl:",clientHeight,"--",scrollHeight+scrollTop );
//   }
//   console.log("top:",scrollTop, " height:", scrollHeight, " cl:",clientHeight,"-++",scrollHeight-clientHeight,);
// }
// window.addEventListener("scroll", handleScroll);