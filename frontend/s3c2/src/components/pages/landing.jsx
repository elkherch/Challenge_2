﻿import axios from 'axios'
﻿const LandingPage = ({ onLogoClick }) => { // Correctly destructured `onLogoClick` from props

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    // Effectuer une requête POST vers votre API
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer VOTRE_JETON'
    };

    // Effectuer une requête POST vers votre API avec les en-têtes
    axios.post('http://127.0.0.1:8000/upload/', formData, { headers })
      .then(response => {
        console.log('Réponse de l\'API :', response.data);
        // Gérer la réponse de l'API si nécessaire
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }
  return (
    <div>
      <nav className="navbar  bg-light navbar-expand-lg py-lg-3 navbar-dark">
        <div className="container">
          <a href="index.html" className="navbar-brand me-lg-5">
            <img
              src="assets/images/tsp-logo.png"
              alt=""
              className=" logo-custom"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav  me-auto align-items-center">
              <li className="nav-item mx-lg-1">
                <a className="nav-link  text-secondary active" href="">
                  Home
                </a>
              </li>
              <li className="nav-item mx-lg-1">
                <a className="nav-link text-secondary" href="">
                  About TSP
                </a>
              </li>
              <li className="nav-item mx-lg-1">
                <a className="nav-link text-secondary" href="">
                  Ai chatbot
                </a>
              </li>
              <li className="nav-item mx-lg-1">
                <a className="nav-link text-secondary" href="">
                  Contact
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto align-items-center">
        <li className="nav-item me-0">
          <img
            src="assets/images/chatbot.png"
            alt="Chatbot Logo"
            className="logo-dark logo-custom"
            onClick={onLogoClick} // This now correctly refers to the function passed as a prop
            style={{ cursor: 'pointer' }} // Closing quote for cursor style
          />
        </li>
      </ul>

          </div>
        </div>
      </nav>
      <section className="hero-section bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5">
              <div className="mt-md-4">
                <div>
                  <span className="badge bg-danger rounded-pill">TSP</span>
                  <span id="transformTarget" className="gradient-title ms-1">
                    <strong>Problem Server</strong>
                  </span>
                </div>
                <h2 className="text-coolors-3  fw-normal mb-4 mt-3 hero-title">
                  <strong> Optimize Your Journey Across Mauritania</strong>
                </h2>
                <p className="mb-4 font-16 text-coolors-1 ">
                  Find the most efficient route through Mauritania's landmarks.
                  Whether you're planning a trip or optimizing logistics, our
                  tool leverages cutting-edge algorithms to map out the shortest
                  path starting and ending in Nouakchott.
                </p>
                <a href="" target="_blank" className="btn btn-success">
                  Preview <i className="mdi mdi-arrow-right ms-1" />
                </a>
              </div>
            </div>
            <div className="col-md-5 offset-md-2">
              <div className="text-md-end mt-3 mt-md-0">
                <img src="assets/images/tsp.png" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 ">
        <div className="container">
          <div className="row py-4 ">
            <div className="col-lg-12">
              <div className="text-center">
                <h1 className="mt-0">
                  <i className="mdi mdi-infinity" />
                </h1>
                <h3>
                  Start Your <span className="text-primary"> Mauritanian</span>
                  Tour
                </h3>
                <div className="col-xl-6">
                  <div className="card">
                    <div className="card-body">
                      <form>
                        <div id="progressbarwizard">
                          <ul className="nav nav-pills nav-justified form-wizard-header mb-3">
                            <li className="nav-item ">
                              <a
                                href="#account-2"
                                data-bs-toggle="tab"
                                data-toggle="tab"
                                className="nav-link rounded-0 pt-2 pb-2"
                              >
                                <i className="mdi mdi-account-circle me-1" />
                                <span className="d-none d-sm-inline">
                                  Upload File
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#profile-tab-2"
                                data-bs-toggle="tab"
                                data-toggle="tab"
                                className="nav-link rounded-0 pt-2 pb-2"
                              >
                                <span className=" uil-circuit me-1" />
                                <span className="d-none d-sm-inline">
                                  Choose Algorithm
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#finish-2"
                                data-bs-toggle="tab"
                                data-toggle="tab"
                                className="nav-link rounded-0 pt-2 pb-2"
                              >
                                <i className="mdi mdi-checkbox-marked-circle-outline me-1" />
                                <span className="d-none d-sm-inline">
                                  Finish
                                </span>
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content b-0 mb-0">
                            <div
                              id="bar"
                              className="progress mb-3"
                              style={{ height: 7 }}
                            >
                              <div className="bar progress-bar progress-bar-striped progress-bar-animated bg-success"></div>
                            </div>
                            <div className="tab-pane" id="account-2">
                              <div className="row">
                                <div className="col-12">
                                  <div className="row mb-3">
                                    <label
                                      className="col-md-3 col-form-label"
                                      htmlFor="from"
                                    >
                                      From where{" "}
                                    </label>
                                    <div className="col-md-9">
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="userName1"
                                        name="from"
                                        defaultValue="Nouakchott"
                                      />
                                    </div>
                                  </div>
                                  <div className="row mb-3">
                                    <label
                                      className="col-md-3 col-form-label"
                                      htmlFor="password1"
                                    ></label>
                                    <div className="col-md-3">
                                      <div className="ms-3">
                                     
                                        <label htmlFor="file-upload" className="btn btn-success btn-sm mt-2">
                                            <span className="d-none d-sm-inline">Upload File</span>
                                          </label>
                                          <input
                                            id="file-upload"
                                            type="file"
                                            className="d-none"
                                            onChange={handleFileUpload}
                                          />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tab-pane" id="profile-tab-2">
                              <div className="row">
                                <div className="col-12">
                                  <div className="row mb-3">
                                    <button
                                      type="button"
                                      className="btn btn-outline-info"
                                    >
                                      <i className="uil-circuit" />{" "}
                                      Approximation Algorithm
                                    </button>
                                  </div>
                                  <div className="row mb-3">
                                    <button
                                      type="button"
                                      className="btn btn-outline-danger"
                                    >
                                      <i className="uil-circuit" /> Ant Colony
                                      Optimization (ACO)
                                    </button>
                                    </div>
                                    <div className="row mb-3">
                                    <button
                                      type="button"
                                      className="btn btn-outline-info"
                                    >
                                      <i className="uil-circuit" />{" "}
                                      Ant colonny optimization using clustring k-means
                                    </button>
                                  
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tab-pane" id="finish-2">
                              <div className="row">
                                <div className="col-12">
                                  <div className="text-center">
                                    <h2 className="mt-0">
                                      <i className="mdi mdi-check-all" />
                                    </h2>
                                    <h3 className="mt-0">
                                      All Set and Ready to Go! !
                                    </h3>
                                    <p className="w-75 mb-2 mx-auto">
                                      Thank you for completing the setup! Your
                                      files have been successfully uploaded and
                                      the optimal route calculation is complete.
                                    </p>
                                    <div className="mb-3">
                                      <div className="form-check d-inline-block">
                                        
                                        
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <ul className="list-inline mb-0 wizard  d-flex justify-content-between">
                              <li className="previous list-inline-item float-left">
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-info "
                                >
                                  Previous
                                </a>
                              </li>
                              <li className="next list-inline-item float-end">
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-info"
                                >
                                  Next
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      
      
      
      <footer className="bg-dark py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img
                src="assets/images/tsp-logo.png"
                alt=""
                className="logo-dark"
                height={18}
              />
              <p className="text-muted mt-4">
                Hyper makes it easier to build better websites with
                <br /> great speed. Save hundreds of hours of design
                <br /> and development by using it.
              </p>
              <ul className="social-list list-inline mt-3">
                <li className="list-inline-item text-center">
                  <a
                    href="javascript: void(0);"
                    className="social-list-item border-primary text-primary"
                  >
                    <i className="mdi mdi-facebook" />
                  </a>
                </li>
                <li className="list-inline-item text-center">
                  <a
                    href="javascript: void(0);"
                    className="social-list-item border-danger text-danger"
                  >
                    <i className="mdi mdi-google" />
                  </a>
                </li>
                <li className="list-inline-item text-center">
                  <a
                    href="javascript: void(0);"
                    className="social-list-item border-info text-info"
                  >
                    <i className="mdi mdi-twitter" />
                  </a>
                </li>
                <li className="list-inline-item text-center">
                  <a
                    href="javascript: void(0);"
                    className="social-list-item border-secondary text-secondary"
                  >
                    <i className="mdi mdi-github" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 mt-3 mt-lg-0">
              <h5 className="text-light">Company</h5>
              <ul className="list-unstyled ps-0 mb-0 mt-3">
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    About Us
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Documentation
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Blog
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Affiliate Program
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 mt-3 mt-lg-0">
              <h5 className="text-light">Apps</h5>
              <ul className="list-unstyled ps-0 mb-0 mt-3">
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Ecommerce Pages
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Email
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Social Feed
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Projects
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Tasks Management
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 mt-3 mt-lg-0">
              <h5 className="text-light">Discover</h5>
              <ul className="list-unstyled ps-0 mb-0 mt-3">
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Help Center
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Our Products
                  </a>
                </li>
                <li className="mt-2">
                  <a href="javascript: void(0);" className="text-muted">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="mt-5">
                <p className="text-muted mt-4 text-center mb-0">
                  © 2024 - 2025 Hyper. Design and coded by Let's code
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
