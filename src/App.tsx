import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "./router";
import { Header } from "./components/header";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
    return (
        <div className="App">
            <Header />
            <Router />
        </div>
    );
}

export default App;
