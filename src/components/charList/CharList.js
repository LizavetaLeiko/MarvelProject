import { Component } from "react";
import propTypes from "prop-types";
import "./charList.scss";
import Spinner from "../spinner/Spinner";
import MarvelService from "../../services/MarvelService.js";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
    state = {
        itemsArr: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    };

    marvelService = new MarvelService();

    onCharLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    };
    // такой синтаксис, чтобы при подгрузке 9 новых персонажей они прибавлялись в массив, а не заменяли данне
    onLoaded = (newItemsArr) => {
        let ended = false;
        if (newItemsArr.length < 9) {
            ended = true;
        }

        this.setState(({ offset, itemsArr }) => ({
            itemsArr: [...itemsArr, ...newItemsArr],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onLoaded)
            .catch(this.onError);
    }

    onRequest = (offset) => {
        this.onCharLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onLoaded)
            .catch(this.onError);
    };

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    };

    focusOnItem = (index) => {
        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        this.itemRefs.forEach((item) =>
            item.classList.remove("char__item_selected")
        );
        this.itemRefs[index].classList.add("char__item_selected");
        // this.itemRefs[index].focus();
    };

    createCharList = (arr) => {
        const items = arr.map((item, index) => {
            let charItemClassName = "char__item";
            if (
                item.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ) {
                charItemClassName = "char__item char__item__default";
            }

            return (
                <li
                    ref={this.setRef}
                    tabIndex={0}
                    className={charItemClassName}
                    key={item.id}
                    onClick={() => {this.props.onCharSelected(item.id); this.focusOnItem(index);}}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(index);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        // Это мы вынесли, чтобы спинер ровно стоял, отрисовываясь в той же функции, что и список
        return <ul className="char__grid">{items}</ul>;
    };

    render() {
        const { itemsArr, loading, error, newItemLoading, offset, charEnded } =
            this.state;

        const items = this.createCharList(itemsArr);

        const renderingError = error ? <ErrorMessage /> : null;
        const renderingLoading = loading ? <Spinner /> : null;
        const renderingContent = !(error || loading) ? items : null;
        return (
            <div className="char__list">
                {renderingError}
                {renderingLoading}
                {renderingContent}
                <button
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{ display: charEnded ? "none" : "block" }}
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

CharList.propTypes = {
    onCharSelected: propTypes.func.isRequired,
};

export default CharList;
