import axios from 'axios';

const API_KEY = '35628510-01ea92234f245f2047fa1b595';
const URL = 'https://pixabay.com/api';
const searchQuery ="cat";
const page =1;
const options = {
  headers: {
    Authorization: API_KEY,
  },
};


export default class NewApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }
  async getImages() {
    try {
      const { data } = await axios.get(
        `${URL}/?key=${API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
      );

      this.incrementPage();
      console.log('data', data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  resetPage(){
    this.page=1;
  }
  incrementPage() {
       this.page += 1;
  }
}


// async getImages(searchQuery,page) {
//   try{
//      const { data } = await axios.get(
//     `${URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//   );

//   // this.incrementPage();
//   return data;
//   }catch (error) {
//     console.error(error);
//   }
 
// }

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