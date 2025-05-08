let currentPage = 1; 

const tbody = document.querySelector('tbody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('next');

let totalPosts = 0;

function getData() {
    fetchTotalPosts();
}

function fetchTotalPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            totalPosts = data.length;
            fetchPosts(currentPage);
        })
        .catch(error => console.error('Error:', error));
}

function fetchPosts(page) {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
        .then(response => response.json())
        .then(data => {
            tbody.innerHTML = '';

            data.forEach(post => {
                const row = `
                    <tr>
                        <td>${post.id}</td>
                        <td>${post.title}</td>
                        <td>${post.body}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });

            // Menaxhimi i butonave
            prevBtn.disabled = currentPage === 1;

            const totalPages = Math.ceil(totalPosts / 10); // 10 sepse _limit=10 ne link
            if (currentPage >= totalPages) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'inline-block';
            }
        })
        .catch(error => console.error('Error:', error));
}

function onNextClick() {
    currentPage++;
    fetchPosts(currentPage);
}

function onPreviousClick() {
    if (currentPage > 1) {
        currentPage--;
        fetchPosts(currentPage);
    }
}
