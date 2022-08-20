import { useState, useEffect } from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService.js";
import ErrorMessage from "../errorMessage/ErrorMessage";

const RandomChar = () => {
    const [char, setChar] = useState({});
    // их прокинем из useMarvelService
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);

    const {loading, error, getCharacter, clearError} = useMarvelService();
    // const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 10000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    // эти функции прокидываем из useHttp
    // const onError = () => {
    //     setLoading(false);
    //     setError(true);
    // };

    // const onCharLoading = () => {
    //     setLoading(true);
    // };

    const onCharLoaded = (char) => {
        setChar(char);
        // setLoading(false);
    };

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // onCharLoading(); состояния загрузки и ошибки теперь полностью контролируются useHttp
        getCharacter(id)
            .then(onCharLoaded);
            // .catch(onError); блок кэтч у нас тоже вынесен в useHttp
    };

    const renderingError = error ? <ErrorMessage /> : null;
    const renderingLoading = loading ? <Spinner /> : null;
    const renderingContent = !(error || loading) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {renderingError}
            {renderingLoading}
            {renderingContent}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main">
                    <div onClick={updateChar} className="inner">
                        Change character
                    </div>
                </button>
                <img
                    src={mjolnir}
                    alt="mjolnir"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    let imgClassName = "randomchar__img";
    if (
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
        imgClassName = "randomchar__img randomchar__img__default";
    }

    return (
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
    );
};

export default RandomChar;
