// Code here
document.addEventListener('DOMContentLoaded',onPageLoad); //page loads
//Runs on page load;
function onPageLoad (){ 
    displayTheFirstBeer()
    getBeerMenu();
}
//Get the first bear and display its details.
function displayTheFirstBeer(){
    fetch('http://localhost:3000/beers/1')  //fetching the first beer details
    .then(response=>response.json())
    .then(beer=>{
        document.getElementById('beer-name').textContent = beer.name;
        document.querySelector('#beer-image').src = beer.image_url;
        document.getElementById('beer-description').textContent= beer.description;
        const reviewList = document.getElementById('review-list')   
       const existingReview = Array.from(reviewList.children);
       existingReview.forEach(item=>item.remove());
        beer.reviews.forEach(review => { // for every review create a list item
        let newItem = document.createElement('li');
        newItem.textContent = review;
        reviewList.appendChild(newItem);
        });      
    })
    .catch(error=>console.log(error))
}
//Fetch all beers and display them to nav menu section;
function getBeerMenu(){
fetch('http://localhost:3000/beers')
.then(response=>response.json())
.then(beers =>{
const beerList = document.getElementById('beer-list');
const existingItems = Array.from(beerList.children);
existingItems.forEach(item=>item.remove());
beers.forEach(beer=>{
let beerItem = document.createElement('li');
beerItem.textContent = beer.name;
beerList.appendChild(beerItem);
});
})
.catch()
}

//Add a new review to the page when the review form is submitted. 
const reviewForm = document.getElementById('review-form')
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const customerReview = document.getElementById('review').value
    const newReview = document.createElement('li')
    newReview.innerText = customerReview
    const reviewList = document.getElementById('review-list') 
    reviewList.appendChild(newReview)
    reviewForm.reset()
    newReview.addEventListener('click', (e) => {
        e.preventDefault()
        newReview.remove()
    })
})