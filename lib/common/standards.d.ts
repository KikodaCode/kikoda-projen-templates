import { ArrowParens, EndOfLine, TrailingComma } from 'projen/lib/javascript';
/**
 * Collection of sensible defaults for use in Projen options/constructors
 */
export declare const KikodaStandards: {
    PrettierOptions: {
        settings: {
            printWidth: number;
            tabWidth: number;
            useTabs: boolean;
            semi: boolean;
            singleQuote: boolean;
            trailingComma: TrailingComma;
            arrowParens: ArrowParens;
            endOfLine: EndOfLine;
        };
    };
};
