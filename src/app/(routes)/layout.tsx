import { Header } from "src/components/global/Header";
import { Footer } from "src/components/global/Footer";

const RoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default RoutesLayout;
