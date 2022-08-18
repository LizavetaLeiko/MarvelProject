import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';
import {Component, useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';

// import './App.css';
// class Slider extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }

//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }
    
// const getSomeImg = ()=>{
//     console.log('fetching');
//     return[
//         'https://images.pexels.com/photos/3110320/pexels-photo-3110320.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
//         'https://images.pexels.com/photos/12617812/pexels-photo-12617812.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
//     ]
//     }
// имитация того, что мы получаем фото с апишки

const countTotal= (num) => {
    return num + 10;
}

const Slider = (props) => {

    // Вариант 1 (лучше этот синтаксис):

    // const slaieStateArr = useState();
    // так (или еще если сделать колл-бэк useState(() => calcValue()) ) calcValue вызовется 1 раз, чтобы начальное знаение инициализировать.
    // Если мы ее вызовем,т.е. useState(calcValue()), то она будет обновляться каждый раз при вызове стейта.
    const [slide, setSlide] = useState(calcValue);
    const [autoplay, setAutoplay] = useState(false);

    function changeSlide(i) {
        // коллбэк т.к. наш стейт новый будет зависеть от старого
        setSlide(slide => slide + i);
    }
    function toggleAutoplay(){
        setAutoplay(autoplay => !autoplay); 
    }

    function logging(){
        console.log('log');
    }

    function calcValue () {
        return Math.random() * (50 - 1) + 1;
    }
    // нашу имитацию получения фото из апишки кидаем в useCallback,
    // чтобы она не вызывала при каждом перерендеринге, а только при изменении определенного стейта
    const getSomeImg = useCallback(()=>{
        console.log('fetching');
        return[
            'https://images.pexels.com/photos/3110320/pexels-photo-3110320.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            'https://images.pexels.com/photos/12617812/pexels-photo-12617812.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
        ]
        }, [slide]);

    // По сути, useEffect объединяет componentDidUpdate, componentDidMount и componentWillUnMount
            
            // эта стрелоная функция каждый апдейт создается новая, чтобы в нее попала новя переменная из стейта
            // Но чтобы этого не произошло, мы добавляем 2й аргумент, в котором говорим за каким стейтом следить
            // если оставить пустой массив, то useEffect вызовется только 1 раз
    useEffect(()=>{
        document.title = `Slide: ${slide}`

        // повесим внутри обработчик событий (на весь виндоу, т.е. куда бы ни нажали сработает)
        window.addEventListener('click', logging)

        // чтобы убрать обработчик (отписаться от него) при удалении элемента, нужно заретернить кол-бэк функццию:
        return () => {
            window.removeEventListener('click', logging)
        }
    }, [slide])

    // Вариант 2:
    // const [state, setState] = useState({slide: 0, autoplay: false});
    
    // function changeSlide(i) {
    //         // коллбэк т.к. наш стейт новый будет зависеть от старого
    //         setState(state => ({...state, slide: state.slide + i}) );
    //     }
    // function toggleAutoplay(){
    //         setState(state => ({...state, autoplay: !state.autoplay})); 
    //     }


    // в таком виде у нас будет вызываться функиця при каждом апдейте (перерендеренге) независимо от того, какой стейт изменили
    // const total = countTotal(slide);
    // при таком синтаксисе useMemo как бы запоминает то, что выдает нам фунция и обновление происходит только когда обновился нужный стейт
    // если триггерирующий стейт не прописать, то тотал посчитается только 1 раз при первом рендеринге
    const total = useMemo(() =>{
        return countTotal(slide);
    }, [slide]);
        // useMemo сохраняет именно значение, а useCallback сохраняет именно функцию
        // useMemo запускается во время рендеринга, поэтому туда нельзя помещать побочные эффекты (например, запросы и подписки)

    // пример использования useMemo для объектов:

    // если код будет таким, то при каждом перерендеринге будет создаваться новый объект.
    // А т.к. в js одинаковые объекты не равны (т.к. он сравнивает ссылки на объект, а не его соержимое), то каждый раз будет срабатывать useEffect
    // const style = {
    //     color: slide > 4 ? 'red' : 'black',
    // }
    // Поэтому нужно закешировать этoт объект (при обновлении всё так же будет создаваться новый объект, 
    // чтобы соблюдать иммутабельность, но теперь он будет обновляться только когда изменяется нужный стейт):
    const style = useMemo(()=>({
        color: slide > 4 ? 'red' : 'black',
    }), [slide]);

    useEffect(()=>{
        console.log('style');
    }, [style])

    return (
        <Container>
            <div className="slider w-50 m-auto">  
                {/* {
                    // то, что мы тут вызываем функцию плохо, т.к. при кажм ренере она будет вызываться
                    getSomeImg().map((url, i)=>{
                        return(
                            <img key={i} className="d-block w-100" src={url} alt="slide" />
                        )
                    })
                } */}
                <Slides getSomeImg={getSomeImg}/>
                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                                                                {/* {state.slide}     {state.autoplay} */}
                <div style={style} className="text-center mt-5">Total slides {total}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slides = ({getSomeImg}) => {
    const [imgs, setImg] = useState([]);

    useEffect(()=>{
        setImg(getSomeImg())
    }, [getSomeImg])

    return(
        <>
            {imgs.map((url, i)=> <img key={i} className="d-block w-100" src={url} alt="slide" />)}
        </>
    )
}

function App() {
    const [slider, setSlider] = useState(true);

return (
    <>
        <button onClick={()=> setSlider(false)}>Remove all</button>
        {slider ? <Slider/> : null}
        
    </>
);
}

// export default App;