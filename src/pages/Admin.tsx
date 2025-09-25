import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Clock, CheckCircle, XCircle, Eye, Settings, Users, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - will be replaced with Supabase data
const mockPendingItems = [
  {
    id: 1,
    title: "MacBook Pro 14-inch",
    type: "Lost",
    category: "Electronics", 
    status: "Pending",
    posted_by_name: "Sarah Johnson",
    posted_by_email: "sarah.j@campus.edu",
    created_at: "2024-01-15T14:30:00Z",
    description: "Silver MacBook Pro with university stickers, last seen in library",
    location_text: "Main Library 3rd Floor"
  },
  {
    id: 2,
    title: "Red Wallet", 
    type: "Found",
    category: "Wallet",
    status: "Pending",
    posted_by_name: "Mike Chen",
    posted_by_email: "m.chen@campus.edu", 
    created_at: "2024-01-15T12:15:00Z",
    description: "Red leather wallet found in cafeteria, contains student ID",
    location_text: "Student Cafeteria Table 8"
  },
  {
    id: 3,
    title: "Blue Backpack",
    type: "Found", 
    category: "Bag",
    status: "Pending",
    posted_by_name: "Emma Wilson",
    posted_by_email: "emma.w@campus.edu",
    created_at: "2024-01-14T16:45:00Z", 
    description: "Large blue Nike backpack with laptop compartment",
    location_text: "Gym Locker Room"
  }
];

const mockStats = {
  totalItems: 156,
  pendingItems: 3,
  approvedItems: 142,
  resolvedItems: 89,
  activeUsers: 234
};

const Admin = () => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // This would check user role from Supabase
  const isAdmin = true; // Mock admin check

  const handleStatusUpdate = (itemId: number, newStatus: string) => {
    // This would update the status in Supabase Items table
    toast({
      title: "Status updated",
      description: `Item has been ${newStatus.toLowerCase()}.`,
      variant: newStatus === "Approved" ? "default" : "destructive",
    });
  };

  const viewItemDetail = (item: any) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert className="max-w-md mx-auto">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Access denied. Admin privileges required to view this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <span>Admin Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage lost and found items and review pending submissions.
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mockStats.totalItems}</div>
            <div className="text-sm text-muted-foreground">Total Items</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{mockStats.pendingItems}</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{mockStats.approvedItems}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{mockStats.resolvedItems}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{mockStats.activeUsers}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Pending Items</span>
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Approved</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Pending Items Tab */}
        <TabsContent value="pending" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Items Pending Review</CardTitle>
              <CardDescription>
                Review and approve or reject submitted items. Click on any item to view full details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockPendingItems.length > 0 ? (
                <div className="space-y-4">
                  {mockPendingItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{item.title}</h3>
                          <Badge variant={item.type === "Lost" ? "destructive" : "secondary"}>
                            {item.type}
                          </Badge>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Posted by: {item.posted_by_name} ({item.posted_by_email})</p>
                          <p>Location: {item.location_text}</p>
                          <p>Date: {new Date(item.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewItemDetail(item)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        
                        <Select onValueChange={(value) => handleStatusUpdate(item.id, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Approved">
                              <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2 text-success" />
                                Approve
                              </div>
                            </SelectItem>
                            <SelectItem value="Rejected">
                              <div className="flex items-center">
                                <XCircle className="h-4 w-4 mr-2 text-destructive" />
                                Reject
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No items pending review</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would be implemented similarly */}
        <TabsContent value="approved">
          <Card className="shadow-soft">
            <CardContent className="text-center py-12">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Approved Items</h3>
              <p className="text-muted-foreground">This section will show all approved items with management options.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="shadow-soft">
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">User Management</h3>
              <p className="text-muted-foreground">This section will show user management and role assignment features.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="shadow-soft">
            <CardContent className="text-center py-12">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
              <p className="text-muted-foreground">This section will show usage statistics, trends, and detailed reports.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Item Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
            <DialogDescription>
              Review this item submission before making a decision.
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Title:</strong> {selectedItem.title}
                </div>
                <div>
                  <strong>Type:</strong> {selectedItem.type}
                </div>
                <div>
                  <strong>Category:</strong> {selectedItem.category}
                </div>
                <div>
                  <strong>Posted by:</strong> {selectedItem.posted_by_name}
                </div>
                <div>
                  <strong>Email:</strong> {selectedItem.posted_by_email}
                </div>
                <div>
                  <strong>Location:</strong> {selectedItem.location_text}
                </div>
              </div>
              <div>
                <strong>Description:</strong>
                <p className="mt-1 text-muted-foreground">{selectedItem.description}</p>
              </div>
              <div className="flex space-x-3 pt-4 border-t">
                <Button 
                  onClick={() => handleStatusUpdate(selectedItem.id, "Approved")}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleStatusUpdate(selectedItem.id, "Rejected")}
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
