import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FloatingCourses from "../components/home/FloatingCourses";
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

        {/* Hero */}
        <section id="home">
          <Hero />
        </section>

        {/* Categories */}
        <section id="categories">
          <Categories />
        </section>

        {/* Floating Courses */}
        <section id="courses">
          <FloatingCourses />
        </section>

        {/* About */}
        <section
          id="about"
          className="scroll-mt-24 space-y-10"
        >
          <WhyChooseUs />
          <Testimonials />
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-24"
        >
          <ContactForm />
        </section>

      </main>

      <ScrollToTop />
      <Footer />
    </>
  );
};

export default Home;