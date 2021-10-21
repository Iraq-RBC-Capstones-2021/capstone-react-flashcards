import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="container mx-auto">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
