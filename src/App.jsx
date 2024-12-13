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
      <Navigation data={landingPageData.Services} />

      <Switch>
        {/* Home Route */}
        <Route exact path="/" render={() => <Home landingPageData={landingPageData} />} />

        <Route
          path="/blog/:blogId"
          render={(props) => <BlogDetailPage {...props} blogData={landingPageData.Blog} />}
        />
        <Route
          path="/gallery/:galleryId"
          render={(props) => <GalleryDetailPage {...props} galleryData={landingPageData.Gallery} />}
        />
        {/* Service Detail Route 
            We use a dynamic parameter :serviceRoute so any sub.route like /business-structure matches.
        */}
        <Route
          path="/:serviceRoute"
          render={(props) => <ServiceDetailPage {...props} servicesData={landingPageData.Services} />}
        />

      </Switch>

    </Router>
  );
};

export default App;
