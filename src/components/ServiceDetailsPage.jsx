import React from 'react';

export const ServiceDetailPage = ({ match, servicesData }) => {
 // match.params.route will have the route parameter we define (e.g. "business-structure")
 const routeParam = match.params.serviceRoute;

 // Find the service detail based on routeParam in your servicesData
 let selectedService = null;
 servicesData.forEach(category => {
  category.subCategories.forEach(sub => {
   // sub.route might be like "/business-structure"
   // We can compare after removing the initial slash.
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
     <h1>{selectedService.name}</h1>
     <p>Details about {selectedService.name} go here.</p>
    </>
   ) : (
    <h1>Service not found</h1>
   )}
  </div>
 );
};
