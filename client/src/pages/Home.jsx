import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Card from '../components/card'; // Adjusted import for Card component
import 'bootstrap/dist/css/bootstrap.css';
import Footer from '../components/footer'; // Adjusted import for Footer component
import NavigationBar from '../components/navigationBar'; // Adjusted import for NavigationBar component
import { useBlogContext } from '../contexts/BlogContext';
import { Paginate } from '../components/Paginate';

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
    return <h1 className="text-center">{error}</h1>;
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
              image="https://example.com/example.jpg" // Replace with your example image URL
            />
          </Col>

          {/* Render blogs dynamically */}
          {blogs?.map(blog => (
            <Col key={blog.id} md={4} sm={6} xs={12}>
              <Card
                name={blog.title}
                id={blog.id}
                image={`https://joeschmoe.io/api/v1/${blog.id}`} // Example URL, adjust as per your API response
              />
            </Col>
          ))}
        </Row>
        <Paginate
          total={total}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          limit={limit}
          setLimit={setLimit}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;
