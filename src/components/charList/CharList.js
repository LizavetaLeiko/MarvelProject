import { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";
import "./charList.scss";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService.js";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = (props) =>{

    const [itemsArr, setItemsArr] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    // useEffect выполнется после того, как компонент отредерится, поэтому ф-я onRequest уже будет существовать, ее можно использовать
    useEffect(() =>{
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        // onCharLoading();
        getAllCharacters(offset).then(onLoaded);
    }

    // const onCharLoading =()=>{
    //     setNewItemLoading(true);
    // }

    const onLoaded = (newItemsArr) => {
        let ended = false;
        if(newItemsArr.length < 9){
            ended = true;
        }
        // this.setState(({offset, itemsArr}) =>({
        //     itemsArr: [...itemsArr, ...newItemsArr],
        //     loading: false,
        //     newItemLoading: false,
        //     offset: offset + 9,
        //     charEnded: ended,
        // }))
        setItemsArr( itemsArr => [...itemsArr, ...newItemsArr]);
        // setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    // const onError =()=>{
    //     setLoading(false);
    //     setError(true);
    // }

    const itemRefs = useRef([]);

    const focusOnItem = (index) => {
        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        itemRefs.current.forEach((item) =>
            item.classList.remove("char__item_selected")
        );
        itemRefs.current[index].classList.add("char__item_selected");
        // this.itemRefs[index].focus();
    };

    function createCharList (arr) {
        const items = arr.map((item, index) => {
            let charItemClassName = "char__item";
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                charItemClassName = "char__item char__item__default"
            }

            return (
                <li
                    ref={el => itemRefs.current[index] = el}
                    tabIndex={0}
                    className={charItemClassName}
                    key={item.id}
                    onClick={() => {props.onCharSelected(item.id); focusOnItem(index);}}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(index);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        // Это мы вынесли, чтобы спинер ровно стоял, отрисовываясь в той же функции, что и список
        return(
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    
        const items = createCharList(itemsArr);

        const renderingError = error ? <ErrorMessage/> : null;
                                // т.е.загрузка, но не загрузка новых персонажей
        const renderingLoading = loading && !newItemLoading ? <Spinner/> : null;
                            // из-за этог нала, когда мы подгружаем новых персонажей, у нас полностью перерендеривается компонент 
                            // и все предыдущие персонажи исчезают и потом повляется общий список с новыми персонажами, 
                            // т.к. верстка прыгает при загрузке
        // const renderingContent = !(error || loading) ? items : null;
        return (
            <div className="char__list">
                {renderingError}
                {renderingLoading}
                {items}
                {/* {renderingContent} */}
                <button disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{'display': charEnded ? 'none' : 'block'}}
                className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


CharList.propTypes ={
    onCharSelected: propTypes.func.isRequired
}

export default CharList;
