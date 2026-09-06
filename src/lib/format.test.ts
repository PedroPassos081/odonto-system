import { describe, expect, it } from "vitest";
import { calculateAge, formatCurrency, formatDateBR, formatIsoDate } from "./format";

describe("formatCurrency", () => {
  it("formats a number as euros with a comma decimal separator", () => {
    expect(formatCurrency(420)).toBe("€420,00");
    expect(formatCurrency(1150.5)).toBe("€1150,50");
    expect(formatCurrency(0)).toBe("€0,00");
  });
});

describe("formatDateBR", () => {
  it("converts an ISO date to DD/MM/YYYY", () => {
    expect(formatDateBR("2026-05-22")).toBe("22/05/2026");
  });

  it("returns a fallback for null, undefined or malformed input", () => {
    expect(formatDateBR(null)).toBe("Não informado");
    expect(formatDateBR(undefined)).toBe("Não informado");
    expect(formatDateBR("not-a-date")).toBe("Não informado");
  });
});

describe("formatIsoDate", () => {
  it("formats a Date as YYYY-MM-DD using local time", () => {
    expect(formatIsoDate(new Date(2026, 4, 22))).toBe("2026-05-22");
  });

  it("pads single-digit months and days", () => {
    expect(formatIsoDate(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("calculateAge", () => {
  const reference = new Date(2026, 4, 22); // 22 de maio de 2026

  it("returns a fallback when there is no birth date", () => {
    expect(calculateAge(null, reference)).toBe("Idade não informada");
  });

  it("counts a full year when the birthday already happened this year", () => {
    expect(calculateAge("2000-01-10", reference)).toBe("26 anos");
  });

  it("does not count this year yet when the birthday has not happened", () => {
    expect(calculateAge("2000-12-10", reference)).toBe("25 anos");
  });

  it("counts the birthday itself as already happened", () => {
    expect(calculateAge("2000-05-22", reference)).toBe("26 anos");
  });
});
