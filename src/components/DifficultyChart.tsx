import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TriviaCount } from "@/types/trivia";

interface DifficultyChartProps {
  difficulties: TriviaCount[];
}

const DifficultyChart = ({ difficulties }: DifficultyChartProps) => {
  const chartConfig = {
    easy: {
      label: "Easy",
      color: "var(--chart-1)",
    },
    medium: {
      label: "Medium",
      color: "var(--chart-2)",
    },
    hard: {
      label: "Hard",
      color: "var(--chart-3)",
    },
  };

  const chartData = difficulties.map(({ name, count }) => {
    const key = name.toLowerCase();
    const displayName = key.charAt(0).toUpperCase() + key.slice(1);

    return {
      name: displayName,
      count,
      fill: `var(--color-${key})`,
      difficultyKey: key,
    };
  });

  const totalQuestions = difficulties.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Questions by Difficulty
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[350px] w-full sm:min-h-[400px]"
        >
          <PieChart
            accessibilityLayer
            aria-label="Questions by Difficulty graph."
            role="group"
            tabIndex={0}
          >
            <ChartTooltip
              content={<ChartTooltipContent nameKey="difficultyKey" />}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="difficultyKey" />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              innerRadius="30%"
              outerRadius="70%"
              paddingAngle={chartData.length > 1 ? 2 : 0}
              stroke="none"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const { cx, cy } = viewBox;

                    return (
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={cx}
                          y={cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalQuestions}
                        </tspan>
                        <tspan
                          x={cx}
                          y={(cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }

                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DifficultyChart;
