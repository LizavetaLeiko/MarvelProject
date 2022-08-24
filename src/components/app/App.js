import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import {ManePage, ComicsPage, Page404, SingleComicPage} from "../pages"

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<ManePage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>} />
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

// import { useState } from "react";
// import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import CharInfo from "../charInfo/CharInfo";
// import ErrorBoundary from "../errorBoundary/ErrorBoundary";
// import ComicsList from "../comicsList/ComicsList";
// import AppBanner from "../appBanner/AppBanner";

// import decoration from "../../resources/img/vision.png";

// const App = () => {
//     const [selectedCharId, setSelectedCharId] = useState(null);
//     const onCharSelected = (id) => {
//         setSelectedCharId(id);
//     };

//     return (
//         <Router>
//             <div className="app">
//                 <AppHeader />
//                 <main>
//                     <Switch>
//                         <Route exact path="/comics">
//                             <AppBanner />
//                             <ComicsList />
//                         </Route>
//                         <Route exact path="/">
//                             <ErrorBoundary>
//                                 <RandomChar />
//                             </ErrorBoundary>
//                             <div className="char__content">
//                                 <ErrorBoundary>
//                                     <CharList onCharSelected={onCharSelected} />
//                                 </ErrorBoundary>
//                                 <ErrorBoundary>
//                                     <CharInfo charId={selectedCharId} />
//                                 </ErrorBoundary>
//                             </div>
//                             <img
//                                 className="bg-decoration"
//                                 src={decoration}
//                                 alt="vision"
//                             />
//                         </Route>
//                     </Switch>
//                 </main>
//             </div>
//         </Router>
//     );
// };

export default App;
