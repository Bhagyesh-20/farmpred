import React from 'react';
import './HomePage.css'; // Import the CSS file

function HomePage() {
  return (
    <div> 
      <div className="container rounded-container col-xxl-8 px-4 py-5 my-4">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="https://geopard.tech/wp-content/uploads/2021/12/Crop-Diseases_-Types-Causes-and-Symptoms-min.jpg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Predict Crop Diseases by Images</h1>
            <p className="lead">Only upload the image and get results within seconds with home remedies</p>
              <button type="button" className="btn btn-primary btn-lg px-4">Predict Now</button>
          </div>
        </div>
      </div>
      
      <div className="b-example-divider custom-divider">
        
      </div>
      
      <div className="container rounded-container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="https://c8.alamy.com/comp/PXRAFB/farmer-and-businessman-shaking-hands-at-the-cornfield-PXRAFB.jpg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">MarketPlace to Buy or have on Rent</h1>
            <p className="lead">Quickly and efficiently get the equipment you need on rent for farming, or buy seeds and fertilizers</p>
              <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
