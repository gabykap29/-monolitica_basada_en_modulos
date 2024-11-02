import { AuditProvider } from './auditoria/context/AuditsContext';
import { StudentProvider } from './estudiantes/context/StudentContext';
import { ReportProvider } from './reports/context/ReportContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {

  return (
    <StudentProvider>
      <ReportProvider>
        <AuditProvider>
          <AppRoutes />
        </AuditProvider>
      </ReportProvider>
    </StudentProvider>
  );
};

export default App;
