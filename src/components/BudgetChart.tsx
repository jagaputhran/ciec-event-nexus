
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface BudgetData {
  month: string;
  allocated: number;
  used: number;
}

interface BudgetChartProps {
  data: BudgetData[];
}

const chartConfig = {
  allocated: {
    label: "Budget Allocated",
    color: "#3b82f6",
  },
  used: {
    label: "Actual Spending",
    color: "#10b981",
  },
};

export function BudgetChart({ data }: BudgetChartProps) {
  const [showAllocated, setShowAllocated] = useState(true);
  const [showUsed, setShowUsed] = useState(true);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const allocated = payload.find((p: any) => p.dataKey === "allocated")?.value || 0;
      const used = payload.find((p: any) => p.dataKey === "used")?.value || 0;
      const utilization = allocated > 0 ? ((used / allocated) * 100).toFixed(1) : "0";
      
      let utilizationColor = "#10b981"; // green
      if (parseFloat(utilization) > 100) utilizationColor = "#ef4444"; // red
      else if (parseFloat(utilization) > 90) utilizationColor = "#f59e0b"; // yellow

      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-fade-in">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.name}:</span>
              <span className="font-medium">₹{entry.value.toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Utilization:</span>
              <span 
                className="font-bold text-sm"
                style={{ color: utilizationColor }}
              >
                {utilization}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Monthly Budget vs Actual Spending</CardTitle>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-allocated"
                checked={showAllocated}
                onCheckedChange={setShowAllocated}
              />
              <Label htmlFor="show-allocated" className="text-sm">Budget Allocated</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-used"
                checked={showUsed}
                onCheckedChange={setShowUsed}
              />
              <Label htmlFor="show-used" className="text-sm">Actual Spending</Label>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                className="text-sm"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-sm"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${(value / 1000)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {showAllocated && (
                <Bar
                  dataKey="allocated"
                  name="Budget Allocated"
                  fill="var(--color-allocated)"
                  radius={[4, 4, 0, 0]}
                  className="animate-scale-in"
                />
              )}
              {showUsed && (
                <Bar
                  dataKey="used"
                  name="Actual Spending"
                  fill="var(--color-used)"
                  radius={[4, 4, 0, 0]}
                  className="animate-scale-in"
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
