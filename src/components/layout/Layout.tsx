import Header from "./Header";
import Footer from "./Footer";
import { StarryBackground } from "../effects/StarryBackground";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col max-w-7xl mx-auto">
      <StarryBackground className="z-[0]" />
      <Header />
      <main className="flex-grow pt-16 h-auto bg-background">{children}</main>
      <Footer />
    </div>
  );
}
