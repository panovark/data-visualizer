import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const CategoryChart = ({ categories }) => {
  const chartConfig = {
    count: {
      label: "Questions",
      color: "var(--chart-1)",
    },
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Questions by Category</h2>
      <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
        <BarChart data={categories} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={100}
            tickFormatter={(value) => {
              return value.length > 20 ? value.slice(0, 18) + "..." : value;
            }}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default CategoryChart;
