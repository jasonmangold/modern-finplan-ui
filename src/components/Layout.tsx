
import { Header } from "./Header";
import { TopNavigation } from "./TopNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TopNavigation />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default Layout;
