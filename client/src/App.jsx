import { StudentProvider } from './estudiantes/context/StudentContext';
import { ReportProvider } from './reports/context/ReportContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {

  return (
    <StudentProvider>
      <ReportProvider>
        <AppRoutes />
      </ReportProvider>
    </StudentProvider>
  );
};

export default App;
