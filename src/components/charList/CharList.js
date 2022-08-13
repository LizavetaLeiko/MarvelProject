import { Component } from "react";
import "./charList.scss";
import Spinner from "../spinner/Spinner";
import MarvelService from "../../services/MarvelService.js";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {

    state = {
        itemsArr: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    onLoaded = (itemsArr) => {
        this.setState({
            itemsArr,
            loading: false,
        })
    }

    onError =()=>{
        this.setState({
            loading: false,
            error: true,
        })
    }

    componentDidMount(){
        this.marvelService.getAllCharacters().then(this.onLoaded).catch(this.onError);
    }
    

    createCharList = (arr)=>{

        const items = arr.map(item => {
            let charItemClassName = "randomchar__img";
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                charItemClassName = "char__item__img char__item__img__default"
            }

            return(
                <li className={charItemClassName} key={item.id}>
                    <img className={charItemClassName} src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        // Это мы вынесли, чтобы спинер ровно стоял, отрисовываясь в той же функции, что и список
        return(
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    


    render() {
        const {itemsArr, loading, error} = this.state;

        const items = this.createCharList(itemsArr);

        const renderingError = error ? <ErrorMessage/> : null;
        const renderingLoading = loading ? <Spinner/> : null;
        const renderingContent = !(error || loading) ? items : null;
        return (
            <div className="char__list">
                {renderingError}
                {renderingLoading}
                {renderingContent}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
