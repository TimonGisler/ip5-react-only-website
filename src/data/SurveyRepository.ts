import { SurveyCsvParser } from "./SurveyCsvParser";
import { SurveyResponse } from "./SurveyResponse";

export class SurveyRepository {
  private static surveyModules = import.meta.glob<string>("./*.csv", {
    as: "raw",
    eager: true,
  });
  private static cachedSurveys: Map<string, SurveyResponse[]> = new Map();

  private static getYearFromPath(path: string): string {
    const fileName = path.split("/").pop();
    return fileName ? fileName.replace(".csv", "") : "";
  }

  static getAvailableYears(): readonly string[] {
    return Object.keys(this.surveyModules).map(this.getYearFromPath).sort();
  }

  static getSurvey(year: string): readonly SurveyResponse[] {
    const path = `./${year}.csv`;
    const csvContent = this.surveyModules[path];

    if (!csvContent) {
      return [];
    }

    if (!this.cachedSurveys.has(year)) {
      const parser = SurveyCsvParser.fromCsv(csvContent);
      const responses = SurveyResponse.fromRecords(parser.getAll());
      this.cachedSurveys.set(year, responses);
    }

    return this.cachedSurveys.get(year) ?? [];
  }
}
