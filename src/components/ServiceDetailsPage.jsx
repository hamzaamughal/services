import React from 'react';
import { useHistory } from 'react-router-dom';
import './ServiceDetailPage.css';

export const ServiceDetailPage = ({ match, servicesData }) => {
 const history = useHistory();
 const routeParam = match.params.serviceRoute;

 // Add a condition to avoid rendering when servicesData is undefined
 if (!servicesData || servicesData.length === 0) {
  return <div className="loading">Loading...</div>; // Show a loading message
 }

 // Find the selected service
 let selectedService = null;
 servicesData.forEach((category) => {
  category.subCategories.forEach((sub) => {
   const cleanRoute = sub.route.replace('/', '');
   if (cleanRoute === routeParam) {
    selectedService = sub;
   }
  });
 });

 console.log(selectedService, 'selectedService');

 return (
  <div className="container" style={{ marginTop: '100px' }}>
   {selectedService ? (
    <>
     {/* Back Button (Fixed Position) */}
     <div className="fixed-back-button">
      <button onClick={() => history.goBack()} className="btn back-btn">
       ← Back
      </button>
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
         boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
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
       {/* Use dangerouslySetInnerHTML here to render HTML in the description */}
       <div
        style={{ fontSize: '15px', lineHeight: '24px', marginTop: '20px' }}
        dangerouslySetInnerHTML={{ __html: selectedService.description }}
       />

       {/* Zone Details */}
       {selectedService.zoneName && (
        <div style={{ marginTop: '30px' }}>
         <h3
          style={{
           fontSize: '24px',
           fontWeight: '700',
           color: '#555',
          }}
         >
          Zone: {selectedService.zoneName}
         </h3>
         <p
          style={{
           fontSize: '15px',
           lineHeight: '24px',
           marginTop: '10px',
          }}
         >
          {selectedService.zoneDescription}
         </p>
        </div>
       )}
      </div>
     </div>
    </>
   ) : (
    <h1>Service not found</h1>
   )}
  </div>
 );
};
