// Рефы нужно использовать как можно меньше

// import React, {Component} from 'react';
// import {Container} from 'react-bootstrap';
// import './App.css';

// // Кейс 1 (при обновлении стр курсор сразу на инпуте):
// class Form extends Component {
    
//         можно это закинуть в конструктор
//     myRef = React.createRef();
    
//     // если компонент удалим, то отписку делать не нужно, т.к. в this.myRef передастся null;
//     // если ссылку даем на простой хтмл-элемент, то она будет содержать просто ссылку на него
//     // если ссылку (тег реф) ставим на компонент, то он содержит экземпляр компонента (можно только на классовый назначить). 
//     // Тогда можно вызвать какой-то метод этого компонента


//     // т.к. этот метод срабатывает после рендеринга,
//     // то ссылка на объект уже будет и мы без прблем поставим его в состояние фокус.
//     componentDidMount(){
//         this.myRef.current.focus();
//         // когда используем реф не на хтмл-элементе, а на классовом компоненте, то .current писать не нужно, 
//         // ну и стандартные события работать не будут, только методы класса
//     }

//     render() {
//         return (
//             <Container>
//                 <form className="w-50 border mt-5 p-3 m-auto">
//                     <div className="mb-3">
//                         <label  htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
//                         <input ref={this.myRef} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
//                         <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//                     </div>
//                 </form>
//             </Container>
//         )
//     }
// }
// function App() {
//     return (
//         <Form/>
//     );
// }

// export default App;



// // Кейс 2 (при выборе второго инпута курсор курсор на первом инпуте):
// Кейс 1 (при обновлении стр курсор сразу на инпуте):



// class Form extends Component {
    
// // myRef = React.createRef();
// // Можно реф создавать не через React.createRef(), а методом:
// // Тогда .curent  потом не нужно писать, т.к. мы записываем чистую ссылку на сам элемент сразу
// setInputRef = (elem) =>{
//     this.myRef = elem;
// }

// focusOnFirstInput = ()=>{
//     if (this.myRef){
//         this.myRef.focus();
//     }
// }

// render() {
//     return (
//         <Container>
//             <form className="w-50 border mt-5 p-3 m-auto">
//                 <div className="mb-3">
//                     <label  htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
//                             {/* ref={this.setInputRef} */}
//                     <input ref={this.myRef} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
//                     <textarea onClick={this.focusOnFirstInput} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//                 </div>
//             </form>
//         </Container>
//     )
// }
// }
// function App() {
// return (
//     <Form/>
// );
// }

// export default App;