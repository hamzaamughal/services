import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

      <Switch>
        {/* Home Route */}
        <Route
          exact
          path="/"
          render={() => <Home landingPageData={landingPageData} />}
        />

        <Route
          path="/blog/:blogId"
          render={(props) =>
            landingPageData.Blog ? (
              <BlogDetailPage {...props} blogData={landingPageData.Blog} />
            ) : (
              <div className="loading">Loading...</div>
            )
          }
        />

        <Route
          path="/gallery/:galleryId"
          render={(props) =>
            landingPageData.Gallery ? (
              <GalleryDetailPage
                {...props}
                galleryData={landingPageData.Gallery}
              />
            ) : (
              <div className="loading">Loading...</div>
            )
          }
        />

        {/* Jurisdiction Detail Route */}
        <Route
          exact
          path="/jurisdictions/:jurisdictionRoute"
          render={(props) =>
            landingPageData.Jurisdictions ? (
              <JurisdictionDetailPage
                {...props}
                jurisdictionsData={landingPageData.Jurisdictions}
              />
            ) : (
              <div className="loading">Loading...</div>
            )
          }
        />

        <Route
          exact
          path="/jurisdictions/freezone-authorities/:subServiceRoute"
          render={(props) => (
            <SubServiceDetailPage
              {...props}
              jurisdictionsData={landingPageData.Jurisdictions}
            />
          )}
        />

        {/* Service Detail Route */}
        <Route
          exact
          path="/services/:serviceRoute"
          render={(props) =>
            landingPageData.Services ? (
              <ServiceDetailPage
                {...props}
                servicesData={landingPageData.Services}
              />
            ) : (
              <div>Loading.......</div>
            )
          }
        />
        <Route exact path="/user/login" render={() => <Login />} />
        <Route exact path="/register" render={() => <Register />} />
      </Switch>
    </Router>
  );
};

export default App;
