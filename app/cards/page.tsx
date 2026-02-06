"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { CreditCard, Plus, Lock, Eye, EyeOff, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const cards = [
  {
    id: "1",
    name: "Premium Card",
    number: "**** **** **** 4532",
    fullNumber: "4532 8721 9043 4532",
    expiry: "12/28",
    cvv: "***",
    balance: 12450,
    limit: 25000,
    color: "from-emerald-600 to-emerald-800",
    type: "Visa",
    status: "active",
  },
  {
    id: "2",
    name: "Business Card",
    number: "**** **** **** 8891",
    fullNumber: "5421 3321 7789 8891",
    expiry: "09/27",
    cvv: "***",
    balance: 8320,
    limit: 15000,
    color: "from-blue-600 to-blue-800",
    type: "Mastercard",
    status: "active",
  },
  {
    id: "3",
    name: "Savings Card",
    number: "**** **** **** 2234",
    fullNumber: "3782 8224 6310 2234",
    expiry: "03/26",
    cvv: "***",
    balance: 45200,
    limit: 50000,
    color: "from-purple-600 to-purple-800",
    type: "Amex",
    status: "frozen",
  },
];

export default function CardsPage() {
  const [showNumbers, setShowNumbers] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleShowNumber = (id: string) => {
    setShowNumbers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyNumber = (id: string, number: string) => {
    navigator.clipboard.writeText(number.replace(/\s/g, ""));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <main className="w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Cards</h2>
              <p className="text-muted-foreground">Manage your payment cards</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <Card key={card.id} className="overflow-hidden">
                <div
                  className={cn(
                    "relative h-48 p-6 text-white bg-gradient-to-br",
                    card.color,
                  )}
                >
                  {card.status === "frozen" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white"
                      >
                        <Lock className="h-3 w-3 mr-1" />
                        Frozen
                      </Badge>
                    </div>
                  )}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm opacity-80">{card.name}</p>
                      <p className="text-lg font-bold mt-1">{card.type}</p>
                    </div>
                    <CreditCard className="h-8 w-8 opacity-80" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-mono text-lg tracking-wider">
                        {showNumbers[card.id] ? card.fullNumber : card.number}
                      </p>
                      <button
                        onClick={() => toggleShowNumber(card.id)}
                        className="opacity-70 hover:opacity-100"
                      >
                        {showNumbers[card.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => copyNumber(card.id, card.fullNumber)}
                        className="opacity-70 hover:opacity-100"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      {copiedId === card.id && (
                        <span className="text-xs">Copied!</span>
                      )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Exp: {card.expiry}</span>
                      <span>CVV: {card.cvv}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Available Balance
                      </span>
                      <span className="font-semibold text-foreground">
                        ${card.balance.toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Credit Used</span>
                        <span>
                          {(
                            ((card.limit - card.balance) / card.limit) *
                            100
                          ).toFixed(0)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={((card.limit - card.balance) / card.limit) * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        {card.status === "frozen" ? "Unfreeze" : "Freeze"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
