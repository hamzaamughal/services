import React from 'react';
import { useHistory } from 'react-router-dom';
import './ServiceDetailPage.css';

export const ServiceDetailPage = ({ match, servicesData }) => {
 const history = useHistory();
 const routeParam = match.params.serviceRoute;

 // Find the selected service
 let selectedService = null;
 servicesData.forEach(category => {
  category.subCategories.forEach(sub => {
   const cleanRoute = sub.route.replace('/', '');
   if (cleanRoute === routeParam) {
    selectedService = sub;
   }
  });
 });

 return (
  <div className="container" style={{ marginTop: '100px' }}>
   {selectedService ? (
    <>
     {/* Back Button Row */}
     <div className="row">
      <div className="col-12">
       <button
        onClick={() => history.goBack()}
        className="btn back-btn"
       >
        ← Back
       </button>
      </div>
     </div>

     {/* Service Detail Row */}
     <div className="service-detail row fade-in">
      <div className="col-md-6 col-sm-12 text-center">
       <img
        src={selectedService.image}
        alt={selectedService.name}
        className="img-responsive service-detail-image"
        style={{
         maxWidth: '100%',
         height: 'auto',
         borderRadius: '10px',
         boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}
       />
      </div>

      <div className="col-md-6 col-sm-12" style={{ marginTop: '20px' }}>
       <h1
        style={{
         fontSize: '36px',
         fontWeight: '800',
         color: '#333',
        }}
       >
        {selectedService.name}
       </h1>
       <hr />
       <p
        style={{
         fontSize: '15px',
         lineHeight: '24px',
         marginTop: '20px'
        }}
       >
        {selectedService.description}
       </p>
      </div>
     </div>
    </>
   ) : (
    <h1>Service not found</h1>
   )}
  </div>
 );
};
