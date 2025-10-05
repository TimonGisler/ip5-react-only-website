import { useMemo } from "react";
import Plot from "react-plotly.js";
import type { Data, Layout } from "plotly.js";

import type { RespondentStat } from "../demographic/demographicTypes";

type DemographicChoroplethProps = {
  respondentStats: RespondentStat[];
};

const DemographicChoropleth = ({
  respondentStats,
}: DemographicChoroplethProps) => {
  const choroplethData = useMemo<Data[]>(
    () => [
      {
        type: "choropleth",
        locationmode: "country names",
        locations: respondentStats.map((item) => item.country),
        z: respondentStats.map((item) => item.count),
        text: respondentStats.map(
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
    [respondentStats]
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
    <div className="h-[520px] w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <Plot
        data={choroplethData}
        layout={layout}
        config={{ displayModeBar: false, responsive: true }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default DemographicChoropleth;
