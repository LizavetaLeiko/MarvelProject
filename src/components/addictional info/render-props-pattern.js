// import React,{ Component } from 'react';

// const Message = (props) => {
//     return (
//         <h2>The counter is {props.counter}</h2>
//     )
// }

// class Counter extends Component {
//     state = {
//         counter: 0
//     }

//     changeCounter = () => {
//         this.setState(({counter}) => ({
//             counter: counter + 1
//         }))
//     }
//       render() {
//         return (
//             <>
//                 <button
//                     className={'btn btn-primary'}
//                     onClick={this.changeCounter}>
//                     Click me
//                 </button>
//                 {this.props.render(this.state.counter)}
//             </>
//         )
//     }
// }

// function App() {
//   return (
//     <Wrapper>
                        // называть пропс можно не только рендер,
                        // можно делать любое название, можно передавать 2 пропса такого плана
//         <Counter render={counter => (
//             <Message counter={counter}/>
//         )}/>
            // Т.е. мы при рендере каунтера передаем ему пропс, в который кидаем другой компонент и, 
            // т.к. у того компонента тоже должен быть пропс, то мы его передаем, а берем мы его внутри самого компонента там где (this.state.counter)

//     </Wrapper>
//   );
// }

// export default App;