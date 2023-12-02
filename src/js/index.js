import axios from "axios";
import Notiflix from "notiflix";
import "simplelightbox/dist/simple-lightbox.min.css"

import { createMarkup } from "./markup";

const refs = {
    form: document.querySelector("#search-form"),
    searchBtn: document.querySelector(".js-search"),
    gallery: document.querySelector(".js-gellary"),
    loadMoreBtn: document.querySelector(".js-load-more")
}


refs.form.addEventListener("submit", onSubmit);
async function onSubmit(event){
    event.preventDefault();

    const input = refs.form.elements[0];
    const inputData = input.value.trim();

    try {
        const searchData = await serviceSearch(inputData);
        console.log(searchData);
        const array= searchData.hits

        if(searchData.totalHits === 0){
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            const totalImg = searchData.total
            Notiflix.Notify.success(`Hooray! We found ${totalImg} images`);
        }

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

    const {data} = await axios.get(`${BASE_URL}/?key=${API_KEY}&per_page=40&q=${requestData}`);
    return data;    
};
