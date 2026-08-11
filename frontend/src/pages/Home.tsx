import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedCourses from "../components/home/FeaturedCourses";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import ContactForm from "../components/home/ContactForm";
import Footer from "../components/home/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

const Home = () => {
  return (
    <>
      <Navbar />

<main className="pt-16">

  <section id="home">
    <Hero />
  </section>

  <section id="categories">
    <Categories />
  </section>

  <section id="courses">
    <FeaturedCourses />
  </section>

  {/* About */}
  <section id="about" className="scroll-mt-24 space-y-10">
    <WhyChooseUs />
    <Testimonials />
  </section>

  {/* Contact */}
  <section id="contact" className="scroll-mt-24">
    <ContactForm />
  </section>

</main>

<ScrollToTop />
<Footer />


    </>
  );
};

export default Home;