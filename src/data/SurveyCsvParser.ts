import {
  columnDefinitions,
  type SurveyColumnKey,
} from "./SurveyColumnDefinitions";

export type SurveyRecord = {
  [K in SurveyColumnKey]: string;
};

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentValue = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (char === '"') {
      if (inQuotes) {
        if (text[i + 1] === '"') {
          currentValue += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        inQuotes = true;
      }
    } else if (char === "," && !inQuotes) {
      currentRow.push(currentValue);
      currentValue = "";
    } else if (char === "\n" && !inQuotes) {
      currentRow.push(currentValue);
      rows.push(currentRow);
      currentRow = [];
      currentValue = "";
    } else if (char === "\r") {
      // ignore carriage returns
      continue;
    } else {
      currentValue += char;
    }
  }

  currentRow.push(currentValue);
  rows.push(currentRow);

  // Remove trailing empty row caused by newline at EOF
  if (rows.length > 0 && rows[rows.length - 1].every((value) => value === "")) {
    rows.pop();
  }

  return rows;
}

/**
 * Cleans and standardizes a string by replacing non-breaking spaces with regular spaces
 * and trimming leading/trailing whitespace. Returns an empty string for null or undefined input.
 * @param {string | undefined} value The string to normalize.
 * @returns {string} The normalized string.
 */
function normalizeCell(value: string | undefined): string {
  if (!value) {
    return "";
  }

  return value.replace(/\u00a0/g, " ").trim();
}

export class SurveyCsvParser {
  private readonly records: SurveyRecord[];

  private constructor(records: SurveyRecord[]) {
    this.records = records;
  }

  static fromCsv(csv: string): SurveyCsvParser {
    const rows = parseCsv(csv);
    const [headerRow, ...dataRows] = rows;

    if (!headerRow) {
      throw new Error("CSV is missing a header row.");
    }

    if (headerRow.length !== columnDefinitions.length) {
      throw new Error(
        `CSV column count ${headerRow.length} does not match expected ${columnDefinitions.length}.`
      );
    }

    columnDefinitions.forEach((definition, index) => {
      const header = normalizeCell(headerRow[index]);
      const expected = normalizeCell(definition.header);

      if (header !== expected) {
        throw new Error(
          `Unexpected column header at index ${index}: "${header}" (expected "${expected}").`
        );
      }
    });

    const records: SurveyRecord[] = dataRows
      .filter((row) => row.some((cell) => normalizeCell(cell) !== ""))
      .map((row) => {
        const entry: Partial<SurveyRecord> = {};

        columnDefinitions.forEach((definition, index) => {
          entry[definition.key] = normalizeCell(row[index]);
        });

        return entry as SurveyRecord;
      });

    return new SurveyCsvParser(records);
  }

  getAll(): readonly SurveyRecord[] {
    return this.records;
  }

  findByResponseId(responseId: string): SurveyRecord | undefined {
    return this.records.find((record) => record.responseId === responseId);
  }
}
