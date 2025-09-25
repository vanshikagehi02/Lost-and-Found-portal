import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Search, Filter, MapPin, Clock, Tag } from "lucide-react";

// Mock data - will be replaced with Supabase data
const mockItems = [
  {
    id: 1,
    title: "iPhone 13 Pro Max",
    type: "Lost",
    category: "Phone",
    date_seen: "2024-01-15",
    location_text: "Library 2nd Floor",
    description: "Black iPhone 13 Pro Max with cracked screen protector",
    image: "/placeholder.svg",
    status: "Approved"
  },
  {
    id: 2,
    title: "Blue Nike Backpack",
    type: "Found",
    category: "Bag",
    date_seen: "2024-01-14",
    location_text: "Student Center Main Hall",
    description: "Large blue Nike backpack with laptop compartment",
    image: "/placeholder.svg",
    status: "Approved"
  },
  {
    id: 3,
    title: "Student ID - Sarah Chen",
    type: "Found",
    category: "ID Card",
    date_seen: "2024-01-13",
    location_text: "Cafeteria Table 12",
    description: "Student ID card for Sarah Chen, Computer Science major",
    image: "/placeholder.svg",
    status: "Approved"
  },
  {
    id: 4,
    title: "AirPods Pro 2nd Gen",
    type: "Lost",
    category: "Electronics",
    date_seen: "2024-01-12",
    location_text: "Campus Gym Locker Room",
    description: "White AirPods Pro with custom engraving 'MC'",
    image: "/placeholder.svg",
    status: "Approved"
  },
  {
    id: 5,
    title: "Black Leather Wallet",
    type: "Found",
    category: "Wallet",
    date_seen: "2024-01-11",
    location_text: "Parking Lot C",
    description: "Black leather wallet with multiple cards inside",
    image: "/placeholder.svg",
    status: "Approved"
  },
  {
    id: 6,
    title: "Chemistry Textbook",
    type: "Lost",
    category: "Books",
    date_seen: "2024-01-10",
    location_text: "Science Building Room 204",
    description: "Organic Chemistry 8th Edition with highlighted notes",
    image: "/placeholder.svg",
    status: "Approved"
  }
];

const categories = [
  "All Categories",
  "Phone",
  "Wallet", 
  "Keys",
  "ID Card",
  "Books",
  "Bag",
  "Electronics",
  "Other"
];

const Items = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedType, setSelectedType] = useState("All Types");

  // Filter items based on search and filters
  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    const matchesType = selectedType === "All Types" || item.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold">Browse Items</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Search through all approved lost and found items. Use filters to narrow down your search.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                  <SelectItem value="Found">Found</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="flex justify-between items-center pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {filteredItems.length} of {mockItems.length} items
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/post">Post New Item</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
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
                  <div className="flex items-center justify-between mb-2">
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
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{item.location_text}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span>{new Date(item.date_seen).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-16">
          <CardContent>
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All Categories");
              setSelectedType("All Types");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Items;