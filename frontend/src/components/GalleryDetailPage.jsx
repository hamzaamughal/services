import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GalleryDetailPage.css';

export const GalleryDetailPage = ({ galleryData }) => {
 const navigate = useNavigate();
 const { galleryId } = useParams();           // <-- useParams replaces match.params.galleryId
 const galleryIndex = parseInt(galleryId, 10);

 if (!galleryData) {
  return (
   <div className="container" style={{ marginTop: "100px", textAlign: "center" }}>
    <h1>Loading...</h1>
   </div>
  );
 }

 // Validate gallery data
 if (galleryIndex < 0 || galleryIndex >= galleryData.length) {
  return (
   <div className="container" style={{ marginTop: '100px' }}>
    <h1>Gallery item not found</h1>
   </div>
  );
 }

 const selectedGalleryItem = galleryData[galleryIndex];

 return (
  <div className="container" style={{ marginTop: '100px' }}>
   {/* Back Button Row */}
   <div className="row">
    <div className="col-12">
     {/* Use navigate(-1) to go back in history */}
     <button onClick={() => navigate(-1)} className="btn back-btn">
      ← Back
     </button>
    </div>
   </div>

   {/* Gallery Detail Content */}
   <div className="row fade-in" style={{ marginTop: '20px' }}>
    {/* Image Section */}
    <div className="col-md-6 col-sm-12 text-center">
     <img
      src={selectedGalleryItem.largeImage}
      alt={selectedGalleryItem.title}
      style={{
       maxWidth: '100%',
       height: 'auto',
       borderRadius: '10px',
       boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}
     />
    </div>

    {/* Text Section */}
    <div className="col-md-6 col-sm-12" style={{ marginTop: '20px' }}>
     <h1
      style={{
       fontSize: '36px',
       fontWeight: '800',
       color: '#333'
      }}
     >
      {selectedGalleryItem.title}
     </h1>
     <hr />
     <p
      style={{
       fontSize: '15px',
       lineHeight: '24px',
       marginTop: '20px'
      }}
     >
      {selectedGalleryItem.description}
     </p>
    </div>
   </div>
  </div>
 );
};
