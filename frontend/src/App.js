import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import { NavigationBar } from './components'; // 삭제 예정

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/nav" element={<NavigationBar />} />
                {/* <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/findpassword" element={<FindPassword />} />
                <Route path="/example" element={<Example />} />
                <Route path="/personalcolor" element={<PersonalColor />} />
                <Route path="/fassion" element={<Fassion />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
