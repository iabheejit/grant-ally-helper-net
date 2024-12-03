import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [orgName, setOrgName] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [grantTopic, setGrantTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !orgDescription || !grantTopic) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before generating suggestions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to Azure OpenAI
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setResult(
        `Based on your input for ${orgName}, here are some suggestions for your grant proposal on ${grantTopic}:\n\n` +
        "1. Focus on demonstrating clear impact metrics\n" +
        "2. Highlight your organization's unique approach\n" +
        "3. Include specific timeline and milestones\n" +
        "4. Detail the sustainability of your proposed project"
      );
      toast({
        title: "Success!",
        description: "Grant writing suggestions generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Grant Writing Assistant</h1>
          <p className="text-gray-600">Get AI-powered suggestions for your grant proposal</p>
        </div>

        <Card className="p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Organization Name</label>
              <Input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Enter your organization's name"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Organization Description</label>
              <Textarea
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
                placeholder="Briefly describe your organization's mission and work"
                className="w-full min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Grant Topic</label>
              <Input
                value={grantTopic}
                onChange={(e) => setGrantTopic(e.target.value)}
                placeholder="What is the focus of your grant proposal?"
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Suggestions...
                </>
              ) : (
                "Generate Suggestions"
              )}
            </Button>
          </form>
        </Card>

        {result && (
          <Card className="p-6 shadow-lg bg-white">
            <h2 className="text-xl font-semibold mb-4">AI Suggestions</h2>
            <div className="whitespace-pre-wrap text-gray-700">{result}</div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;