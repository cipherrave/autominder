import * as React from "react";
import MileageDrawer from "../Drawer/MileageDrawer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const invoices = [
  {
    invoice: "INV001",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function SummaryDash() {
  return (
    <div className="flex flex-wrap gap-3 flex-shrink w-full">
      <Card className="flex-grow sm:max-h-[400px] h-auto">
        <CardHeader>
          <CardTitle className="text-5xl">Summary</CardTitle>
          <CardDescription className="pt-3">
            The following are the summary of your driving trend{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="md:flex-row sm:flex justify-evenly sm:justify-center gap-5 text-center w-full">
          <div className="w-full sm:w-1/3 h-32">
            <h1 className="text-2xl ml-[-5px]">🚘🏍️</h1>
            <h1>You own</h1>
            <h1 className="text-3xl font-semibold">3</h1>
            <p>vehicles</p>
          </div>
          <div className="w-full sm:w-1/3  h-32">
            <h1 className="text-2xl ml-[-5px]">🛣️</h1>
            <h1>You drove</h1>
            <h1 className="text-3xl font-semibold">500,000 km</h1>
            <p>in total</p>
          </div>
          <div className="w-full sm:w-1/3  h-32">
            <h1 className="text-2xl ml-[-5px]">💸</h1>
            <h1>You spent</h1>
            <h1 className="text-3xl font-semibold">RM 3000</h1>
            <p>on services</p>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button className="w-full" onClick={MileageDrawer}>
            Update Mileage
          </Button>
        </CardFooter>
      </Card>
      <Card className=" flex-grow w-[400px]">
        <CardHeader>
          <CardTitle>Attention</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
      <Card className=" flex-grow w-[400px]">
        <CardHeader>
          <CardTitle>Attention</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
