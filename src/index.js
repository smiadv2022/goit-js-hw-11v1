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
  searchIcon: document.querySelector('.icon-search'),
  spinnerIcon: document.querySelector('.icon-spinner'),
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  buttonLoadMore: document.querySelector('.load-more'),
};
loadMoreBtn.button.addEventListener("click",fetchImages);
refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onImgFocus);
// refs.buttonLoadMore.addEventListener('click', onLoadMore);
// hideLoadMore();
const API_KEY = '35628510-01ea92234f245f2047fa1b595';

const URL = 'https://pixabay.com/api';

const page = 1;
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

// async function getImages1(search, page) {
//   try {
//     const { data } = await axios.get(
//       `${URL}/?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//     );

//     // this.incrementPage();
//     console.log('data', data);
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

function onSearch(event) {
  event.preventDefault();
loadMoreBtn.show();
  const form = event.currentTarget;
  const newSearchQuery = event.currentTarget.elements.searchQuery.value.trim();
  newApiService.query = newSearchQuery;

  console.log('txt', page, newSearchQuery);
  // const dataSearch = newApiService.getImages()
  //   .then(({ hits, totalHits }) => {
  //     console.log(hits, totalHits);
  //     console.log(hits.length);
  //     if (hits.length === 0) {
  //       throw new Error('no data');
  //       Notiflix.Notify.info(
  //         'Sorry, there are no images matching your search query. Please try again.'
  //       );
  //       updateGallary("");
  //     }
  //     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  //     const markup = hits.reduce(
  //       (markup, hit) => markup + createMarkup(hit),
  //       ''
  //     );
  //     updateGallary(markup);
  //     // showLoadMore();
  //     // console.log('mark', markup);
  //   })
 fetchImages()
    .finally(() => form.reset());
  // console.log('search', dataSearch);
}

function onError(err) {
  console.log(err);
  // updateGallary("<p> Sorry, there are no images </p>");
  Notiflix.Notify.info(
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
  refs.gallery.innerHTML = markup;
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
// function totalSearchImages() {
//   getImages().then(({ totalHits }) => {
//     return Notify.success(`Hooray! We found ${totalHits} images.`);
//   });
// }
// function hideLoadMore() {
//   refs.buttonLoadMore.classList.add('hidden');
// }

// function showLoadMore() {
//   refs.buttonLoadMore.classList.remove('hidden');
// }
// function onLoadMore (page) {
//   return page+=1;

// }
function fetchImages(){
  return getImagesMarkup().then((markup)=>{updateGallary(markup);})
 
}
function getImagesMarkup (){
  return newApiService.getImages()
    .then(({ hits, totalHits }) => {
      
      if (hits.length === 0) {
        throw new Error('no data');
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        updateGallary("");
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      return  hits.reduce(
        (markup, hit) => markup + createMarkup(hit),
        ''
      );
      // updateGallary(markup);
      // showLoadMore();
      // console.log('mark', markup);
    });
 
}