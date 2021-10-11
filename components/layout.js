import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <main className="container mx-auto md:px-6">{children}</main>
      <Footer />
    </>
  );
}
