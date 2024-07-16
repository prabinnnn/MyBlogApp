import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Card from '../components/card'; // Adjusted import for Card component
import 'bootstrap/dist/css/bootstrap.css';
import Footer from '../components/footer'; // Adjusted import for Footer component
import NavigationBar from '../components/navigationBar'; // Adjusted import for NavigationBar component
import { useBlogContext } from '../contexts/BlogContext';
import { Paginate } from '../components/Paginate';
import hompageImage from '../assets/hompage.png'; // Importing hompage image from assets

const HomePage = () => {
  const { pageNo } = useParams();
  const {
    blogs,
    loading,
    error,
    currentPage,
    setCurrentPage,
    total,
    limit,
    setLimit
  } = useBlogContext();

  useEffect(() => {
    const page = parseInt(pageNo, 10) || 1;
    setCurrentPage(page);
  }, [pageNo, setCurrentPage]);

  if (loading) {
    return <h1 className="text-center">Loading... Please Wait...</h1>;
  }

  if (error) {
    return <h1 className="text-center">{error.message}</h1>;
  }

  return (
    <div>
      <NavigationBar />
      <Container>
        <Row>
          {/* Example Card with hardcoded image URL */}
          <Col md={4} sm={6} xs={12}>
            <Card
              name="Example Blog Title"
              id="example-blog-id"
              image={hompageImage} // Pass imported image as the image prop
            />
          </Col>
          
          {/* Render other blog cards dynamically */}
          {blogs && blogs.length > 0 ? blogs.map(blog => (
            <Col key={blog.id} md={4} sm={6} xs={12}>
              <Card
                name={blog.title}
                id={blog.id}
                image={`https://joeschmoe.io/api/v1/${blog.id}`} // Example URL, adjust as per your API response
              />
            </Col>
          )) : (
            <h2 className="text-center">No blogs available</h2>
          )}
        </Row>
        <Paginate
          total={total || 0}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage || 1}
          limit={limit || 20}
          setLimit={setLimit}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;

