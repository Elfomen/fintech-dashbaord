"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Shield,
  CreditCard,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    question: "How do I link a new bank account?",
    answer:
      'Navigate to the Wallets page and click "Link Account". Follow the secure authentication process to connect your bank. We use bank-level encryption to protect your data.',
  },
  {
    question: "How are my transactions categorized?",
    answer:
      "We automatically categorize your transactions using machine learning. You can also manually adjust categories by clicking on any transaction and selecting a new category.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes, we use 256-bit encryption, the same level of security used by major banks. We never store your bank credentials and use read-only access to your accounts.",
  },
  {
    question: "How do I export my transaction history?",
    answer:
      "Go to Transactions, use the filters to select your date range, then click the Export button to download your data as CSV or PDF.",
  },
  {
    question: "What happens if I freeze my card?",
    answer:
      "Freezing your card immediately blocks all new transactions. Recurring payments may still process. You can unfreeze at any time from the Cards page.",
  },
  {
    question: "How do I set up budget alerts?",
    answer:
      "Go to Settings, then Notifications. You can set custom alerts for spending limits, bill reminders, and unusual activity.",
  },
];

const helpCategories = [
  {
    icon: CreditCard,
    title: "Cards & Payments",
    description: "Manage cards, payments, and transfers",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Account protection and privacy settings",
  },
  {
    icon: FileText,
    title: "Billing",
    description: "Subscription and billing questions",
  },
  {
    icon: HelpCircle,
    title: "Getting Started",
    description: "New user guides and tutorials",
  },
];

export default function HelpPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1">
        <div className="p-6 max-w-4xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Help Center</h2>
            <p className="text-muted-foreground">
              Find answers and get support
            </p>
          </div>

          {/* Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for help articles..."
                  className="pl-10 h-12 text-base"
                />
              </div>
            </CardContent>
          </Card>

          {/* Help Categories */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {helpCategories.map((category) => (
              <Card
                key={category.title}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {category.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQs */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Still need help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span>Live Chat</span>
                  <span className="text-xs text-muted-foreground">
                    Available 24/7
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                >
                  <Mail className="h-6 w-6" />
                  <span>Email Support</span>
                  <span className="text-xs text-muted-foreground">
                    Response in 24h
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                >
                  <Phone className="h-6 w-6" />
                  <span>Phone Support</span>
                  <span className="text-xs text-muted-foreground">
                    Mon-Fri 9am-6pm
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
