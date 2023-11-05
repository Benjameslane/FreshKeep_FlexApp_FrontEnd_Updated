import { Routes, Route } from "react-router-dom";
import "./App.css";
import FoodShelterList from "./pages/FoodShelter/FoodShelterList"; 
// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import InventoryPage from "./pages/Inventory/InventoryPage";
import RecipesPage from "./pages/Recipe/RecipesPage";
import DiscountedItemsPage from "./pages/DiscountedItems/DiscountedItemsPage";


// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import FoodItemForm from "./pages/FoodItem/FoodItemForm";
// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/food-shelters" element={<FoodShelterList />} />
        <Route path="/add-food-item" element={<FoodItemForm />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/discountedItems" element={<DiscountedItemsPage />} />
        <Route path="/foodShelters" element={<FoodShelterList />} />
        
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
