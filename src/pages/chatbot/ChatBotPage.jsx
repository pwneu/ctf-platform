import MetaComponent from "@/components/MetaComponent";
import Preloader from "@/components/Preloader";
import Header from "@/layout/headers/Header";
import Footer from "@/layout/footers/Footer";
import {
  ChatHeader,
  ChatInterface,
} from "@/features/chatbot";

const metadata = {
  title: "Dash AI || PWNEU",
  description:
    "Dash AI: An advanced AI chatbot designed for CTF challenges, providing hints, guidance, and interactive problem-solving to enhance your cybersecurity skills.",
};

export default function ChatBotPage() {
  return (
    <div className="main-content bg-dark-3">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <ChatHeader />
        <ChatInterface />
        <div className="mt-90"></div>
        <Footer />
      </div>
    </div>
  );
}
