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
let currentSearch = '';

function toSabmit(evt) {
  evt.preventDefault();

  const { picture } = evt.target.elements;
  currentSearch = picture.value.trim();

  list.innerHTML = '';
  if (!currentSearch) {
    {
      iziToast.show({
        title: 'Error',
        message: 'Please add request!',
        position: 'center',
      });
      return;
    }
  }

  page = 1;

  loader.classList.remove('hidden');
  loadBtn.classList.replace('more-btn', 'hidden');
  getPictures(currentSearch, page)
    .then(({ data: { hits, totalHits } }) => {
      totalPage = Math.ceil(totalHits / 15);

      if (!hits.length) {
        iziToast.show({
          title: 'No Results',
          message: 'Please enter a valid search query!',
          position: 'center',
        });
        return;
      }
      list.innerHTML = createMarkup(hits);
      litebox.refresh();
      if (totalPage === 1) {
        iziToast.show({
          title: 'End of Results',
          message: 'No more images found for your query.',
          position: 'center',
        });
        loadBtn.classList.replace('more-btn', 'hidden');
      } else {
        loadBtn.classList.replace('hidden', 'more-btn');
      }
    })
    .catch(error => {
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
  loader.classList.remove('hidden');
  try {
    const {
      data: { hits, totalHits },
    } = await getPictures(currentSearch, page);

    list.insertAdjacentHTML('beforeend', createMarkup(hits));
    litebox.refresh();

    if (page >= totalPage || !totalHits) {
      loadBtn.classList.replace('more-btn', 'hidden');
      iziToast.show({
        title: 'End of results',
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
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: `Something went wrong: ${error.message}. Please try again later.`,
      position: 'center',
    });
  } finally {
    loader.classList.add('hidden');
    loadBtn.disabled = false;
  }
}
