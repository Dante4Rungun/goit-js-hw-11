import showGallery from "./js/fetchGallery"
import simpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css";
import axiosGalerry from "./js/axiosAPI";
import createGallery from "./js/createGallery";

const gallery = document.querySelector('.gallery')
const search = document.querySelector('.search')
const moreBtn = document.querySelector('.load-more')
moreBtn.setAttribute('hidden','')
let searchString = ''
let searchStringSubmit =''
let page =  1

search.addEventListener("input", (event) => {
    searchString = event.target.value
})

async function galleryAxiosCreate(searchString,page){
    try{
        const gallery = await axiosGalerry(searchString,page)
        createGallery(gallery)
    }
    catch(error){
        console.log(error)
    }
}

search.addEventListener("submit", (event) => {
    event.preventDefault()
    moreBtn.removeAttribute('hidden')
    page = 1
    galleryAxiosCreate(searchString,page)
})

gallery.addEventListener("click",(event) => {
    event.preventDefault()
    let gallery = new simpleLightbox('.gallery a', {})
    gallery.options.captionDelay = '250ms'

})

moreBtn.addEventListener("click",(event) => {
    page += 1
    galleryAxiosCreate(searchString,page)
})
