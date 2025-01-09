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
import PromotionList from "./components/PromotionList";
import PressRelease from "./components/PressRelease";

// If you have a Footer component, import it here:
// import { Footer } from "./components/footer";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const promotions = [
  {
    title: "New Year Discount",
    description:
      "Get 20% off on all services. Offer valid till January 15, 2025.",
    expiryDate: "2025-01-15",
  },
  {
    title: "Free Consultation",
    description: "Book a free consultation session for your business setup.",
    expiryDate: "2025-01-20",
  },
  {
    title: "Winter Sale",
    description: "Up to 50% off on selected packages. Don't miss out!",
    expiryDate: "2025-02-01",
  },
  {
    title: "Free Consultation",
    description: "Book a free consultation session for your business setup.",
    expiryDate: "2025-01-20",
  },
];

const pressReleaseData = [
  {
    title: "Company Launches New Product Line",
    date: "January 7, 2025",
    content:
      "We are excited to announce the launch of our new product line that is set to revolutionize the industry. The new products include cutting-edge technology, and we believe they will provide immense value to our customers.",
  },
  {
    title: "Company Launches New Product Line",
    date: "January 7, 2025",
    content:
      "We are excited to announce the launch of our new product line that is set to revolutionize the industry. The new products include cutting-edge technology, and we believe they will provide immense value to our customers.",
  },
  {
    title: "Company Launches New Product Line",
    date: "January 7, 2025",
    content:
      "We are excited to announce the launch of our new product line that is set to revolutionize the industry. The new products include cutting-edge technology, and we believe they will provide immense value to our customers.",
  },
  {
    title: "Company Launches New Product Line",
    date: "January 7, 2025",
    content:
      "We are excited to announce the launch of our new product line that is set to revolutionize the industry. The new products include cutting-edge technology, and we believe they will provide immense value to our customers.",
  },
  {
    title: "Company Launches New Product Line",
    date: "January 7, 2025",
    content:
      "We are excited to announce the launch of our new product line that is set to revolutionize the industry. The new products include cutting-edge technology, and we believe they will provide immense value to our customers.",
  },
];

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
        <Route
          path="/promotion"
          render={() => <PromotionList promotions={promotions} />}
        />
        <Route
          path="/pressrelease"
          render={() => <PressRelease release={pressReleaseData} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
