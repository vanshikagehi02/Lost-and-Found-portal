import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, Plus, Clock, MapPin, Tag } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

// Mock data for recent items - will be replaced with Supabase data
const recentItems = [
  {
    id: 1,
    title: "iPhone 13 Pro",
    type: "Lost",
    category: "Phone",
    date_seen: "2024-01-15",
    location_text: "Library 2nd Floor",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Blue Backpack",
    type: "Found",
    category: "Bag",
    date_seen: "2024-01-14",
    location_text: "Student Center",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Student ID Card",
    type: "Found",
    category: "ID Card",
    date_seen: "2024-01-13",
    location_text: "Cafeteria",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "AirPods Pro",
    type: "Lost",
    category: "Electronics",
    date_seen: "2024-01-12",
    location_text: "Gym",
    image: "/placeholder.svg"
  }
];

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Lost & Found
                </h1>
                <h2 className="text-2xl lg:text-3xl font-light opacity-90">
                  Campus Portal
                </h2>
                <p className="text-xl lg:text-2xl opacity-80 font-light">
                  Find what you lost. Return what you found.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  asChild
                  className="text-lg px-8 py-6 shadow-medium hover:shadow-strong transition-smooth"
                >
                  <Link to="/post?type=lost" className="flex items-center space-x-2">
                    <Search className="h-5 w-5" />
                    <span>Report Lost</span>
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20 shadow-medium hover:shadow-strong transition-smooth"
                >
                  <Link to="/post?type=found" className="flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Report Found</span>
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Lost and Found Office" 
                className="rounded-2xl shadow-strong w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Items Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">Recent Items</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse the latest lost and found items. Help reunite belongings with their owners.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-medium transition-smooth cursor-pointer">
                <Link to={`/items/${item.id}`}>
                  <div className="aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={item.type === "Lost" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {item.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {item.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2" />
                        <span className="line-clamp-1">{item.location_text}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-2" />
                        <span>{new Date(item.date_seen).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/items">View All Items</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Simple steps to help reunite belongings with their owners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Report Lost/Found</h3>
              <p className="text-muted-foreground">
                Post details about items you've lost or found on campus with photos and descriptions.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Admin Review</h3>
              <p className="text-muted-foreground">
                All posts are reviewed by our admin team to ensure quality and reduce spam.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Get Connected</h3>
              <p className="text-muted-foreground">
                Browse approved items and connect with owners or finders through our secure messaging system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;