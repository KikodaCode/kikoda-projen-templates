"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KikodaStandards = void 0;
const javascript_1 = require("projen/lib/javascript");
/**
 * Collection of sensible defaults for use in Projen options/constructors
 */
exports.KikodaStandards = {
    PrettierOptions: {
        settings: {
            printWidth: 100,
            tabWidth: 2,
            useTabs: false,
            semi: true,
            singleQuote: true,
            trailingComma: javascript_1.TrailingComma.ALL,
            arrowParens: javascript_1.ArrowParens.AVOID,
            endOfLine: javascript_1.EndOfLine.LF,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhcmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9zdGFuZGFyZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0RBQThFO0FBRTlFOztHQUVHO0FBQ1UsUUFBQSxlQUFlLEdBQUc7SUFDN0IsZUFBZSxFQUFFO1FBQ2YsUUFBUSxFQUFFO1lBQ1IsVUFBVSxFQUFFLEdBQUc7WUFDZixRQUFRLEVBQUUsQ0FBQztZQUNYLE9BQU8sRUFBRSxLQUFLO1lBQ2QsSUFBSSxFQUFFLElBQUk7WUFDVixXQUFXLEVBQUUsSUFBSTtZQUNqQixhQUFhLEVBQUUsMEJBQWEsQ0FBQyxHQUFHO1lBQ2hDLFdBQVcsRUFBRSx3QkFBVyxDQUFDLEtBQUs7WUFDOUIsU0FBUyxFQUFFLHNCQUFTLENBQUMsRUFBRTtTQUN4QjtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFycm93UGFyZW5zLCBFbmRPZkxpbmUsIFRyYWlsaW5nQ29tbWEgfSBmcm9tICdwcm9qZW4vbGliL2phdmFzY3JpcHQnO1xuXG4vKipcbiAqIENvbGxlY3Rpb24gb2Ygc2Vuc2libGUgZGVmYXVsdHMgZm9yIHVzZSBpbiBQcm9qZW4gb3B0aW9ucy9jb25zdHJ1Y3RvcnNcbiAqL1xuZXhwb3J0IGNvbnN0IEtpa29kYVN0YW5kYXJkcyA9IHtcbiAgUHJldHRpZXJPcHRpb25zOiB7XG4gICAgc2V0dGluZ3M6IHtcbiAgICAgIHByaW50V2lkdGg6IDEwMCxcbiAgICAgIHRhYldpZHRoOiAyLFxuICAgICAgdXNlVGFiczogZmFsc2UsXG4gICAgICBzZW1pOiB0cnVlLFxuICAgICAgc2luZ2xlUXVvdGU6IHRydWUsXG4gICAgICB0cmFpbGluZ0NvbW1hOiBUcmFpbGluZ0NvbW1hLkFMTCxcbiAgICAgIGFycm93UGFyZW5zOiBBcnJvd1BhcmVucy5BVk9JRCxcbiAgICAgIGVuZE9mTGluZTogRW5kT2ZMaW5lLkxGLFxuICAgIH0sXG4gIH0sXG59O1xuIl19