import { StudentProvider } from './estudiantes/context/StudentContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {

  return (
    <StudentProvider>
      <AppRoutes />
    </StudentProvider>
  );
};

export default App;