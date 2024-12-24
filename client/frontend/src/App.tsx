import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { ImageGallery } from './components/ImageGallery';
import { ImageUpload } from './components/ImageUpload';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { userId } = useAuth();
  return userId ? element : <Navigate to="/login" />;
};

const Navigation: React.FC = () => {
  const { userId, username, logout } = useAuth();

  if (!userId) return null;

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-300">Gallery</a>
          <a href="/upload" className="hover:text-gray-300">Upload</a>
        </div>
        <h1>Welcome {username}</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <div className="container mx-auto py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={<PrivateRoute element={<ImageGallery />} />}
              />
              <Route
                path="/upload"
                element={<PrivateRoute element={<ImageUpload />} />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;