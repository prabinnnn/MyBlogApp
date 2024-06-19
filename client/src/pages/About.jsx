const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h2 className="page-title">About Us</h2>
        <div className="about-content">
          <p>
            Welcome to our blog! We are passionate about sharing knowledge and
            insights on various topics related to [your blogs focus]. Our goal
            is to provide valuable information to our readers in an engaging
            and informative way.
          </p>
          <p>
            Whether youre interested in [specific topics your blog covers],
            looking for [specific types of content], or simply browsing for
            inspiration, we hope you find our blog useful and enjoyable.
          </p>
          <p>
            Feel free to explore our articles and leave comments to join the
            conversation. If you have any questions or suggestions, please
            dont hesitate to <a href="/contact">contact us</a>. Wed love to
            hear from you!
          </p>
          <p>Thank you for visiting!</p>
        </div>
      </div>
    </div>
  );
};

export default About;