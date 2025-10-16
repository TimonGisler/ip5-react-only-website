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
  readonly year: string;
};

export class SurveyResponse {
  private readonly record: SurveyRecord;
  public readonly year: string;

  private constructor(record: SurveyRecord, year: string) {
    this.record = record;
    this.year = year;
  }

  static fromRecord(record: SurveyRecord, year: string): SurveyResponse {
    return new SurveyResponse(record, year);
  }

  static fromRecords(
    records: readonly SurveyRecord[],
    year: string
  ): SurveyResponse[] {
    return records.map((record) => SurveyResponse.fromRecord(record, year));
  }

  static normalizeRecord(
    record: SurveyRecord,
    year: string
  ): NormalizedSurveyResponse {
    return SurveyResponse.fromRecord(record, year).toNormalizedObject();
  }

  static normalizeRecords(
    records: readonly SurveyRecord[],
    year: string
  ): NormalizedSurveyResponse[] {
    return records.map((record) =>
      SurveyResponse.normalizeRecord(record, year)
    );
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
      year: this.year,
    } satisfies NormalizedSurveyResponse;
  }
}
