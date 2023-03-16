const imageContainer = document.getElementById('image-container');

const loader = document.getElementById('loader');
let ready = false;
let iamgesLoaded = 0;
let totalImages = 0;
let photosArray = [];
const count = 10;
const apiKey = 'EOjVJDQwB5m8WifXYRDGWgttccwBidd1tYMYyVu71Pw';


// Unsplash API
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


//check if all images were loaded

function imgageLoaded() {
    iamgesLoaded++;
    if(iamgesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        
    }
}

// Create Helper method to  set attributes to Dom elements

function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}


//Create Elements for Links and Photos, add to Dom

function displayPhotos() {
    totalImages = photosArray.length;
    iamgesLoaded = 0;

    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        
        //Create <a> to link to Unsplash

        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });

        //create <img> for photo

        const img = document.createElement('img');
      
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, check when each photo is finished laoding

        img.addEventListener('load', imgageLoaded);

        //Put <img> inside <a>, put both inside imageContainer element

        item.appendChild(img);
        imageContainer.appendChild(item);

      
    });

}


// Get Photos

async function getPhotos() {
    try {
         const response = await fetch(apiUrl);
         photosArray = await response.json();
         displayPhotos();
         
    } catch(error) {
        //Catch Error Here
    }
}


//check to see if scrolling near bottom of page, Load more Photos

window.addEventListener('scroll', ()=> {
    if(window.innerHeight +  window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready =false;
        getPhotos();
    }
});

//On Load

getPhotos(); 