import { useMemo } from "react";

import { SurveyRepository } from "../../data/SurveyRepository";
import DemographicChoropleth from "./DemographicChoropleth";
import DemographicCountryTable from "./DemographicCountryTable";
import type { RespondentStat } from "./demographicTypes";

const surveyResponses = SurveyRepository.getSurvey("2025");

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

      <div className="grid gap-6 lg:grid-cols-2">
        <DemographicCountryTable respondentStats={respondentStats} />
        <DemographicChoropleth respondentStats={respondentStats} />
      </div>
    </div>
  );
};

export default Demographic;
