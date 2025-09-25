import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, MapPin, Tag, User, MessageCircle, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - will be replaced with Supabase data
const mockItem = {
  id: 1,
  title: "iPhone 13 Pro Max",
  type: "Lost",
  category: "Phone",
  date_seen: "2024-01-15",
  location_text: "Library 2nd Floor, near the study desks",
  description: "Black iPhone 13 Pro Max with a cracked screen protector. Has a clear case with a PopSocket. Last seen while studying for finals. Please contact if found!",
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  posted_by_name: "Alex Chen",
  status: "Approved",
  created_at: "2024-01-15T10:30:00Z"
};

const ItemDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [isSpamDialogOpen, setIsSpamDialogOpen] = useState(false);
  const [claimMessage, setClaimMessage] = useState("");
  const [claimName, setClaimName] = useState("");
  const [claimEmail, setClaimEmail] = useState("");

  // In real app, this would fetch from Supabase based on id
  const item = mockItem;

  const handleClaimSubmit = () => {
    // This would write to Messages table in Supabase
    toast({
      title: "Message sent!",
      description: "Your claim message has been sent to the poster. They will contact you if it's a match.",
    });
    setIsClaimDialogOpen(false);
    setClaimMessage("");
    setClaimName("");
    setClaimEmail("");
  };

  const handleSpamReport = () => {
    // This would write to Messages table with spam report
    toast({
      title: "Report submitted",
      description: "Thank you for reporting. Our admin team will review this item.",
      variant: "destructive",
    });
    setIsSpamDialogOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  if (!item) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-16">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Item not found</h2>
            <p className="text-muted-foreground mb-6">
              The item you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/items">Back to Items</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/items" className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Items</span>
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <img 
              src={item.images[currentImageIndex]} 
              alt={`${item.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {item.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Image thumbnails */}
          {item.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={item.type === "Lost" ? "destructive" : "secondary"}
                      className="text-sm"
                    >
                      {item.type}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      <Tag className="h-3 w-3 mr-1" />
                      {item.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl lg:text-3xl">{item.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date {item.type === "Lost" ? "Lost" : "Found"}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.date_seen).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{item.location_text}</p>
                  </div>
                </div>

                {item.posted_by_name && (
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Posted by</p>
                      <p className="text-sm text-muted-foreground">{item.posted_by_name}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Posted on</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex-1" size="lg">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {item.type === "Lost" ? "I Found This" : "This is Mine"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact About This Item</DialogTitle>
                      <DialogDescription>
                        Send a message to the person who posted this item. Include details to help verify ownership.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="claim-name">Your Name</Label>
                          <Input
                            id="claim-name"
                            value={claimName}
                            onChange={(e) => setClaimName(e.target.value)}
                            placeholder="Enter your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="claim-email">Your Email</Label>
                          <Input
                            id="claim-email"
                            type="email"
                            value={claimEmail}
                            onChange={(e) => setClaimEmail(e.target.value)}
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="claim-message">Message</Label>
                        <Textarea
                          id="claim-message"
                          value={claimMessage}
                          onChange={(e) => setClaimMessage(e.target.value)}
                          placeholder="Provide details about the item to help verify ownership..."
                          rows={4}
                        />
                      </div>
                      <Button 
                        onClick={handleClaimSubmit} 
                        className="w-full"
                        disabled={!claimName || !claimEmail || !claimMessage}
                      >
                        Send Message
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isSpamDialogOpen} onOpenChange={setIsSpamDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="lg">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Report Spam
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Report Spam</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to report this item as spam? Our admin team will review it.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={() => setIsSpamDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleSpamReport}>
                        Report Spam
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;