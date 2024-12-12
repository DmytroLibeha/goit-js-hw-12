export default getPictures;
import axios from 'axios';

async function getPictures(tag, page) {
  const API_URL = 'https://pixabay.com/api/';
  const API_KEY = '47395064-b7fd47e3542f1aea6492dfd3a';
  return await axios.get(
    `${API_URL}/?image_type=photo&orientation=horizontal&safesearch=true&key=${API_KEY}`,
    {
      params: {
        q: tag,
        page,
        per_page: 15,
      },
    }
  );
}
