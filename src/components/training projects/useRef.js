import {useEffect, useRef, useState} from 'react';
import {Container} from 'react-bootstrap';
// import './App.css';

const Form = () => {
    const [text, setText] = useState('');

    const myRef = useRef(1);

    // const focusFirstTI = () => {
    //     myRef.current.focus();
    // }

    useEffect(()=>{
        console.log(myRef.current);
    });
    // должна быть зависимость, но в этом тестовом можно опустить

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input 
                    onChange={(e) => setText(e.target.value)} 
                    // ref={myRef}
                    type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea 
                    // onClick={focusFirstTI} 
                    onClick={()=> myRef.current + 1}
                    className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}

// По итогу получим, что при изменении инпута запускается ф-я useEffect,
// но при клике на textarea значение myRef.current меняется, как и должно, 
// но вот useEffect не срабатывает, т.е. не происходит переренеринга.
// например, можно сохранить предыдущее значение стейка куда-нибудь или посчитать кол-во сколько раз был ренедеринг(перерендеринг). При помощи стейта это делать нельзя -будет бесконечный цикл

function App() {
    return (
        <Form/>
    );
}

// export default App;