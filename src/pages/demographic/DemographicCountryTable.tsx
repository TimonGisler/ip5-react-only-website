import { useMemo } from "react";
import Plot from "react-plotly.js";
import type { Data, Layout } from "plotly.js";

import type { RespondentStat } from "./demographicTypes";

type DemographicCountryTableProps = {
  respondentStats: RespondentStat[];
};

const tableHeaderFillColor = "#ede9fe";
const tableCellFillColor = "#f8fafc";

const DemographicCountryTable = ({
  respondentStats,
}: DemographicCountryTableProps) => {
  const tableData = useMemo<Data[]>(
    () => [
      {
        type: "table",
        columnwidth: [250, 100],
        header: {
          values: ["Country", "Respondents"],
          align: ["left", "right"],
          fill: {
            color: tableHeaderFillColor,
          },
          font: {
            family: "Inter, sans-serif",
            size: 14,
            color: "#1f2937",
            weight: 600,
          },
          line: {
            color: "rgba(148, 163, 184, 0.4)",
            width: 1,
          },
        },
        cells: {
          values: [
            respondentStats.map((item) => item.country),
            respondentStats.map((item) => item.count),
          ],
          align: ["left", "right"],
          fill: {
            color: tableCellFillColor,
          },
          font: {
            family: "Inter, sans-serif",
            size: 13,
            color: "#334155",
          },
          line: {
            color: "rgba(148, 163, 184, 0.2)",
            width: 1,
          },
          height: 28,
        },
        hoverinfo: "skip",
      },
    ],
    [respondentStats]
  );

  const layout = useMemo<Partial<Layout>>(
    () => ({
      margin: { t: 30, r: 0, b: 0, l: 0 },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      title: {
        text: "Respondents by Country (Table)",
        font: {
          family: "Inter, sans-serif",
          size: 18,
          color: "#1f2937",
        },
      },
    }),
    []
  );

  return (
    <div className="h-[520px] w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <Plot
        data={tableData}
        layout={layout}
        config={{ displayModeBar: false, responsive: true }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default DemographicCountryTable;
