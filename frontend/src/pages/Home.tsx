import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedCourses from "../components/home/FeaturedCourses";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/home/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        <Hero />
        <Categories />
        <FeaturedCourses />
        <WhyChooseUs />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
};

export default Home;