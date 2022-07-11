import Notiflix from "notiflix"

export default function createGallery(galleryItems){
    const gallery = document.querySelector('.gallery')
    let cardList = []
    for (const item of galleryItems.hits){
        const card = document.createElement('div')
        card.classList.add('photo-card')

        const link = document.createElement('a')
        link.href = item.largeImageURL

        const img = document.createElement('img')
        img.setAttribute('src',item.webformatURL)
        img.setAttribute('alt',item.tags)
        img.setAttribute('width','300')
        img.setAttribute('height','300')
        img.setAttribute('loading','lazy')

        link.append(img)
        
        const info = document.createElement('div')
        info.classList.add('info')

        const likes = document.createElement('p')
        likes.classList.add('info-item')
        likes.innerHTML = `<b>Likes</b><br>${item.likes}`

        const views = document.createElement('p')
        views.classList.add('info-item')
        views.innerHTML = `<b>Views</b><br>${item.views}`

        const comments = document.createElement('p')
        comments.classList.add('info-item')
        comments.innerHTML = `<b>Comments</b><br>${item.comments}`

        const downloads = document.createElement('p')
        downloads.classList.add('info-item')
        downloads.innerHTML = `<b>Downloads</b><br>${item.downloads}`

        info.append(likes)
        info.append(views)
        info.append(comments)
        info.append(downloads)

        card.append(link)
        card.append(info)

        cardList.push(card)
    }

    gallery.append(...cardList)
}
