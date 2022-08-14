import { Component } from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import MarvelService from "../../services/MarvelService.js";
import ErrorMessage from "../errorMessage/ErrorMessage";

class RandomChar extends Component {
    // апдейтчар использует запрос к апишке, его нельзя прокидывать просто в конструктор,
    //  т.к. тогда у нас нарушаются правла жизненного цикла компонента, т.к. мы отправляли запрос когда компонент еще не был создан. 
    // Не было куда закинуть данные, поэтому, когда это место появлялось, реакт делал 2й запрос.
    // А именно доджно быть: конструктор - рендер - маунт - апдейт- апдейт - рендер  А должен быть 1 апдейт
    // Поэтому сетейвые запросы кидаем в componentDidMount
    // constructor(props) {
    //     super(props);
    //     this.updateChar();
    // }

    state = {
        char: {},
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    onError = () => {
        this.setState({ 
            loading: false,
            error: true,
        })
    }

    onCharLoaded = (char) => {
        this.setState({ 
            char,
            loading: false,
        })
    }

    onCharLoading = () => {
        this.setState({ 
            loading: true,
        })
    }

    // этот хук срабатывает псле первого рендера, поэтому в нем нужно делать сетевые запросы для апдейта
    componentDidMount(){
        // первичное обновление
        this.updateChar();
        // повторные обновления
        this.timerId = setInterval(this.updateChar, 5000)
    }

    // этот хук срабатывает, когда мы удаляем компонент
    componentWillUnmount(){
        clearInterval(this.timerId)
    }

    

    updateChar = () => {
        // floor  округляет;     посмотрела в апишке, примерно такие айдишки у персонажей (max и min)
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService.getCharacter(id).then(this.onCharLoaded).catch(this.onError)
        
        // .then((resourse) => {
        //     this.setState(resourse)
        // вынесли в отдельную функцию (метод):
        // this.setState({
        //     // все эти данные вытаскиваем из API
        //     name: resourse.data.results[0].name,
        //     description: resourse.data.results[0].description,
        //     //                    это будет название(адрес) картинки           а это ее расширение. Поэтому мы складываем строки
        //     thumbnail: resourse.data.results[0].thumbnail.path + '.' + resourse.data.results[0].thumbnail.extension,
        //     homepage: resourse.data.results[0].urls[0].url,
        //     wiki: resourse.data.results[0].urls[0].url,
        // });
        // });
    }

    render() {
        const {char, loading, error} = this.state;

        // условный рендеринг, если не разбивать компонент
        // if (loading) {
        //     return <Spinner />;
        // }

        // если в переменную придел нал, то ничего не отрендерится
        const renderingError = error ? <ErrorMessage/> : null;
        const renderingLoading = loading ? <Spinner/> : null;
        const renderingContent = !(error || loading) ? <View char={char}/> : null;


        return (
            <div className="randomchar">
            {/* {loading ? <Spinner/> : <View char={char}/>} Это будет работать если у нас только 2 состония (т.е. нет ошибки или загрузки) */}

            {renderingError}
            {renderingLoading}
            {renderingContent}

                {/* Это рендерящая часть, где нет никакой логики, просто записываем данные без условий, мы ее вынесли отдельно */}
                {/* <div className="randomchar__block">
                    <img
                        src={thumbnail}
                        alt="Random character"
                        className="randomchar__img"
                    />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div> */}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!
                        <br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button className="button button__main">
                        <div onClick={this.updateChar} className="inner">Change character</div>
                    </button>
                    <img
                        src={mjolnir}
                        alt="mjolnir"
                        className="randomchar__decoration"
                    />
                </div>
            </div>
        )
    }
}

// Разделим код на логические и рендерящие:
const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char;

    let imgClassName = "randomchar__img";
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgClassName = "randomchar__img randomchar__img__default"
    }



    return(
        <div className="randomchar__block">
        <img
            src={thumbnail}
            alt="Random character"
            className={imgClassName}
        />
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description}</p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
)
};

export default RandomChar;
