import { useMemo } from "react";
import Plot from "react-plotly.js";
import type { Data, Layout } from "plotly.js";

type RespondentStat = {
  country: string;
  iso3: string;
  count: number;
};

const mockRespondentStats: RespondentStat[] = [
  { country: "Germany", iso3: "DEU", count: 10 },
  { country: "France", iso3: "FRA", count: 4 },
  { country: "United States", iso3: "USA", count: 6 },
  { country: "Switzerland", iso3: "CHE", count: 3 },
  { country: "India", iso3: "IND", count: 5 },
  { country: "Australia", iso3: "AUS", count: 2 },
];

const Demographic = () => {
  const choroplethData = useMemo<Data[]>(
    () => [
      {
        type: "choropleth",
        locationmode: "ISO-3",
        locations: mockRespondentStats.map((item) => item.iso3),
        z: mockRespondentStats.map((item) => item.count),
        text: mockRespondentStats.map(
          (item) => `${item.country}: ${item.count} respondents`
        ),
        hovertemplate: "%{text}<extra></extra>",
        colorscale: "YlGnBu",
        marker: {
          line: {
            width: 0.5,
            color: "rgba(255, 255, 255, 0.8)",
          },
        },
        colorbar: {
          title: {
            text: "Respondents",
          },
        },
      },
    ],
    []
  );

  const layout = useMemo<Partial<Layout>>(
    () => ({
      geo: {
        scope: "world",
        projection: {
          type: "natural earth",
        },
        showcoastlines: true,
        coastlinecolor: "#0f172a",
        landcolor: "#f1f5f9",
        bgcolor: "rgba(0,0,0,0)",
        lakecolor: "#e2e8f0",
      },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      margin: { t: 40, r: 0, l: 0, b: 0 },
      title: {
        text: "Respondents by Country",
        font: {
          family: "Inter, sans-serif",
          size: 20,
          color: "#1f2937",
        },
      },
    }),
    []
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-plum-500">
          Demographic
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Snapshot of where respondents are located. Replace the mock data with
          live survey results when available.
        </p>
      </header>

      <div className="h-[520px] w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <Plot
          data={choroplethData}
          layout={layout}
          config={{ displayModeBar: false, responsive: true }}
          useResizeHandler
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default Demographic;
