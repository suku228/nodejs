

console.log('-----Starting the server...');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const loader = document.querySelector('#loader');
const name = document.querySelector('#name');
const username = document.querySelector('#username');

const resultList = document.querySelector('#result-list');

const userSelect = document.querySelector('#user-select');

userSelect.addEventListener('change', (e) => {
const userId = e.target.value;
console.log("userId", userId);

});
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    loader.textContent = 'Loading...';

    fetch('https://jsonplaceholder.typicode.com/users/' + location).then((response) => {
        return response.json()
    }).then((data) => {

        fetch('https://nodejs-neid.onrender.com/api/details').then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    });
        loader.textContent = '';
        name.textContent = data.name;
        username.textContent = data.username;
        fetch('https://jsonplaceholder.typicode.com/users/').then((response) => {
            return response.json()
        }).then((data) => {
            const fragment = new DocumentFragment();
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.name;
                fragment.appendChild(li);
            });
           resultList.appendChild(fragment);

           const fragment1 = new DocumentFragment();

            data.forEach(user => {
                const li = document.createElement('option');
                li.textContent = user.name;
                li.value = user.id;
                fragment1.appendChild(li);
            });
           userSelect.appendChild(fragment1);
        })

    }).catch((error) => {   
        loader.textContent = 'Unable to fetch data. Please try again later.';
        console.error('Error fetching data:', error);
    });
});