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