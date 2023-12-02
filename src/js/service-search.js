import axios from "axios";

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

export {serviceSearch};