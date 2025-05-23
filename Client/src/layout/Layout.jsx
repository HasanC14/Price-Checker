import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen dark:bg-[#020817]">
      <Navbar />
      <div className="flex flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
