import assert from "node:assert/strict";
import test from "node:test";
import { normalizeLocale } from "./config";
import { resolveLocalizedValue } from "./localized-value";
import { formatProjectCount, translate } from "./messages";

test("normalizeLocale accepts supported locales and falls back to Georgian", () => {
  assert.equal(normalizeLocale("ru"), "ru");
  assert.equal(normalizeLocale("en"), "en");
  assert.equal(normalizeLocale("ka"), "ka");
  assert.equal(normalizeLocale("de"), "ka");
  assert.equal(normalizeLocale(undefined), "ka");
});

test("resolveLocalizedValue uses requested locale, then Georgian, then legacy", () => {
  assert.equal(
    resolveLocalizedValue({ ru: "Проект", en: "Project", ka: "პროექტი" }, "en", "Legacy"),
    "Project"
  );
  assert.equal(resolveLocalizedValue({ ka: "პროექტი" }, "ru", "Legacy"), "პროექტი");
  assert.equal(resolveLocalizedValue(undefined, "en", "Legacy"), "Legacy");
});

test("static translations interpolate values and format locale plurals", () => {
  assert.equal(
    translate("ru", "portfolio.image", { title: "Тест", number: 2 }),
    "Тест - изображение 2"
  );
  assert.equal(formatProjectCount("ru", 1), "1 проект");
  assert.equal(formatProjectCount("ru", 2), "2 проекта");
  assert.equal(formatProjectCount("ru", 5), "5 проектов");
  assert.equal(formatProjectCount("en", 2), "2 projects");
  assert.equal(formatProjectCount("ka", 2), "2 პროექტი");
});
