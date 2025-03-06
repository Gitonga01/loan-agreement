import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SignaturePad from "react-signature-canvas";
import Link from "next/link";

export default function LoanAgreement() {
  const [signature, setSignature] = useState(null);
  const [name, setName] = useState("");
  let sigPad = {};

  const clearSignature = () => {
    sigPad.clear();
    setSignature(null);
  };

  const saveSignature = () => {
    setSignature(sigPad.getTrimmedCanvas().toDataURL("image/png"));
  };

  const handleSubmit = async () => {
    if (!name || !signature) {
      alert("Please provide your name and signature.");
      return;
    }
    
    const response = await fetch("/api/submit-agreement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, signature })
    });
    
    if (response.ok) {
      alert("Agreement submitted successfully!");
    } else {
      alert("Failed to submit agreement.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-3xl font-bold">Loan Agreement</h1>
      <Card className="w-full max-w-2xl p-4 shadow-lg">
        <CardContent>
          <p className="mb-4">Please review and accept the loan terms before signing.</p>
          <div className="border p-2 mb-4">
            <SignaturePad
              ref={(ref) => (sigPad = ref)}
              canvasProps={{ className: "w-full h-40 border" }}
            />
            <div className="flex space-x-2 mt-2">
              <Button onClick={clearSignature} variant="outline">Clear</Button>
              <Button onClick={saveSignature}>Save Signature</Button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-2 border rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleSubmit} className="w-full">Submit Agreement</Button>
        </CardContent>
      </Card>
      <div className="flex space-x-4">
        <Link href="/faq" className="hover:underline">FAQ</Link>
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        <Link href="/promotions" className="hover:underline">Promotions</Link>
        <Link href="/terms" className="hover:underline">Terms of Service</Link>
      </div>
    </div>
  );
}
