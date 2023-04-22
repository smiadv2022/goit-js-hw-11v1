import axios from 'axios';

const API_KEY = '35413262-7ae9db1d2d6405a91836db282';
const URL = 'https://pixabay.com/api';
const searchQuery ="cat";
const page =1;
const options = {
  headers: {
    Authorization: API_KEY,
  },
};


async getImages(searchQuery,page) {
  try{
     const { data } = await axios.get(
    `${URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );

  // this.incrementPage();
  return data;
  }catch (error) {
    console.error(error);
  }
 
}

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