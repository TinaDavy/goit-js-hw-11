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

let page = 1;
const input = refs.form.elements[0];


refs.form.addEventListener("submit", onSubmit);
async function onSubmit(event){
    event.preventDefault();

    const inputData = input.value.trim();

    try {
        const searchData = await serviceSearch(inputData, page);
        console.log(searchData);
        const array= searchData.hits
        const totalImg = searchData.total

        if(searchData.totalHits === 0){
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            Notiflix.Notify.success(`Hooray! We found ${totalImg} images`);
        }

        console.log(array);
        refs.gallery.innerHTML = createMarkup(array);

        totalpages = totalImg / 40;
        console.log(totalpages)

        if(page >= 1 && page < totalpages) {
            refs.loadMoreBtn.classList.remove("hidden");
            refs.loadMoreBtn.addEventListener("click", handleMoreBtn);
        }

    }
    catch (err){
        console.error(err);
    }

}

async function handleMoreBtn() {
    page += 1;
    refs.loadMoreBtn.disabled = true;

    const data = input.value
    console.log(data)
    const newSearch = await serviceSearch(data, page);
    console.log(newSearch);
    const nextArray= newSearch.hits

    refs.gallery.insertAdjacentHTML("beforeend", createMarkup(nextArray));
    refs.loadMoreBtn.disabled = false;
};


async function serviceSearch(requestData, page){
    try{
        const BASE_URL = "https://pixabay.com/api";
        const API_KEY = "41011803-a96263b547d952e0549f5a687"
        const {data} = await axios.get(`${BASE_URL}/?key=${API_KEY}&per_page=40&page=${page}&q=${requestData}`);
        return data;
    } catch(err) {
        console.error(err);
    }     
};


console.log(page)

