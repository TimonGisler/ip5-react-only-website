import survey2025Csv from "./2025.csv?raw";

import { SurveyCsvParser } from "./SurveyCsvParser";
import { SurveyResponse } from "./SurveyResponse";

export class SurveyRepository {
  private static cached2025Survey: SurveyResponse[] | undefined;

  static get2025Survey(): readonly SurveyResponse[] {
    if (!SurveyRepository.cached2025Survey) {
      const parser = SurveyCsvParser.fromCsv(survey2025Csv);
      SurveyRepository.cached2025Survey = SurveyResponse.fromRecords(
        parser.getAll()
      );
    }

    return SurveyRepository.cached2025Survey;
  }
}
