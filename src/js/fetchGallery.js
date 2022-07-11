import createGallery from "./createGallery"

export default async function showGallery(searchString,page){
    try{
        const gallery = await fetchGallery(searchString,page)
        createGallery(gallery)
    }
    catch(error){
        console.log(error)
    }
}

async function fetchGallery(searchString,page){
    const response = await fetch(`https://pixabay.com/api/?key=28520366-db1a44be7c858e83a77c814fc&per_page=40&page=${page}&q=${searchString.replace(" ","+")}&image_type=photo&orientation=horizontal&safesearch=true`) 
    const gallery = await response.json()
    return gallery
}


