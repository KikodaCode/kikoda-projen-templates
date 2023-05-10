"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KikodaCDKStarterKitProject = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const fs_1 = require("fs");
const path_1 = require("path");
const projen_1 = require("projen");
const typescript_1 = require("projen/lib/typescript");
const common_1 = require("../common");
/**
 * CDK starter kit project. This project is designed to help teams bootstrap new efforts faster.
 *
 * @pjid kikoda-cdk-starter-kit
 */
class KikodaCDKStarterKitProject extends typescript_1.TypeScriptAppProject {
    constructor(options) {
        super({
            prettier: true,
            prettierOptions: common_1.KikodaStandards.PrettierOptions,
            tsconfig: {
                include: ['bin/**/*.ts', 'lib/**/*.ts'],
                exclude: ['node_modules', 'cdk.out'],
                compilerOptions: { baseUrl: '.', rootDir: '.' },
            },
            eslintOptions: {
                dirs: ['bin', 'lib'],
                tsconfigPath: 'tsconfig.eslint.json',
            },
            disableTsconfigDev: true,
            licensed: false,
            // gitignore doesn't work right, see overrides below
            gitignore: ['!/lib/', '!/lib', '.cdk.staging', 'cdk.out', '*.d.ts'],
            sampleCode: false,
            ...options,
        });
        // cdk dependencies
        this.addDeps('@kikoda/cdk-constructs', '@kikoda/generated-config', 'aws-cdk-lib', 'cdk-pipelines-github', 'constructs', 'source-map-support');
        // cdk dev dependencies
        this.addDevDeps('aws-cdk');
        // cdk scripts
        this.addScripts({
            cdk: 'cdk',
        });
        // cdk bin folder
        new projen_1.SampleDir(this, 'bin', {
            sourceDir: this.resolveAssetPath('bin'),
        });
        // cdk config
        new projen_1.SampleFile(this, 'cdk.json', {
            sourcePath: this.resolveAssetPath('cdk.json'),
        });
        // cdk lib folder
        new projen_1.SampleDir(this, 'lib', {
            sourceDir: this.resolveAssetPath('lib'),
        });
        // vscode config folder
        new projen_1.SampleDir(this, '.vscode', {
            sourceDir: this.resolveAssetPath('.vscode'),
        });
        // eslint+ts project config
        new projen_1.SampleFile(this, 'tsconfig.eslint.json', {
            sourcePath: this.resolveAssetPath('tsconfig.eslint.json'),
        });
        // github config?
        // app?
        //  config
        //  envs / stages
        //  networking
        //  db
        //  blob
        //  compute
        //  api
        //  cdn
        //  dns
        //  emails
        //  auth
        //  alerts / monitoring
        //  ui
        // ignore inherited readme
        const existingReadme = this.components.find(c => c instanceof projen_1.SampleReadme);
        existingReadme.synthesize = () => { };
        // readme
        new projen_1.SampleReadme(this, {
            filename: 'README.md',
            contents: this.readAsset('README.md'),
        });
        // override tsconfig properties not supported by projen
        const tsconfig = this.tryFindObjectFile('tsconfig.json');
        if (tsconfig) {
            tsconfig.addOverride('ts-node', { require: ['tsconfig-paths/register'] });
        }
        // ignore inherited .gitignore
        // we are doing this only because projen doesn't properly handle the overrides passed to super above
        this.tryRemoveFile('.gitignore');
        // .gitignore
        const gitignore = new projen_1.IgnoreFile(this, '.gitignore');
        gitignore.addPatterns(...this.readAssetAsArray('gitignore'));
    }
    resolveAssetPath(assetPath) {
        return path_1.resolve(__dirname, 'assets', assetPath);
    }
    readAsset(assetPath) {
        return fs_1.readFileSync(this.resolveAssetPath(assetPath), 'utf8').replace(/\{\{PACKAGE_NAME\}\}/g, this.package.packageName);
    }
    readAssetAsArray(assetPath) {
        return this.readAsset(assetPath).split(/\r?\n/);
    }
}
exports.KikodaCDKStarterKitProject = KikodaCDKStarterKitProject;
_a = JSII_RTTI_SYMBOL_1;
KikodaCDKStarterKitProject[_a] = { fqn: "@kikoda/projen-templates.KikodaCDKStarterKitProject", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvS2lrb2RhQ0RLU3RhcnRlcktpdFByb2plY3QvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBa0M7QUFDbEMsK0JBQStCO0FBQy9CLG1DQUF5RTtBQUN6RSxzREFBdUY7QUFDdkYsc0NBQTRDO0FBRTVDOzs7O0dBSUc7QUFDSCxNQUFhLDBCQUEyQixTQUFRLGlDQUFvQjtJQUNsRSxZQUFZLE9BQWlDO1FBQzNDLEtBQUssQ0FBQztZQUNKLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZUFBZSxFQUFFLHdCQUFlLENBQUMsZUFBZTtZQUNoRCxRQUFRLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQztnQkFDdkMsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQztnQkFDcEMsZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFO2FBQ2hEO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUM7Z0JBQ3BCLFlBQVksRUFBRSxzQkFBc0I7YUFDckM7WUFDRCxrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLFFBQVEsRUFBRSxLQUFLO1lBQ2Ysb0RBQW9EO1lBQ3BELFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7WUFDbkUsVUFBVSxFQUFFLEtBQUs7WUFDakIsR0FBRyxPQUFPO1NBQ1gsQ0FBQyxDQUFDO1FBRUgsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQ1Ysd0JBQXdCLEVBQ3hCLDBCQUEwQixFQUMxQixhQUFhLEVBQ2Isc0JBQXNCLEVBQ3RCLFlBQVksRUFDWixvQkFBb0IsQ0FDckIsQ0FBQztRQUVGLHVCQUF1QjtRQUN2QixJQUFJLENBQUMs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Q0FBQyxTQUFpQjtRQUN4QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7O0FBekhILGdFQTBIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IElnbm9yZUZpbGUsIFNhbXBsZURpciwgU2FtcGxlRmlsZSwgU2FtcGxlUmVhZG1lIH0gZnJvbSAncHJvamVuJztcbmltcG9ydCB7IFR5cGVTY3JpcHRBcHBQcm9qZWN0LCBUeXBlU2NyaXB0UHJvamVjdE9wdGlvbnMgfSBmcm9tICdwcm9qZW4vbGliL3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgS2lrb2RhU3RhbmRhcmRzIH0gZnJvbSAnLi4vY29tbW9uJztcblxuLyoqXG4gKiBDREsgc3RhcnRlciBraXQgcHJvamVjdC4gVGhpcyBwcm9qZWN0IGlzIGRlc2lnbmVkIHRvIGhlbHAgdGVhbXMgYm9vdHN0cmFwIG5ldyBlZmZvcnRzIGZhc3Rlci5cbiAqXG4gKiBAcGppZCBraWtvZGEtY2RrLXN0YXJ0ZXIta2l0XG4gKi9cbmV4cG9ydCBjbGFzcyBLaWtvZGFDREtTdGFydGVyS2l0UHJvamVjdCBleHRlbmRzIFR5cGVTY3JpcHRBcHBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9uczogVHlwZVNjcmlwdFByb2plY3RPcHRpb25zKSB7XG4gICAgc3VwZXIoe1xuICAgICAgcHJldHRpZXI6IHRydWUsXG4gICAgICBwcmV0dGllck9wdGlvbnM6IEtpa29kYVN0YW5kYXJkcy5QcmV0dGllck9wdGlvbnMsXG4gICAgICB0c2NvbmZpZzoge1xuICAgICAgICBpbmNsdWRlOiBbJ2Jpbi8qKi8qLnRzJywgJ2xpYi8qKi8qLnRzJ10sXG4gICAgICAgIGV4Y2x1ZGU6IFsnbm9kZV9tb2R1bGVzJywgJ2Nkay5vdXQnXSxcbiAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7IGJhc2VVcmw6ICcuJywgcm9vdERpcjogJy4nIH0sXG4gICAgICB9LFxuICAgICAgZXNsaW50T3B0aW9uczoge1xuICAgICAgICBkaXJzOiBbJ2JpbicsICdsaWInXSxcbiAgICAgICAgdHNjb25maWdQYXRoOiAndHNjb25maWcuZXNsaW50Lmpzb24nLFxuICAgICAgfSxcbiAgICAgIGRpc2FibGVUc2NvbmZpZ0RldjogdHJ1ZSxcbiAgICAgIGxpY2Vuc2VkOiBmYWxzZSxcbiAgICAgIC8vIGdpdGlnbm9yZSBkb2Vzbid0IHdvcmsgcmlnaHQsIHNlZSBvdmVycmlkZXMgYmVsb3dcbiAgICAgIGdpdGlnbm9yZTogWychL2xpYi8nLCAnIS9saWInLCAnLmNkay5zdGFnaW5nJywgJ2Nkay5vdXQnLCAnKi5kLnRzJ10sXG4gICAgICBzYW1wbGVDb2RlOiBmYWxzZSxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfSk7XG5cbiAgICAvLyBjZGsgZGVwZW5kZW5jaWVzXG4gICAgdGhpcy5hZGREZXBzKFxuICAgICAgJ0BraWtvZGEvY2RrLWNvbnN0cnVjdHMnLFxuICAgICAgJ0BraWtvZGEvZ2VuZXJhdGVkLWNvbmZpZycsXG4gICAgICAnYXdzLWNkay1saWInLFxuICAgICAgJ2Nkay1waXBlbGluZXMtZ2l0aHViJyxcbiAgICAgICdjb25zdHJ1Y3RzJyxcbiAgICAgICdzb3VyY2UtbWFwLXN1cHBvcnQnLFxuICAgICk7XG5cbiAgICAvLyBjZGsgZGV2IGRlcGVuZGVuY2llc1xuICAgIHRoaXMuYWRkRGV2RGVwcygnYXdzLWNkaycpO1xuXG4gICAgLy8gY2RrIHNjcmlwdHNcbiAgICB0aGlzLmFkZFNjcmlwdHMoe1xuICAgICAgY2RrOiAnY2RrJyxcbiAgICB9KTtcblxuICAgIC8vIGNkayBiaW4gZm9sZGVyXG4gICAgbmV3IFNhbXBsZURpcih0aGlzLCAnYmluJywge1xuICAgICAgc291cmNlRGlyOiB0aGlzLnJlc29sdmVBc3NldFBhdGgoJ2JpbicpLFxuICAgIH0pO1xuXG4gICAgLy8gY2RrIGNvbmZpZ1xuICAgIG5ldyBTYW1wbGVGaWxlKHRoaXMsICdjZGsuanNvbicsIHtcbiAgICAgIHNvdXJjZVBhdGg6IHRoaXMucmVzb2x2ZUFzc2V0UGF0aCgnY2RrLmpzb24nKSxcbiAgICB9KTtcblxuICAgIC8vIGNkayBsaWIgZm9sZGVyXG4gICAgbmV3IFNhbXBsZURpcih0aGlzLCAnbGliJywge1xuICAgICAgc291cmNlRGlyOiB0aGlzLnJlc29sdmVBc3NldFBhdGgoJ2xpYicpLFxuICAgIH0pO1xuXG4gICAgLy8gdnNjb2RlIGNvbmZpZyBmb2xkZXJcbiAgICBuZXcgU2FtcGxlRGlyKHRoaXMsICcudnNjb2RlJywge1xuICAgICAgc291cmNlRGlyOiB0aGlzLnJlc29sdmVBc3NldFBhdGgoJy52c2NvZGUnKSxcbiAgICB9KTtcblxuICAgIC8vIGVzbGludCt0cyBwcm9qZWN0IGNvbmZpZ1xuICAgIG5ldyBTYW1wbGVGaWxlKHRoaXMsICd0c2NvbmZpZy5lc2xpbnQuanNvbicsIHtcbiAgICAgIHNvdXJjZVBhdGg6IHRoaXMucmVzb2x2ZUFzc2V0UGF0aCgndHNjb25maWcuZXNsaW50Lmpzb24nKSxcbiAgICB9KTtcblxuICAgIC8vIGdpdGh1YiBjb25maWc/XG4gICAgLy8gYXBwP1xuICAgIC8vICBjb25maWdcbiAgICAvLyAgZW52cyAvIHN0YWdlc1xuICAgIC8vICBuZXR3b3JraW5nXG4gICAgLy8gIGRiXG4gICAgLy8gIGJsb2JcbiAgICAvLyAgY29tcHV0ZVxuICAgIC8vICBhcGlcbiAgICAvLyAgY2RuXG4gICAgLy8gIGRuc1xuICAgIC8vICBlbWFpbHNcbiAgICAvLyAgYXV0aFxuICAgIC8vICBhbGVydHMgLyBtb25pdG9yaW5nXG4gICAgLy8gIHVpXG5cbiAgICAvLyBpZ25vcmUgaW5oZXJpdGVkIHJlYWRtZVxuICAgIGNvbnN0IGV4aXN0aW5nUmVhZG1lID0gdGhpcy5jb21wb25lbnRzLmZpbmQoYyA9PiBjIGluc3RhbmNlb2YgU2FtcGxlUmVhZG1lKSBhcyBTYW1wbGVSZWFkbWU7XG4gICAgZXhpc3RpbmdSZWFkbWUuc3ludGhlc2l6ZSA9ICgpID0+IHt9O1xuXG4gICAgLy8gcmVhZG1lXG4gICAgbmV3IFNhbXBsZVJlYWRtZSh0aGlzLCB7XG4gICAgICBmaWxlbmFtZTogJ1JFQURNRS5tZCcsXG4gICAgICBjb250ZW50czogdGhpcy5yZWFkQXNzZXQoJ1JFQURNRS5tZCcpLFxuICAgIH0pO1xuXG4gICAgLy8gb3ZlcnJpZGUgdHNjb25maWcgcHJvcGVydGllcyBub3Qgc3VwcG9ydGVkIGJ5IHByb2plblxuICAgIGNvbnN0IHRzY29uZmlnID0gdGhpcy50cnlGaW5kT2JqZWN0RmlsZSgndHNjb25maWcuanNvbicpO1xuXG4gICAgaWYgKHRzY29uZmlnKSB7XG4gICAgICB0c2NvbmZpZy5hZGRPdmVycmlkZSgndHMtbm9kZScsIHsgcmVxdWlyZTogWyd0c2NvbmZpZy1wYXRocy9yZWdpc3RlciddIH0pO1xuICAgIH1cblxuICAgIC8vIGlnbm9yZSBpbmhlcml0ZWQgLmdpdGlnbm9yZVxuICAgIC8vIHdlIGFyZSBkb2luZyB0aGlzIG9ubHkgYmVjYXVzZSBwcm9qZW4gZG9lc24ndCBwcm9wZXJseSBoYW5kbGUgdGhlIG92ZXJyaWRlcyBwYXNzZWQgdG8gc3VwZXIgYWJvdmVcbiAgICB0aGlzLnRyeVJlbW92ZUZpbGUoJy5naXRpZ25vcmUnKTtcblxuICAgIC8vIC5naXRpZ25vcmVcbiAgICBjb25zdCBnaXRpZ25vcmUgPSBuZXcgSWdub3JlRmlsZSh0aGlzLCAnLmdpdGlnbm9yZScpO1xuXG4gICAgZ2l0aWdub3JlLmFkZFBhdHRlcm5zKC4uLnRoaXMucmVhZEFzc2V0QXNBcnJheSgnZ2l0aWdub3JlJykpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlQXNzZXRQYXRoKGFzc2V0UGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlc29sdmUoX19kaXJuYW1lLCAnYXNzZXRzJywgYXNzZXRQYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZEFzc2V0KGFzc2V0UGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlYWRGaWxlU3luYyh0aGlzLnJlc29sdmVBc3NldFBhdGgoYXNzZXRQYXRoKSwgJ3V0ZjgnKS5yZXBsYWNlKFxuICAgICAgL1xce1xce1BBQ0tBR0VfTkFNRVxcfVxcfS9nLFxuICAgICAgdGhpcy5wYWNrYWdlLnBhY2thZ2VOYW1lLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHJlYWRBc3NldEFzQXJyYXkoYXNzZXRQYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkQXNzZXQoYXNzZXRQYXRoKS5zcGxpdCgvXFxyP1xcbi8pO1xuICB9XG59XG4iXX0=