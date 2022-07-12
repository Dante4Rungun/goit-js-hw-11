import simpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css";
import axiosGalerry from "./js/axiosAPI";
import createGallery from "./js/createGallery";
import Notiflix from "notiflix";

const gallery = document.querySelector('.gallery')
const search = document.querySelector('.search')
const moreBtn = document.querySelector('.load-more')
moreBtn.setAttribute('hidden','')
let searchString = ''
let searchStringSubmit = ''
let page =  1

search.addEventListener("input", (event) => {
    searchString = event.target.value.trim().replace("  "," ")
})

async function galleryAxiosCreate(searchString,page,clickType){
        moreBtn.setAttribute('hidden','')
        try{
            const galleryItems = await axiosGalerry(searchString,page)
            if(galleryItems.totalHits <= page*40 && clickType === 'click'){
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
                moreBtn.setAttribute('hidden','')
            }
            else if(galleryItems.hits.length === 0 && clickType === 'submit'){
                gallery.innerHTML = ""
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            }
            else{
                createGallery(galleryItems)
                moreBtn.removeAttribute('hidden')
                Notiflix.Notify.success(`Hooray we found ${galleryItems.totalHits} images!`)
            }
        }
        catch(error){
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
}

search.addEventListener("submit", (event) => {
    event.preventDefault()
    gallery.innerHTML = ""
    page = 1
    galleryAxiosCreate(searchString,page,"submit")
})

gallery.addEventListener("click",(event) => {
    event.preventDefault()
    let gallery = new simpleLightbox('.gallery a', {})
    gallery.options.captionDelay = '250ms'

})

moreBtn.addEventListener("click",(event) => {
    page += 1
    galleryAxiosCreate(searchString,page,"click")
})
