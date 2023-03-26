import './App.css';
import DoctorPage from './pages/DoctorPage';
import PatientPage from './pages/PatientPage'
import Test from './pages/Test';
import PageNotFound from './pages/PageNotFound';
import LogIn from './registration/LogIn';
import SignUp from './registration/SignUp';
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';


function App() {

  function ProtectedRoute({ children, authorizedRoles }) {
    const accessToken = sessionStorage.getItem('accessToken');
    const role = sessionStorage.getItem("role");
    if (accessToken && role && authorizedRoles.includes(role)) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }
  
  
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path="/" element={<Test></Test>}></Route>
          <Route path="/doctor-page" element={<ProtectedRoute authorizedRoles={["Doctor"]}>
              <DoctorPage />
              </ProtectedRoute>} />
          <Route path="/patient-page" element={<ProtectedRoute authorizedRoles={["Patient"]}>
              <PatientPage />
              </ProtectedRoute>} />
          <Route path="/login" element={<LogIn></LogIn>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
