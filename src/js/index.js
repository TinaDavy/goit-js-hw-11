import axios from "axios";
import Notiflix from "notiflix";

import { createMarkup } from "./markup";
import { serviceSearch } from "./service-search";

const refs = {
    form: document.querySelector("#search-form"),
    searchBtn: document.querySelector(".js-search"),
    gallery: document.querySelector(".js-gellary"),
    loadMoreBtn: document.querySelector(".js-load-more")
}


let page = 0;
const input = refs.form.elements[0];


refs.form.addEventListener("submit", onSubmit);
async function onSubmit(event){
    event.preventDefault();
    page = 1;

    const inputData = input.value.trim();

    try {
        const searchData = await serviceSearch(inputData, page);
        // console.log(searchData);
        const array= searchData.hits
        const totalImg = searchData.total

        if(searchData.totalHits === 0){
            refs.loadMoreBtn.classList.add("hidden");
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            Notiflix.Notify.success(`Hooray! We found ${totalImg} images`);
        }

        // console.log(array);
        refs.gallery.innerHTML = createMarkup(array);

        const totalpages = (totalImg / 40).toFixed(0);
        // console.log(totalpages)

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
    // console.log(data)
    const newSearch = await serviceSearch(data, page);
    // console.log(newSearch);
    const nextArray= newSearch.hits
    const totalImg = newSearch.total
    const totalpages = (totalImg / 40).toFixed(0)
    // console.log("page", typeof(page));
    // console.log("totalpages", typeof(totalpages));

    if (page === Number(totalpages)){
        refs.loadMoreBtn.classList.add("hidden");
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }

    refs.gallery.insertAdjacentHTML("beforeend", createMarkup(nextArray));
    refs.loadMoreBtn.disabled = false;
};





