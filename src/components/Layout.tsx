
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
