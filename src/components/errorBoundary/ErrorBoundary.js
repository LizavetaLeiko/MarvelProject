import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

// Другие обработики ошибок мы делали,
// т.к. такой предохранитель отлавливает не все ошибки (только ошибки в рендере, методах жизненного цикла, конструктораз дочерних элементов)
// не отлавливают ошибки обработчиков событийб в асинхронном коде (например, сетевых запросах), в самом себе и серверном рендеринге

class ErrorBoundary extends Component {

    state ={
        error: false,
    }

    // еще можно использовать такой вариант:
    // Но он только обновляет стейт, ничего больше
    // static getDerivedStateFromError(error){
    //     return {error: true}
    // }

    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo)
        this.setState({
            error: true,
        })
    }

    render(){
        if (this.state.error){
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

// props.children используется, когда мы не знаем. что будет внутри элемента или хотим пушить в него разные элементы.
// т.е. мы прописываем, что в этот элемент будет передаваться какой-то дочерний элемент.
// Но нам не всегда удобно писать props.children.
// Например, если нужно произвести какие-либо дйствия с потомками (например, присвоить им класс):
// import React,{ Component } from 'react'; (не забыть импортировать сам класс реакт)
// Пример на функциональном компоненте, на классовом будет просто +this.

// const DynamicGreating = (props) => {
//     return (
//         <div className={'mb-3 p-3 border border-' + props.color}>

              //    объект для динамеской работы внутри элемента
//             {
//                 React.Children.map(props.children, child => {
//                     return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'})
//                 })
                           // React.cloneElement, т.к. нужно соблюдать принцип иммутабельности, нельзя менять входящий объект.
                           // React.cloneElement (элемент, {config(новые пропсы дл элментов)}, [...children])
//             }

//         </div>
//     )
// }

// <DynamicGreating color={'primary'}>
//     <h2>This weel was hard</h2> 
//     <h2>Hello world!</h2>
// </DynamicGreating>
// Т.е. тут h2 удет как бы массивом дочерних элементов, которые мы перебираем мэпом.

// Но props.children получается удет одной структурой. 
// Если нам нужно,чтобы у нас доерние элементы делились на 2 группы (например, на правый и левый столбики):

// Файл 1:

// import {Container, Row, Col} from 'react-bootstrap';
// const BootstrapTest = (props) => {
//     return (
//         <Container className="mt-5 mb-5">
//             <Row>
//                 <Col>
//                     {props.left}
//                 </Col>
//                 <Col>
//                     {props.right}
//                 </Col>
//             </Row>
//         </Container>
//     )
// }
// export default BootstrapTest;

// Файл 2:

// import React,{ Component } from 'react';
// import BootstrapTest from './BootstrapTest';
// const DynamicGreating = (props) => {
//     return (
//         <div className={'mb-3 p-3 border border-' + props.color}>
//             {
//                 React.Children.map(props.children, child => {
//                     return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'})
//                 })
//             }
//         </div>
//     )
// }

// function App() {
//   return (
//     <Wrapper>

//         <BootstrapTest
//             left = {
//                 <DynamicGreating color={'primary'}>
//                     <h2>This weel was hard</h2>
//                     <h2>Hello world!</h2>
//                 </DynamicGreating>
//             }
//             right = {
//                 <DynamicGreating color={'primary'}>
//                     <h2>RIGHT!</h2>
//                 </DynamicGreating>
//             }
//         />

//     </Wrapper>
//   );
// }
// export default App;

// https://ru.reactjs.org/docs/react-api.html#reactchildren
