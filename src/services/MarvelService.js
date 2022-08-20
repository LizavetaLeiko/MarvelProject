import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const{loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=92425ceda3787c2b0ec64e1cf38bf60b';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset)=>{
        const resourse = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return resourse.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id)=>{
        const resourse = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(resourse.data.results[0]);
    }

    const _transformCharacter = (char) =>{
        return{
        id: char.id,
        name: char.name,
        description: char.description,
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[0].url,
        comics: char.comics.items,
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService;