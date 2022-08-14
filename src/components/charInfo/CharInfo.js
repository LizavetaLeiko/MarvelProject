import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import "./charInfo.scss";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    };

    marvelService = new MarvelService();

    onError = () => {
        this.setState({
            error: true,
        });
    };

    onCharLoaded = (char) => {
        this.setState({
            char,
        });
    };

    onCharLoading = () => {
        this.setState({
            loading: true,
        });
    };

    updaeChar = () => {
        const { charId } = this.props;

        if (!charId) {
            return;
        }

        // this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    componentDidMount() {
        this.updaeChar();
    }

    // срабатывает когда приходит новые пропс или меняется стейт.
    // Принимает в себя prevProps и prevState - предыдущий пропс и стейт
    // Тут ни в коем слуае нельзя просто писать this.updaeChar(). Потому что попадем в бесконечный цикл и всё зависнет
    componentDidUpdate(prevProps) {
        // this.props.charId это нынешний пропс
        if (this.props.charId !== prevProps.charId) {
            this.updaeChar();
        }
    }

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const renderingError = error ? <ErrorMessage /> : null;
        const renderingLoading = loading ? <Spinner /> : null;
        // т.е. когда Не (загузка, ошибка и пустой (нал) чар), то вью рендерим
        const renderingContent = !(error || loading || !char) ? (
            <View char={char} />
        ) : null;

        return (
            <div className="char__info">
                {skeleton}
                {renderingError}
                {renderingLoading}
                {renderingContent}
            </div>
        );
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    let imgClassName = "char__basics";
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgClassName = "char__basics char__basics__default"
    }

    return (
        <>
            <div className={imgClassName}>
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "There is no comics with this character"}
                {comics.map((item, i) => {
                    // если будут айтемы с огромным количеством комиксов, то это ударит по производителности
                    if (i > 9) {
                        return;
                    }
                    return (
                        <li className="char__comics-item" key={i}>
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default CharInfo;
