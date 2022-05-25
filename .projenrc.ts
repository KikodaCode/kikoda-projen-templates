import { typescript } from "projen";
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  devContainer: true,
  docgen: true,
  name: "kikoda-projen-templates",
  prettier: true,
  projenrcTs: true,
  vscode: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();