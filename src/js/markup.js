function createMarkup(arr){
    const markup = arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <span class="info-span"><b>Likes<br>${likes}</b></span>
          </p>
          <p class="info-item">
          <span class="info-span"><b>Views<br>${views}</b></span>
          </p>
          <p class="info-item">
          <span class="info-span"><b>Comments<br>${comments}</b></span>
          </p>
          <p class="info-item">
          <span class="info-span"><b>Downloads<br>${downloads}</b></span>
          </p>
        </div>
      </div>`
    });

    return markup.join('');
}

export {createMarkup};