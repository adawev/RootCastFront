import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router";
import LandingPage from './components/LandingPage'
import CheckWeather from "./components/CheckWeather";
import Contacts from "./components/Contacts";
import About from "./components/About";
import NotFound from "./components/NotFound";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/check-weather" element={<CheckWeather/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>

        </div>
    );
}

export default App;
