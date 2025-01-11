import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col max-w-7xl mx-auto">
      <Header />
      <main className="flex-grow pt-16 h-full bg-background">
        {children}
      </main>
      <Footer />
    </div>
  );
} 