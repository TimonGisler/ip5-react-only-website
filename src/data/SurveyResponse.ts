import type { SurveyRecord } from "./SurveyCsvParser";
import type { SurveyColumnKey } from "./SurveyColumnDefinitions";

const countryOfResidenceColumns = [
  "countryOfResidence",
  "countryOfResidenceAlt1",
  "countryOfResidenceAlt2",
  "countryOfResidenceAlt3",
  "countryOfResidenceAlt4",
] as const satisfies readonly SurveyColumnKey[];

export type NormalizedSurveyResponse = Omit<
  SurveyRecord,
  (typeof countryOfResidenceColumns)[number]
> & {
  readonly countryOfResidence: readonly string[];
};

export class SurveyResponse {
  private readonly record: SurveyRecord;

  private constructor(record: SurveyRecord) {
    this.record = record;
  }

  static fromRecord(record: SurveyRecord): SurveyResponse {
    return new SurveyResponse(record);
  }

  static fromRecords(records: readonly SurveyRecord[]): SurveyResponse[] {
    return records.map((record) => SurveyResponse.fromRecord(record));
  }

  static normalizeRecord(record: SurveyRecord): NormalizedSurveyResponse {
    return SurveyResponse.fromRecord(record).toNormalizedObject();
  }

  static normalizeRecords(
    records: readonly SurveyRecord[]
  ): NormalizedSurveyResponse[] {
    return records.map((record) => SurveyResponse.normalizeRecord(record));
  }

  get raw(): SurveyRecord {
    return this.record;
  }

  get countryOfResidence(): readonly string[] {
    const seen = new Set<string>();

    return countryOfResidenceColumns
      .map((column) => this.record[column])
      .filter((value): value is string => value !== "")
      .filter((value) => {
        if (seen.has(value)) {
          return false;
        }

        seen.add(value);
        return true;
      });
  }

  toNormalizedObject(): NormalizedSurveyResponse {
    const {
      countryOfResidence: _primaryCountry,
      countryOfResidenceAlt1: _countryAlt1,
      countryOfResidenceAlt2: _countryAlt2,
      countryOfResidenceAlt3: _countryAlt3,
      countryOfResidenceAlt4: _countryAlt4,
      ...rest
    } = this.record;

    return {
      ...rest,
      countryOfResidence: this.countryOfResidence,
    } satisfies NormalizedSurveyResponse;
  }
}
