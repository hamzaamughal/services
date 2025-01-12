import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Home } from "./pages/Home";
import { ServiceDetailPage } from "./components/ServiceDetailsPage";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { BlogDetailPage } from "./components/BlogDetailPage";
import { GalleryDetailPage } from "./components/GalleryDetailPage";
import { JurisdictionDetailPage } from "./components/JurisdictionDetailPage";
import { SubServiceDetailPage } from "./components/SubServiceDetailPage";
import Login from "./components/Login";
import Register from "./components/Register";
import PromotionList from "./components/PromotionList";
import PressRelease from "./components/PressRelease";
// import AddPressReleaseForm from "./components/forms/AddPressReleaseForm";
import AddPressReleaseForm from "./components/forms/AddPressReleaseForm";
import AddPromotionForm from "./components/forms/AddPromotionForm";
import AddBlogForm from "./components/forms/AddBlogForm";
import BlogPage from "./pages/BlogPage";

// Import ToastContainer and CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// If you have a Footer component, import it here:
// import { Footer } from "./components/footer";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      {/* Navigation is always visible */}
      <Navigation
        servicesData={landingPageData.Services}
        jurisdictionsData={landingPageData.Jurisdictions}
        loginData={landingPageData.Login}
      />

      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home landingPageData={landingPageData} />} />

        <Route path="/blog" element={<BlogPage />} />
        <Route
          path="/blog/:id"
          element={
            landingPageData.Blog ? (
              <BlogDetailPage />
            ) : (
              <div className="loading">Loading...</div>
            )
          }
        />
        <Route path="/add-blog" element={<AddBlogForm />} />

        <Route
          path="/gallery/:galleryId"
          element={
            landingPageData.Gallery ? (
              <GalleryDetailPage galleryData={landingPageData.Gallery} />
            ) : (
              <div className="loading">Loading...</div>
            )
          }
        />

        {/* Jurisdiction Detail Route */}
        <Route
          path="/jurisdictions/:jurisdictionRoute"
          element={
            landingPageData.Jurisdictions ? (
              <JurisdictionDetailPage
                jurisdictionsData={landingPageData.Jurisdictions}
              />
            ) : (
              <div className="loading">Loading...</div>
            )
          }
        />

        <Route
          path="/jurisdictions/freezone-authorities/:subServiceRoute"
          element={
            <SubServiceDetailPage
              jurisdictionsData={landingPageData.Jurisdictions}
            />
          }
        />

        {/* Service Detail Route */}
        <Route
          path="/services/:serviceRoute"
          element={
            landingPageData.Services ? (
              <ServiceDetailPage servicesData={landingPageData.Services} />
            ) : (
              <div>Loading.......</div>
            )
          }
        />
        <Route path="/user/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/promotion" element={<PromotionList />} />
        <Route path="/add-promotion" element={<AddPromotionForm />} />
        <Route path="/pressrelease" element={<PressRelease />} />
        <Route path="/only" element={<AddPressReleaseForm />} />
      </Routes>

      {/* Place the ToastContainer once in your app (often near the end) */}
      <ToastContainer />

      {/* If you have a Footer component, place it here */}
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
