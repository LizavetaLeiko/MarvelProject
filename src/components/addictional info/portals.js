// import React, { Component } from "react";
// import { Container } from "react-bootstrap";
// import { ReactDOM } from "react";
// import "./App.css";

// class Form extends Component {
//     render() {
//         return (
//             <Container>
//                 <form
//                     className="w-50 border mt-5 p-3 m-auto"
//                     style={{ overflow: "hidden", position: "relative" }}
//                 >
//                     <div className="mb-3">
//                         <label
//                             htmlFor="exampleFormControlInput1"
//                             className="form-label"
//                         >
//                             Email address
//                         </label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             id="exampleFormControlInput1"
//                             placeholder="name@example.com"
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label
//                             htmlFor="exampleFormControlTextarea1"
//                             className="form-label"
//                         >
//                             Example textarea
//                         </label>
//                         <textarea
//                             className="form-control"
//                             id="exampleFormControlTextarea1"
//                             rows="3"
//                         ></textarea>
//                     </div>
//                     {/* этот контент, если посмотреть в код через браузер, 
//                     будет в самом конце html, как бы вне всех блоков. Удобно использовать для рекламы например.
//                     ВАЖНО: хоть в верстке этот элемент будет вне формы нашей, при клике на него мы будем кликать форме 
//                     и наоборот, если обработчик на портале, то он будет и на форму реагировать. Например, можно сделать, что при клике на форму, мы открываем рекламу */}
//                     <Portal>
//                         <Message/>
//                     </Portal>
//                 </form>
//             </Container>
//         );
//     }
// }

// const Portal = (props) =>{
//     // Получается мы обходим виртуал дом, это не оень хорошо, но допустимо
//     const node = document.createElement('div');
//     document.body.append(node);
//     // передаем сюда 2 аргумента: 1 - ребенок, 2 - место, куда его нужно закинуть
//     return React.createPortal(props.children,  node);
// }

// const Message = () => {
//     return (
//         <div
//             style={{
//                 width: "500px",
//                 height: "150px",
//                 backgroundColor: "red",
//                 position: "absolute",
//                 right: "0",
//                 bottom: "0",
//             }}
//         >
//             Hello
//         </div>
//     );
// };

// function App() {
//     return <Form />;
// }

// export default App;

// // хорошая статья по порталам: https://habr.com/ru/company/smartprogress/blog/306096/
// // Базовая док-ция: https://ru.reactjs.org/docs/portals.html
