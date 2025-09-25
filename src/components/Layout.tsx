import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Home, List, Plus, Info, Mail, Shield } from "lucide-react";

const Layout = () => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Browse Items", href: "/items", icon: List },
    { name: "Post Item", href: "/post", icon: Plus },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md shadow-soft">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hero-gradient">
                <Search className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Lost & Found</h1>
                <p className="text-xs text-muted-foreground">Campus Portal</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant={isActive(item.href) ? "default" : "ghost"}
                    asChild
                    className="transition-smooth"
                  >
                    <Link to={item.href} className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                );
              })}
              
              {/* Admin Link - TODO: Show only for admin users */}
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button variant="outline" size="sm" className="md:hidden">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-b bg-card shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 py-2 overflow-x-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="whitespace-nowrap transition-smooth"
                >
                  <Link to={item.href} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-hero-gradient">
                <Search className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Lost & Found Portal</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Helping campus community reunite with their belongings
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-smooth">About</Link>
              <Link to="/contact" className="hover:text-foreground transition-smooth">Contact</Link>
              <Link to="/" className="hover:text-foreground transition-smooth">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;