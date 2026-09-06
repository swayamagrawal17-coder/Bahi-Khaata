import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollAndFocus from "./components/ScrollAndFocus";
import PaperLines from "./components/PaperLines";
import { LenisProvider } from "./lib/smoothScroll";
import Home from "./pages/Home";

const PostPage = lazy(() => import("./pages/PostPage"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <LenisProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollAndFocus />
      <PaperLines />
      <div className="sheet">
        <Header />
        <main id="main" tabIndex={-1}>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:slug" element={<PostPage />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </LenisProvider>
  );
}
