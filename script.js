const tableBody = document.querySelector(".table-body");
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentPage = 1; // Starti është faqa 1
const postsPerPage = 10; // 10 postime për faqe

function fetchAndDisplayPosts(page) {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`)
        .then(response => response.json())
        .then(posts => {
            tableBody.innerHTML = ''; // Fshij të vjetrat
            posts.forEach(post => {
                const row = `
                    <tr>
                        <td>${post.id}</td>
                        <td>${post.title}</td>
                        <td>${post.body}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });

            // Ndrysho butonat sipas faqes
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = posts.length < postsPerPage;
        })
        .catch(error => console.log(error));
}

// Shfaq faqen e parë kur hapet faqja
fetchAndDisplayPosts(currentPage);

// Kur klikon Next
nextBtn.addEventListener('click', () => {
    currentPage++;
    fetchAndDisplayPosts(currentPage);
});

// Kur klikon Previous
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchAndDisplayPosts(currentPage);
    }
});
