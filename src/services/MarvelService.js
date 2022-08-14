

// ничего не импортируем и не наследуем, т.к. это ванильный ДжС
class MarvelService{

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=92425ceda3787c2b0ec64e1cf38bf60b';
    _baseOffset = 210;

    getResourse = async (url) => {
        let resourse = await fetch(url);

        if (!resourse.ok){
            throw new Error(`Could not fetch ${url}, status: ${resourse.status}`)
        }

        return await resourse.json();
    }
                                //  можно так не передавать аргумент, а просто передать переменную сразу. Но так функция более мобильна
    getAllCharacters = async (offset = this._baseOffset)=>{
        const resourse = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        // в качестве resourse мы полуим большой масив с объектами из всех персонажей.
        // Каждого персонаа переерем и каждый item перебора будет прокидывться в char.
        // Такой синтаксис т.к. _transformCharacter и так стрелоная функция.
        // т.е. сначала мы получаем массив с объектами, в этих объетах огромное количество инфы. Но мы ее отфильтруем и вернем массив с объектами в которых только нужная инфа.
        return resourse.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id)=>{
        const resourse = await this.getResourse(`${this._apiBase}characters/${id}?&${this._apiKey}`);
        return this._transformCharacter(resourse.data.results[0]);
    }
    // resourse.data.results[0] = char
    _transformCharacter = (char) =>{
        return{
        id: char.id,
        name: char.name,
        description: char.description,
         //  это будет название(адрес) картинки, а это ее расширение. Поэтому мы складываем строки
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[0].url,
        comics: char.comics.items,
        }
    }
}

export default MarvelService;