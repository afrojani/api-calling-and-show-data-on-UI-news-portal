console.log('news')

const newsCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}

const displayCategories = categories => {
    console.log(categories);
    const categoryContainer = document.getElementById('category-list');
    categories.forEach(category => {
        const categoryList = document.createElement('li');
        categoryList.classList.add('nav-item');

        categoryList.innerHTML = `
        <a class="nav-link" href="#">${category.category_name}</a>
        `
        categoryContainer.appendChild(categoryList);

    });
}

newsCategories();