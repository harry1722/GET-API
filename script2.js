let currentPage = 1; 
const resultsPerPage = 5; 

const tbody = document.querySelector('tbody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('next');

function getData() {
    fetchUsers(currentPage);
}

function fetchUsers(page) {
    fetch(`https://randomuser.me/api/?page=${page}&results=${resultsPerPage}&seed=abc`)
        .then(response => response.json())
        .then(data => {
            tbody.innerHTML = ''; // Clear the table before adding new rows

            // Loop through each user and add them to the table
            data.results.forEach((user, index) => {
                const row = `
                    <tr>
                        <td>${(currentPage - 1) * resultsPerPage + index + 1}</td> <!-- Dynamic numbering -->
                        <td>${user.name.first}</td>
                        <td>${user.name.last}</td>
                        <td>${user.email}</td>
                        <td>${user.dob.age}</td> <!-- Age -->
                        <td><img src="${user.picture.medium}" alt="Profile Picture"></td> <!-- Profile Picture -->
                    </tr>
                `;
                tbody.innerHTML += row;
            });

            // Disable previous button if on page 1
            prevBtn.disabled = currentPage === 1;

            // There’s no exact way to know total pages, so we limit it to 10 pages for now
            if (currentPage > 10) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'inline-block';
            }
        })
        .catch(error => console.error('Error:', error));
}

function onNextClick() {
    currentPage++;
    fetchUsers(currentPage);
}

function onPreviousClick() {
    if (currentPage > 1) {
        currentPage--;
        fetchUsers(currentPage);
    }
}
