import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartConfig = {
  count: {
    label: "Questions",
    color: "var(--chart-1)",
  },
};

const CategoryChart = ({ categories }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Questions by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[350px] w-full sm:min-h-[400px]"
        >
          <BarChart
            data={categories}
            accessibilityLayer
            aria-label="Questions by Category graph."
            role="group"
            tabIndex={0}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={110}
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
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
