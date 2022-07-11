import createGallery from "./createGallery"
import axios from "axios"

export default async function axiosGalerry(searchString,page){
    const config = {
        method: 'get',
        url: `https://pixabay.com/api/?key=28520366-db1a44be7c858e83a77c814fc&per_page=40&page=${page}&q=${searchString.replace(" ","+")}&image_type=photo&orientation=horizontal&safesearch=true`
    }

    let response = await axios(config)
    if (!response.ok) {
        if(response.status === 404){
            throw Error(`is not ok: ` + response.status);
        }
        else{
            let gallery = response.data
            return gallery
        }
    }
    else {
        let gallery = response.data
        return gallery
    }
}
