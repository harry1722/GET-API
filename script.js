const elePostUl = document.querySelector(".ul-post");
const nextBtn = document.getElementById('nextBtn');

let posts = [];
let currentPage = 0;
const postsPerPage = 10;

fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
        posts = json;
        displayPosts();
    })
    .catch(error => console.log(error));

function displayPosts() {
    elePostUl.innerHTML = ''; // Clear the previous posts
    const start = currentPage * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    pagePosts.forEach(post => {
        elePostUl.innerHTML += `
            <li> 
                <h2>Id: ${post.id}</h2>
                <h3>Title: ${post.title}</h3>
                <p>Body: ${post.body}</p>
            </li>
        `;
    });
}

nextBtn.addEventListener('click', () => {
    if ((currentPage + 1) * postsPerPage < posts.length) {
        currentPage++;
        displayPosts();
    } else {
        alert('Nuk ka më postime bro 🔥');
    }
});
