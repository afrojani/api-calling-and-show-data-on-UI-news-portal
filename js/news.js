// news categories

const newsCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}

const displayCategories = categories => {
    // console.log(categories);
    const categoryContainer = document.getElementById('category-list');
    categories.forEach(category => {
        const categoryList = document.createElement('li');
        categoryList.classList.add('nav-item');

        categoryList.innerHTML = `
        <a onclick="allNews('${category.category_id}')" class="nav-link" href="#">${category.category_name}</a>
        `;
        categoryContainer.appendChild(categoryList);

    });
}

// All news in a category
const allNews = async id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    viewAllNews(data.data)
    // displayCategories(data.data.news_category);
}

const viewAllNews = newsItems => {
    console.log(newsItems);

    const noNewsUpdate = document.getElementById('no-news');
    if (newsItems.length === 0) {
        noNewsUpdate.classList.remove('d-none')
    }
    else {
        noNewsUpdate.classList.add('d-none')
    }
    const allNewsContainer = document.getElementById('all-news');
    allNewsContainer.innerHTML = '';


    newsItems.forEach(newsItem => {
        const newsCard = document.createElement('div');


        newsCard.innerHTML = `
            <div class="card mb-3">
                <div class="row g-3">
                    <div class="col-md-4">
                        <img src="${newsItem.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${newsItem.title}</h5>
                            <p class="card-text">${newsItem.details.slice(0, 300) + '...'}</p>
                            <div class=" nav nav-fill  justify-content-between  align-items-center">
                                <div>
                                    <img src="${newsItem.author.img}" class="rounded-circle" style="width: 30px; height: 30px;" alt="">
                                    <h6>${newsItem.author.name ? newsItem.author.name : 'No Author'}</h6>
                                    <p>${newsItem.author.published_date ? newsItem.author.published_date : 'JUST NOW'}</p>
                                </div>
                                <p><i class="fa-solid fa-eye">${newsItem.total_view ? newsItem.total_view : 'No Views Yet'}</i></p>
                                <button onclick="loadNewsDetails('${newsItem._id}')" class=" btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        `;
        allNewsContainer.appendChild(newsCard);

    });
}


// ---------------------------------------------------------------------------

const loadNewsDetails = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}

const displayNewsDetails = detailNews => {
    console.log(detailNews);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = detailNews.title;
    const detailNewsBody = document.getElementById('news-detail-body');
    detailNewsBody.innerHTML = `
                        <div class="card-body">
                            
                            <p class="card-text">${detailNews.details}</p>
                            <div class=" nav nav-fill  justify-content-between  align-items-center">
                                <div>
                                    <img src="${detailNews.author.img}" class="rounded-circle" style="width: 30px; height: 30px;" alt="">
                                    <h6>${detailNews.author.name ? detailNews.author.name : 'No Author'}</h6>
                                    <p>${detailNews.author.published_date ? detailNews.author.published_date : 'JUST NOW'}</p>
                                </div>
                                <p><i class="fa-solid fa-eye">${detailNews.total_view ? detailNews.total_view : 'No Views Yet'}</i></p>
                                
                            </div>
                        </div>
    
    `
}




newsCategories();