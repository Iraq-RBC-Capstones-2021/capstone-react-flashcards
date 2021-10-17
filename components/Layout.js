import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="container mx-auto md:px-6">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
