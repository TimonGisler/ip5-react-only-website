import { useMemo } from "react";
import Plot from "react-plotly.js";
import type { Data, Layout } from "plotly.js";

import { SurveyRepository } from "../data/SurveyRepository";

type RespondentStat = {
  country: string;
  count: number;
};

const surveyResponses = SurveyRepository.get2025Survey();

const normalizeCountry = (value: string) => value.replace(/\s+/g, " ").trim();

const Demographic = () => {
  const respondentStats = useMemo<RespondentStat[]>(() => {
    const counts = new Map<string, number>();

    surveyResponses.forEach((response) => {
      response.countryOfResidence
        .map(normalizeCountry)
        .filter(
          (country) => country.length > 0 && country.toLowerCase() !== "n/a"
        )
        .forEach((country) => {
          counts.set(country, (counts.get(country) ?? 0) + 1);
        });
    });

    return Array.from(counts.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const totalRespondents = surveyResponses.length;
  const totalCountries = respondentStats.length;

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
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-plum-500">
          Demographic
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Snapshot of where respondents are located. Based on {totalRespondents}
          responses across {totalCountries} countries from the 2025 survey.
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
