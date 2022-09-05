import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';


// В Хок выносим общий фнкционал, а пропсами передаем различия (их должно быть не много, иначе хок не имеет смысла)
const withSlider = (BaseComponent, getData) =>{
  return (props) =>{
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false)

    useEffect(() => {
        setSlide(getData());
    }, [])

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    return <BaseComponent
      {...props}
      slide={slide}
      autoplay={autoplay}
      changeSlide={changeSlide}
      setAutoplay={setAutoplay}/>
  }
}

const getDataFromFirstFetch = () => {return 10};
const getDataFromSecondFetch = () => {return 20};

const SliderFirst = (props) => {

  console.log(props.name)

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                </div>
            </div>
        </Container>
    )
}

const SliderSecond = (props) => {

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide} <br/>{props.autoplay ? 'auto' : null} </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.setAutoplay(autoplay => !props.autoplay)}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

// при помощи хока мы можем расшири функционал одного компонентка, не трогая другой такой же
const withLogger = WrappedComponent => props =>{

  useEffect(()=>{
    console.log('render')
  }, []);
  
  return <WrappedComponent {...props}/>
}

const Hello = () =>{
  return ( 
  <h1>Hello</h1> 
  )
}

const HelloWhithLogger = withLogger(Hello);
                            // Первый - компонент, который нужно обернуть, второй - отличие компонентов
const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch);
const SliderWithSecondFetch = withSlider(SliderSecond, getDataFromSecondFetch);

function App() {
    return (
        <>
            <HelloWhithLogger/>
            {/* <Hello/> */}
            <SliderWithFirstFetch name={'liza'}/>
            <SliderWithSecondFetch/>
        </>
    );
}

export default App;