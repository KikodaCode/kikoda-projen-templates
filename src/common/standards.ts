import { ArrowParens, EndOfLine, TrailingComma } from "projen/lib/javascript";

/**
 * Collection of sensible defaults for use in Projen options/constructors
 */
export const KikodaStandards = {
  PrettierOptions: {
    settings: {
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
      arrowParens: ArrowParens.AVOID,
      endOfLine: EndOfLine.LF,
    },
  },
};