import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Error from "./error/Error";

// Public Pages
import About from "./components/about/About";
import AddAnimal from "./components/animals/AddAnimal";
import Animal from "./components/animals/Animals";
import EditAnimal from "./components/animals/EditAnimal";
import Contact from "./components/contact/Contact";
import AddCrop from "./components/crops/AddCrop";
import Crops from "./components/crops/Crops";
import EditCrop from "./components/crops/EditCrop";
import AddFertilizer from "./components/crops/fertilizer/AddFertilizer";
import EditFertilizer from "./components/crops/fertilizer/EditFertilizer";
import Fertilizer from "./components/crops/fertilizer/Fertilizer";
import Dashboard from "./components/dashboard/Dashboard";
import Faq from "./components/faq/Faq";
import Help from "./components/help/Help";
import Home from "./components/home/Home";
import Welcome from "./components/home/Welcome";
import Layout from "./components/Layout";
import GoogleTutorials from "./components/tutorials/GoogleTutorials";
import WeatherForecast from "./components/weatherForecast/Weathercast";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />

            {/* ✅ PROTECTED ROUTES BELOW */}
            <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
            <Route path="/addLivestock" element={<ProtectedRoute><AddAnimal /></ProtectedRoute>} />
            <Route path="/editLivestock/:id" element={<ProtectedRoute><EditAnimal /></ProtectedRoute>} />
            <Route path="/dashboard/:section" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/animals" element={<ProtectedRoute><Animal /></ProtectedRoute>} />
            <Route path="/crops" element={<ProtectedRoute><Crops /></ProtectedRoute>} />
            <Route path="/editCrop/:id" element={<ProtectedRoute><EditCrop /></ProtectedRoute>} />
            <Route path="/addCrop" element={<ProtectedRoute><AddCrop /></ProtectedRoute>} />
            <Route path="/fertilizer" element={<ProtectedRoute><Fertilizer /></ProtectedRoute>} />
            <Route path="/addfertilizer" element={<ProtectedRoute><AddFertilizer /></ProtectedRoute>} />
            <Route path="/editFertilizer/:id" element={<ProtectedRoute><EditFertilizer /></ProtectedRoute>} />

            {/* Public Tutorial Page */}
            <Route path="/googletutorial" element={<GoogleTutorials />} />
            <Route path="/weather" element={<WeatherForecast />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
