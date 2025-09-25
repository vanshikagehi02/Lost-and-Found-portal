import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Shield, Users, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold">About Lost & Found</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our mission is to help campus community members reunite with their belongings through a secure, student-run platform.
        </p>
      </div>

      {/* Main Content */}
      <Card className="shadow-soft">
        <CardContent className="prose prose-gray max-w-none pt-6">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Lost & Found is a student-run portal that helps reunite belongings with their rightful owners. 
              We understand how stressful it can be to lose something important, especially during busy academic periods.
            </p>

            <p className="leading-relaxed">
              Our platform serves as a central hub where students, faculty, and staff can report lost items 
              or post found belongings. All posts are carefully reviewed by our admin team to reduce spam 
              and ensure the quality of listings.
            </p>

            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Safety First
              </h3>
              <p className="leading-relaxed">
                Please follow these safety tips when meeting to exchange items:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
                <li>Meet in well-lit, public areas on campus</li>
                <li>Bring a friend when possible</li>
                <li>Verify ownership through detailed descriptions</li>
                <li>Trust your instincts - if something feels wrong, don't proceed</li>
                <li>Contact campus security if you feel unsafe</li>
              </ul>
            </div>

            <p className="leading-relaxed">
              We're committed to creating a trustworthy environment where community members can help each other. 
              By working together, we can make our campus a place where lost items find their way home.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center shadow-soft">
          <CardHeader>
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Easy to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Simple interface makes it easy to post lost or found items with detailed descriptions and photos.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center shadow-soft">
          <CardHeader>
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Admin Reviewed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All posts are reviewed by our admin team to ensure quality and reduce spam for a better experience.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center shadow-soft">
          <CardHeader>
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Community Driven</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Run by students, for students. We're here to help our campus community look out for each other.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-muted/30 rounded-lg p-8 space-y-4">
        <h2 className="text-2xl font-bold">Ready to Help?</h2>
        <p className="text-muted-foreground">
          Join our community effort to reunite belongings with their owners.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/post">Post an Item</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/items">Browse Items</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;