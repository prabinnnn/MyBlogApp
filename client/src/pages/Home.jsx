
import Blogs from "../components/blogs";
import Footer from "../components/footer"; // Corrected import to match component filename casing
import Navbar from "../components/navbar"; // Corrected import to match component filename casing

const Homepage = ({ blogsData }) => {
  return (
    <div>
      <Navbar />
      <Blogs blogsData={blogsData} />
      <Footer />
    </div>
  );
};

export default Homepage;
