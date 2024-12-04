import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import Footer from "@/layout/footers/Footer";
import { DevFounder} from "@/features/about";

const metadata = {
  title: "Who We Are || PWNEU",
  description:
    "Get to know PWNEU—our team, our values, and what makes us unique in the world of competitive challenges.",
};

export default function WhoWeArePage() {
  return (
    <div className="main-content">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <DevFounder />
        <Footer />
      </div>
    </div>
  );
}
