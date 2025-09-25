import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Upload, X } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Phone",
  "Wallet", 
  "Keys",
  "ID Card",
  "Books",
  "Bag",
  "Electronics",
  "Other"
];

const PostItem = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    type: searchParams.get("type") === "found" ? "Found" : searchParams.get("type") === "lost" ? "Lost" : "",
    category: "",
    date_seen: undefined as Date | undefined,
    location_text: "",
    description: "",
    posted_by_name: "",
    posted_by_email: "",
  });
  
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This would create a new row in Items table with status = Pending
    // For now, just show success message
    
    setTimeout(() => {
      toast({
        title: "Item posted successfully!",
        description: "Thanks — your post is pending admin approval. You'll be notified once it's reviewed.",
      });
      
      // Reset form
      setFormData({
        title: "",
        type: "",
        category: "",
        date_seen: undefined,
        location_text: "",
        description: "",
        posted_by_name: "",
        posted_by_email: "",
      });
      setSelectedImages([]);
      setIsSubmitting(false);
      
      // Navigate to items page
      navigate("/items");
    }, 1000);
  };

  const isFormValid = formData.title && formData.type && formData.category && 
                     formData.date_seen && formData.location_text && formData.description &&
                     formData.posted_by_name && formData.posted_by_email;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold">Post an Item</h1>
          <p className="text-lg text-muted-foreground">
            Help reunite belongings with their owners by posting lost or found items.
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help with identification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Item Type *</Label>
                <RadioGroup 
                  value={formData.type} 
                  onValueChange={(value) => handleInputChange("type", value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Lost" id="lost" />
                    <Label htmlFor="lost" className="cursor-pointer">Lost Item</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Found" id="found" />
                    <Label htmlFor="found" className="cursor-pointer">Found Item</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">Item Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., iPhone 13 Pro, Blue Backpack, Student ID Card"
                  className="text-base"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-medium">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
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

              {/* Date Seen */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Date {formData.type === "Lost" ? "Lost" : formData.type === "Found" ? "Found" : "Seen"} *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date_seen ? format(formData.date_seen, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date_seen}
                      onSelect={(date) => setFormData(prev => ({ ...prev, date_seen: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base font-medium">Location *</Label>
                <Input
                  id="location"
                  value={formData.location_text}
                  onChange={(e) => handleInputChange("location_text", e.target.value)}
                  placeholder="e.g., Library 2nd Floor, Student Center, Parking Lot C"
                  className="text-base"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Provide detailed description including color, brand, distinctive features, etc."
                  rows={4}
                  className="text-base"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Photos (Optional)</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB (max 5 images)</p>
                      </div>
                      <input 
                        id="images" 
                        type="file" 
                        className="hidden" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  
                  {selectedImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedImages.map((file, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-2 px-3 py-1">
                          <span className="text-xs">{file.name.substring(0, 20)}...</span>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.posted_by_name}
                      onChange={(e) => handleInputChange("posted_by_name", e.target.value)}
                      placeholder="Enter your full name"
                      className="text-base"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">Your Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.posted_by_email}
                      onChange={(e) => handleInputChange("posted_by_email", e.target.value)}
                      placeholder="your@email.com"
                      className="text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full text-base py-6" 
                size="lg"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post Item"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Note */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Note:</strong> All posts are reviewed by our admin team before being published. 
              This helps maintain quality and reduce spam. You'll receive an email notification once your post is approved.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostItem;