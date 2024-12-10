import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getPictures from './js/pixabay-api';
import createMarkup from './js/render-functions';

const litebox = new SimpleLightbox('.list-js a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionClass: 'imageTitle',
});
const form = document.querySelector('.form-js');
const list = document.querySelector('.list-js');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.js-load-btn');

form.addEventListener('submit', toSabmit);
loadBtn.addEventListener('click', onLoadMore);
let page = 1;
let totalPage = 1;

function toSabmit(evt) {
  evt.preventDefault();

  const { picture } = evt.target.elements;
  const value = picture.value.trim();

  list.innerHTML = '';
  if (!value || value === ' ') {
    {
      iziToast.show({
        title: ':(',
        message: 'Please add request!',
        position: 'center',
      });
      list.innerHTML = ':(';
      return;
    }
  }

  page = 1;

  loader.classList.remove('hidden');
  loadBtn.classList.replace('more-btn', 'hidden');
  getPictures(value, page)
    .then(({ data: { hits, totalHits } }) => {
      totalPage = Math.ceil(totalHits / hits.length);
      console.log(page);

      if (!hits.length) {
        iziToast.show({
          title: 'No Results',
          message: 'Please enter a valid search query!',
          position: 'center',
        });
      } else {
        list.innerHTML = createMarkup(hits);
        litebox.refresh();
        if (page >= totalPage) {
          loadBtn.classList.replace('more-btn', 'hidden');
        }
        loadBtn.classList.replace('hidden', 'more-btn');
      }
    })
    .catch(error => {
      console.log(error.message);
      iziToast.show({
        title: 'Error',
        message: `Something went wrong: ${error.message}. Please try again later.`,
        position: 'center',
      });
    })
    .finally(() => {
      picture.value = '';
      loader.classList.add('hidden');
    });
}
async function onLoadMore() {
  page += 1;

  loadBtn.disabled = true;
  try {
    const {
      data: { hits, totalHits },
    } = await getPictures(page);

    list.insertAdjacentHTML('beforeend', createMarkup(hits));
    totalPage = Math.ceil(totalHits / hits.length);

    if (page >= totalPage || !totalHits) {
      loadBtn.classList.replace('more-btn', 'hidden');
      iziToast.show({
        title: 'X',
        message: 'Sorry, there are no more images matching your request.',
        position: 'center',
      });
    }
    const item = document.querySelector('.list-item');
    const itemHeight = item.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: itemHeight * 2.5,
      behavior: 'smooth',
    });
    litebox.refresh();
  } catch (error) {
    console.log(error.message);
    iziToast.show({
      title: 'Error',
      message: `Something went wrong: ${error.message}. Please try again later.`,
      position: 'center',
    });
  } finally {
    loadBtn.disabled = false;
  }
}
