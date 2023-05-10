import { TypeScriptAppProject, TypeScriptProjectOptions } from 'projen/lib/typescript';
/**
 * CDK starter kit project. This project is designed to help teams bootstrap new efforts faster.
 *
 * @pjid kikoda-cdk-starter-kit
 */
export declare class KikodaCDKStarterKitProject extends TypeScriptAppProject {
    constructor(options: TypeScriptProjectOptions);
    private resolveAssetPath;
    private readAsset;
    private readAssetAsArray;
}
