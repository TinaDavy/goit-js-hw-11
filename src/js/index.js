import axios from "axios";

const refs = {
    form: document.querySelector("#search-form"),
    searchBtn: document.querySelector(".js-search"),
    gallery: document.querySelector(".js-gellary"),
    loadMoreBtn: document.querySelector(".js-load-more")
}

// console.log(refs.form)
// console.log(refs.searchBtn)
// console.log(refs.gallery)
// console.log(refs.loadMoreBtn)


refs.form.addEventListener("submit", onSubmit);
async function onSubmit(event){
    event.preventDefault();

    const input = refs.form.elements[0];
    const inputData = input.value.trim();

    try {
        const searchData = await serviceSearch(inputData);
        console.log(searchData);
    
        const array= searchData.hits
        console.log(array);
        refs.gallery.innerHTML = createMarkup(array);
    }
    catch (err){
        console.error(err);
    }

}

async function serviceSearch(requestData){
    const BASE_URL = "https://pixabay.com/api";
    const API_KEY = "41011803-a96263b547d952e0549f5a687"

    const {data} = await axios.get(`${BASE_URL}/?key=${API_KEY}&q=${requestData}`);
    return data;    
};

function createMarkup(arr){
    const markup = arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>`
    });

    return markup.join('');
}