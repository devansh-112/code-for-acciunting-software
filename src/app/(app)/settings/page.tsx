
'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { companyDetails, setCompanyDetails } from "@/lib/data"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  const [details, setDetails] = useState(companyDetails);

  const handleCompanyDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id.includes('.')) {
      const [parent, child] = id.split('.');
      setDetails(prev => ({
        ...prev,
        [parent]: {
          // @ts-ignore
          ...prev[parent],
          [child]: value,
        }
      }));
    } else if (id === 'terms') {
       setDetails(prev => ({ ...prev, terms: value.split('\n') }));
    }
    else {
      setDetails(prev => ({ ...prev, [id]: value }));
    }
  };

  const saveCompanyDetails = () => {
    setCompanyDetails(details);
    // Here you would typically save to a DB/API
    alert("Company details saved!");
  }


  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" className="bg-card" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="john.doe@example.com" type="email" className="bg-card" />
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle className="font-headline">Company Details</CardTitle>
            <CardDescription>This information will appear on your invoices.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="name" value={details.name} onChange={handleCompanyDetailsChange} className="bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstin">Company GSTIN</Label>
                  <Input id="gstin" value={details.gstin} onChange={handleCompanyDetailsChange} className="bg-card" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Company Address</Label>
                <Input id="address" value={details.address} onChange={handleCompanyDetailsChange} className="bg-card" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Company Email</Label>
                  <Input id="email" type="email" value={details.email} onChange={handleCompanyDetailsChange} className="bg-card" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="phone">Company Phone</Label>
                  <Input id="phone" value={details.phone} onChange={handleCompanyDetailsChange} className="bg-card" />
                </div>
              </div>
               <h3 className="text-lg font-medium pt-4">Bank Details</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankDetails.name">Bank Name</Label>
                    <Input id="bankDetails.name" value={details.bankDetails.name} onChange={handleCompanyDetailsChange} className="bg-card" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="bankDetails.branch">Branch</Label>
                    <Input id="bankDetails.branch" value={details.bankDetails.branch} onChange={handleCompanyDetailsChange} className="bg-card" />
                  </div>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankDetails.accountNumber">Account Number</Label>
                    <Input id="bankDetails.accountNumber" value={details.bankDetails.accountNumber} onChange={handleCompanyDetailsChange} className="bg-card" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="bankDetails.ifsc">IFSC Code</Label>
                    <Input id="bankDetails.ifsc" value={details.bankDetails.ifsc} onChange={handleCompanyDetailsChange} className="bg-card" />
                  </div>
              </div>
               <h3 className="text-lg font-medium pt-4">Terms & Conditions</h3>
                <div className="space-y-2">
                  <Label htmlFor="terms">Terms (one per line)</Label>
                  <Textarea id="terms" value={details.terms.join('\n')} onChange={handleCompanyDetailsChange} className="bg-card" />
                </div>
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={saveCompanyDetails}>Save Company Details</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="theme">Theme</Label>
                    <p className="text-sm text-muted-foreground">Select your preferred color scheme.</p>
                </div>
                <ThemeToggle />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
