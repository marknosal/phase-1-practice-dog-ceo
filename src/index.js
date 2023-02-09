// Loads DOM
document.addEventListener('DOMContentLoaded', () => {
    loadDogs();
    loadBreeds();
    document.querySelector('#breed-dropdown').addEventListener('change', filterBreeds);
})
let breedList = []

// Fetches dogs
function loadDogs() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => data.message.forEach(loadDogPics))
}

// Load dog photos
function loadDogPics(dogUrl) {
    const dogContainer = document.getElementById('dog-image-container')
    const dog = document.createElement('img')
    dog.src = dogUrl
    dogContainer.appendChild(dog)
}

// Load dog breeds
function loadBreeds() {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            Object.keys(data.message).filter(dog => dog.startsWith('a')).forEach(listDogBreeds)
            breedList = Object.keys(data.message)
        })
}

// Lists all dog breeds
function listDogBreeds(dogBreed) {
    const breedList = document.getElementById('dog-breeds')
    const breed = document.createElement('li')
    breed.textContent = dogBreed
    breedList.appendChild(breed)
    breed.addEventListener('click', breedColorChange)
    breed.id = dogBreed
}

// Change breed color by clicking
function breedColorChange(e) {
    let text = document.getElementById(e.target.textContent)
    text.style.color = 'Orange'
}

//display breeds matching dropdown
function filterBreeds (event) {
    const breedFilter = event.target.value
    const currentBreeds = document.getElementById('dog-breeds')
    currentBreeds.innerHTML = ''
    breedList.filter(dog => dog.startsWith(breedFilter)).forEach(listDogBreeds)


}