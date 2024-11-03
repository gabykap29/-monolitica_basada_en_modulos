import { AuditProvider } from './auditoria/context/AuditsContext';
import { StudentProvider } from './estudiantes/context/StudentContext';
import { PreceptorProvider } from './preceptor/context/PreceptorContext';
import { ReportProvider } from './reports/context/ReportContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {

  return (
    <StudentProvider>
      <PreceptorProvider>
        <ReportProvider>
          <AuditProvider>
            <AppRoutes />
          </AuditProvider>
        </ReportProvider>
      </PreceptorProvider>
    </StudentProvider>
  );
};

export default App;
