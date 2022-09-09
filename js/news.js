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
    const allNewsContainer = document.getElementById('all-news');
    allNewsContainer.innerHTML = '';

    newsItems.forEach(newsItem => {
        const newsCard = document.createElement('div');
        // newsCard.classList.add('card mb-3');

        newsCard.innerHTML = `
            <div class="card mb-3">
                <div class="row g-3">
                    <div class="col-md-4">
                        <img src="${newsItem.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        
        `;
        allNewsContainer.appendChild(newsCard);

    });
}




newsCategories();