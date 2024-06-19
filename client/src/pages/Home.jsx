import { useBlogContext } from '../contexts/BlogContext';

const Home = () => {
  const {
    blogs,
    loading,
    error,
    setTitle,
    setCurrentPage,
    total,
    currentPage,
    limit,
  } = useBlogContext();

  return (
    <div>
      <div className="h-100 d-flex w-100 m-auto">
        <div className="container mb-5">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <img
                  src="logo.png"
                  alt="Logo"
                  width="30"
                  height="24"
                  className="d-inline-block align-text-top"
                />
                blog 2.0
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Contact</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">About Us</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Tech</a></li>
                      <li>
                        <a className="dropdown-item" href="#">Home Appliance</a>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <a className="dropdown-item" href="#">Something else here</a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
                <button type="button" className="m-2 btn-secondary">
                  <i className="fa fa-bookmark"></i>
                  <span className="badge text-bg-secondary">4</span>
                </button>
              </div>
            </div>
          </nav>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2000"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="room.png" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="room.png" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="room.png" className="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <div className="h4 mt-4 mb-4">Featured Blogs</div>
          <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
            {blogs?.map((blog) => (
              <div className="col" key={blog.id}>
                <div className="card h-100">
                  <img src={blog.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.description}</p>
                    <p className="card-text">
                      <a className="text-decoration-none" href={`/blog-details/${blog.id}`}>
                        Continue reading
                      </a>
                    </p>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col">
                        <small className="text-body-secondary">Last updated {blog.updatedAt}</small>
                      </div>
                      <div className="col text-end">
                        <i className="btn fa fa-bookmark"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex align-text-center justify-content-center">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(Math.ceil(total / limit)).keys()].map((page) => (
                  <li className={`page-item ${page + 1 === currentPage ? 'active' : ''}`} key={page}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page + 1)}
                    >
                      {page + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === Math.ceil(total / limit) ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <footer
            className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
          >
            <div className="col-md-4 d-flex align-items-center">
              <a
                href="/"
                className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
              >
              </a>
              <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Blog, Inc</span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <i className="fa fa-github"></i>
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
