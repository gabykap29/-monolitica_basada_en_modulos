
import Sidebar from './components/Sidebar';
import Header from "./components/Header";
import MainPage from './pages/MainPage';
import AppRoutes from './routes/AppRoutes';

const App = () => {

  const cardColors = {
    deteccion: "#74b9ff", 
    registro: "#ff7675",  
    monitoreo: "#00d4ff", 
    administracion: "#fdcb6e" 
  };

  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;
