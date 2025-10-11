import { describe, expect, it } from "vitest";

import { SurveyResponse } from "./SurveyResponse";
import { SurveyRepository } from "./SurveyRepository";

describe("SurveyResponse", () => {
  const responses: readonly SurveyResponse[] =
    SurveyRepository.getSurvey("2025");

  it("normalizes the country of residence into a single attribute", () => {
    const response = responses.find((r) => r.raw.responseId === "29");

    expect(response).toBeDefined();
    expect(response!.countryOfResidence).toEqual(["Germany"]);

    const normalized = response!.toNormalizedObject();

    expect(normalized.countryOfResidence).toEqual(["Germany"]);
    expect("countryOfResidenceAlt1" in normalized).toBe(false);
    expect("countryOfResidenceAlt2" in normalized).toBe(false);
    expect("countryOfResidenceAlt3" in normalized).toBe(false);
    expect("countryOfResidenceAlt4" in normalized).toBe(false);
  });
});
