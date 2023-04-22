import axios from 'axios';


const refs = {
  buttonSearch: document.querySelector('.search'),
  searchIcon: document.querySelector('.icon-search'),
  spinnerIcon: document.querySelector('.icon-spinner'),
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const API_KEY = '35413262-7ae9db1d2d6405a91836db282';
const URL = 'https://pixabay.com/api';
const searchQuery ="cat";
const page =1;
const options = {
  headers: {
    Authorization: API_KEY,
  },
};


async function getImages(searchQuery,page) {
  try{
     const {data}  = await axios.get(
    `${URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );

  // this.incrementPage();
  console.log (data);
  return data;

  }catch (error) {
    console.error(error);
  }
 
}
getImages(searchQuery,page);
// incrementPage() {
//   this.page += 1;
// }
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }