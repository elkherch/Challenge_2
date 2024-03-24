const LandingPage = ({ onLogoClick }) => { // Correctly destructured `onLogoClick` from props
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
                                        <label
                                          htmlFor="file-upload"
                                          className="btn btn-success btn-sm mt-2"
                                        >
                                          <i className="mdi mdi-upload me-1" />
                                          Upload File
                                        </label>
                                        <input
                                          id="file-upload"
                                          type="file"
                                          className="d-none"
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
          <div className="row">
            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-desktop text-primary font-24" />
                  </span>
                </div>
                <h4 className="mt-3">Responsive Layouts</h4>
                <p className="text-muted mt-2 mb-0">
                  Et harum quidem rerum as expedita distinctio nam libero
                  tempore cum soluta nobis est cumque quo.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-vector-square text-primary font-24" />
                  </span>
                </div>
                <h4 className="mt-3">Based on Bootstrap UI</h4>
                <p className="text-muted mt-2 mb-0">
                  Temporibus autem quibusdam et aut officiis necessitatibus
                  saepe eveniet ut sit et recusandae.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-presentation text-primary font-24" />
                  </span>
                </div>
                <h4 className="mt-3">Creative Design</h4>
                <p className="text-muted mt-2 mb-0">
                  Nam libero tempore, cum soluta a est eligendi minus id quod
                  maxime placeate facere assumenda est.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-apps text-primary font-24" />
                  </span>
                </div>
                <h4 className="mt-3">Multiple Applications</h4>
                <p className="text-muted mt-2 mb-0">
                  Et harum quidem rerum as expedita distinctio nam libero
                  tempore cum soluta nobis est cumque quo.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-shopping-cart-alt text-primary font-24" />
                  </span>
                </div>
                <h4 className="mt-3">Ecommerce Pages</h4>
                <p className="text-muted mt-2 mb-0">
                  Temporibus autem quibusdam et aut officiis necessitatibus
                  saepe eveniet ut sit et recusandae.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center p-3">
                <div className="avatar-sm m-auto">
                  <span className="avatar-title bg-primary-lighten rounded-circle">
                    <i className="uil uil-grids text-primary font-24" />
                  </span>
                </div>
                <h4 className="mt-3">Multiple Layouts</h4>
                <p className="text-muted mt-2 mb-0">
                  Nam libero tempore, cum soluta a est eligendi minus id quod
                  maxime placeate facere assumenda est.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-light-lighten border-top border-bottom border-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h3>
                  Flexible <span className="text-primary">Layouts</span>
                </h3>
                <p className="text-muted mt-2">
                  There are three different layout options available to cater
                  need for any <br /> modern web application.
                </p>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-4">
              <div className="demo-box text-center">
                <img
                  src="assets/images/layouts/layout-1.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Vertical Layout</h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="demo-box text-center mt-3 mt-lg-0">
                <img
                  src="assets/images/layouts/layout-2.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Horizontal Layout</h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="demo-box text-center mt-3 mt-lg-0">
                <img
                  src="assets/images/layouts/layout-3.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Detached Layout</h5>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-4">
              <div className="demo-box text-center">
                <img
                  src="assets/images/layouts/layout-5.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Light Sidenav Layout</h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="demo-box text-center mt-3 mt-lg-0">
                <img
                  src="assets/images/layouts/layout-6.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Boxed Layout</h5>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="demo-box text-center mt-3 mt-lg-0">
                <img
                  src="assets/images/layouts/layout-4.png"
                  alt="demo-img"
                  className="img-fluid shadow-sm rounded"
                />
                <h5 className="mt-3 f-17">Semi Dark Layout</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h1 className="mt-0">
                  <i className="mdi mdi-heart-multiple-outline" />
                </h1>
                <h3>
                  Features you'll <span className="text-danger">love</span>
                </h3>
                <p className="text-muted mt-2">
                  Hyper comes with next generation ui design and have multiple
                  benefits
                </p>
              </div>
            </div>
          </div>
          <div className="row mt-2 py-5 align-items-center">
            <div className="col-lg-5">
              <img
                src="assets/images/features-1.svg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-lg-6 offset-lg-1">
              <h3 className="fw-normal">Inbuilt applications and pages</h3>
              <p className="text-muted mt-3">
                Hyper comes with a variety of ready-to-use applications and
                pages that help to speed up the development
              </p>
              <div className="mt-4">
                <p className="text-muted">
                  <i className="mdi mdi-circle-medium text-primary" /> Projects
                  &amp; Tasks
                </p>
                <p className="text-muted">
                  <i className="mdi mdi-circle-medium text-primary" /> Ecommerce
                  Application Pages
                </p>
                <p className="text-muted">
                  <i className="mdi mdi-circle-medium text-primary" /> Profile,
                  pricing, invoice
                </p>
                <p className="text-muted">
                  <i className="mdi mdi-circle-medium text-primary" /> Login,
                  signup, forget password
                </p>
              </div>
              <a href="" className="btn btn-primary btn-rounded mt-3">
                Read More <i className="mdi mdi-arrow-right ms-1" />
              </a>
            </div>
          </div>
          <div className="row pb-3 pt-5 align-items-center">
            <div className="col-lg-6">
              <h3 className="fw-normal">Simply beautiful design</h3>
              <p className="text-muted mt-3">
                The simplest and fastest way to build dashboard or admin panel.
                Hyper is built using the latest tech and tools and provide an
                easy way to customize anything, including an overall color
                schemes, layout, etc.
              </p>
              <div className="mt-4">
                <p className="text-muted">
                  <i className="mdi mdi-circle-medium text-success" /> Built
                  with latest Bootstrap
                </p>
                <p className="text-muted">
                  <i className="mdi mdi-circle-medium text-success" /> Extensive
                  use of SCSS variables
                </p>
                <p className="text-muted">
                  <i className="mdi mdi-circle-medium text-success" /> Well
                  documented and structured code
                </p>
                <p className="text-muted">
                  <i className="mdi mdi-circle-medium text-success" /> Detailed
                  Documentation
                </p>
              </div>
              <a href="" className="btn btn-success btn-rounded mt-3">
                Read More <i className="mdi mdi-arrow-right ms-1" />
              </a>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <img
                src="assets/images/features-2.svg"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-light-lighten border-top border-bottom border-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h1 className="mt-0">
                  <i className="mdi mdi-tag-multiple" />
                </h1>
                <h3>
                  Choose Simple <span className="text-primary">Pricing</span>
                </h3>
                <p className="text-muted mt-2">
                  The clean and well commented code allows easy customization of
                  the theme.It's designed for
                  <br />
                  describing your app, agency or business.
                </p>
              </div>
            </div>
          </div>
          <div className="row mt-5 pt-3">
            <div className="col-md-4">
              <div className="card card-pricing">
                <div className="card-body text-center">
                  <p className="card-pricing-plan-name fw-bold text-uppercase">
                    Standard License{" "}
                  </p>
                  <i className="card-pricing-icon dripicons-user text-primary" />
                  <h2 className="card-pricing-price">
                    $49 <span>/ License</span>
                  </h2>
                  <ul className="card-pricing-features">
                    <li>10 GB Storage</li>
                    <li>500 GB Bandwidth</li>
                    <li>No Domain</li>
                    <li>1 User</li>
                    <li>Email Support</li>
                    <li>24x7 Support</li>
                  </ul>
                  <button className="btn btn-primary mt-4 mb-2 btn-rounded">
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-pricing card-pricing-recommended">
                <div className="card-body text-center">
                  <div className="card-pricing-plan-tag">Recommended</div>
                  <p className="card-pricing-plan-name fw-bold text-uppercase">
                    Multiple License
                  </p>
                  <i className="card-pricing-icon dripicons-briefcase text-primary" />
                  <h2 className="card-pricing-price">
                    $99 <span>/ License</span>
                  </h2>
                  <ul className="card-pricing-features">
                    <li>50 GB Storage</li>
                    <li>900 GB Bandwidth</li>
                    <li>2 Domain</li>
                    <li>10 User</li>
                    <li>Email Support</li>
                    <li>24x7 Support</li>
                  </ul>
                  <button className="btn btn-primary mt-4 mb-2 btn-rounded">
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-pricing">
                <div className="card-body text-center">
                  <p className="card-pricing-plan-name fw-bold text-uppercase">
                    Extended License
                  </p>
                  <i className="card-pricing-icon dripicons-store text-primary" />
                  <h2 className="card-pricing-price">
                    $599 <span>/ License</span>
                  </h2>
                  <ul className="card-pricing-features">
                    <li>100 GB Storege</li>
                    <li>Unlimited Bandwidth</li>
                    <li>10 Domain</li>
                    <li>Unlimited User</li>
                    <li>Email Support</li>
                    <li>24x7 Support</li>
                  </ul>
                  <button className="btn btn-primary mt-4 mb-2 btn-rounded">
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h1 className="mt-0">
                  <i className="mdi mdi-frequently-asked-questions" />
                </h1>
                <h3>
                  Frequently Asked{" "}
                  <span className="text-primary">Questions</span>
                </h3>
                <p className="text-muted mt-2">
                  Here are some of the basic types of questions for our
                  customers. For more
                  <br />
                  information please contact us.
                </p>
                <button type="button" className="btn btn-success btn-sm mt-2">
                  <i className="mdi mdi-email-outline me-1" /> Email us your
                  question
                </button>
                <button type="button" className="btn btn-info btn-sm mt-2 ms-1">
                  <i className="mdi mdi-twitter me-1" />
                  Send us a tweet
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-5 offset-lg-1">
              <div>
                <div className="faq-question-q-box">Q.</div>
                <h4 className="faq-question text-body">
                  Can I use this template for my client?
                </h4>
                <p className="faq-answer mb-4 pb-1 text-muted">
                  Yup, the marketplace license allows you to use this theme in
                  any end products. For more information on licenses, please
                  refere{" "}
                  <a href="../../licenses/index.htm" target="_blank">
                    here
                  </a>
                  .
                </p>
              </div>
              <div>
                <div className="faq-question-q-box">Q.</div>
                <h4 className="faq-question text-body">
                  How do I get help with the theme?
                </h4>
                <p className="faq-answer mb-4 pb-1 text-muted">
                  Use our dedicated support email (support@coderthemes.com) to
                  send your issues or feedback. We are here to help anytime.
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <div>
                <div className="faq-question-q-box">Q.</div>
                <h4 className="faq-question text-body">
                  Can this theme work with Wordpress?
                </h4>
                <p className="faq-answer mb-4 pb-1 text-muted">
                  No. This is a HTML template. It won't directly with wordpress,
                  though you can convert this into wordpress compatible theme.
                </p>
              </div>
              <div>
                <div className="faq-question-q-box">Q.</div>
                <h4 className="faq-question text-body">
                  Will you regularly give updates of Hyper?
                </h4>
                <p className="faq-answer mb-4 pb-1 text-muted">
                  Yes, We will update the Hyper regularly. All the future
                  updates would be available without any cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-light-lighten border-top border-bottom border-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h3>
                  Get In <span className="text-primary">Touch</span>
                </h3>
                <p className="text-muted mt-2">
                  Please fill out the following form and we will get back to you
                  shortly. For more
                  <br />
                  information please contact us.
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-center mt-3">
            <div className="col-md-4">
              <p className="text-muted">
                <span className="fw-bold">Customer Support:</span>
                <br /> <span className="d-block mt-1">+1 234 56 7894</span>
              </p>
              <p className="text-muted mt-4">
                <span className="fw-bold">Email Address:</span>
                <br /> <span className="d-block mt-1">info@gmail.com</span>
              </p>
              <p className="text-muted mt-4">
                <span className="fw-bold">Office Address:</span>
                <br />{" "}
                <span className="d-block mt-1">
                  4461 Cedar Street Moro, AR 72368
                </span>
              </p>
              <p className="text-muted mt-4">
                <span className="fw-bold">Office Time:</span>
                <br /> <span className="d-block mt-1">9:00AM To 6:00PM</span>
              </p>
            </div>
            <div className="col-md-8">
              <form>
                <div className="row mt-4">
                  <div className="col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="fullname" className="form-label">
                        Your Name
                      </label>
                      <input
                        className="form-control form-control-light"
                        type="text"
                        id="fullname"
                        placeholder="Name..."
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="emailaddress" className="form-label">
                        Your Email
                      </label>
                      <input
                        className="form-control form-control-light"
                        type="email"
                        required=""
                        id="emailaddress"
                        placeholder="Enter you email..."
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-lg-12">
                    <div className="mb-2">
                      <label htmlFor="subject" className="form-label">
                        Your Subject
                      </label>
                      <input
                        className="form-control form-control-light"
                        type="text"
                        id="subject"
                        placeholder="Enter subject..."
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-lg-12">
                    <div className="mb-2">
                      <label htmlFor="comments" className="form-label">
                        Message
                      </label>
                      <textarea
                        id="comments"
                        rows={4}
                        className="form-control form-control-light"
                        placeholder="Type your message here..."
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12 text-end">
                    <button className="btn btn-primary">
                      Send a Message <i className="mdi mdi-telegram ms-1" />
                    </button>
                  </div>
                </div>
              </form>
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
