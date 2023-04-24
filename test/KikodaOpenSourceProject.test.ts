import { FileBase } from 'projen';
import { NodeProject } from 'projen/lib/javascript';
import { DefaultPrTemplateError, InvalidLicenseError, KikodaOpenSourceProject } from '../src';

describe('Kikoda Open Source Project', () => {
  describe('Default', () => {
    const testProject = new NodeProject({
      name: 'test',
      defaultReleaseBranch: 'main',
      pullRequestTemplate: false,
      repository: 'https://link.to.repo/repo.git',
    });

    new KikodaOpenSourceProject(testProject, { title: 'Test Project' });

    test('should have the Apache 2.0 license', () => {
      expect(testProject.package.license).toBe('Apache-2.0');
    });

    test('should have Kikoda as the author', () => {
      expect(testProject.package.manifest.author).toMatchObject({ name: 'Kikoda, LLC' });
    });

    test.each`
      path
      ${'LICENSE'}
      ${'.github/pull_request_template.md'}
      ${'CONTRIBUTING.md'}
      ${'CODE_OF_CONDUCT.md'}
    `('should have a $path path', file => {
      expect(testProject.tryFindFile(file.path)).toBeInstanceOf(FileBase);
    });
  });

  describe('Errors', () => {
    test('should throw an error when default PR template is used', () => {
      const defaultPr = new NodeProject({
        name: 'test',
        defaultReleaseBranch: 'main',
        pullRequestTemplate: true,
        repository: 'https://link.to.repo/repo.git',
      });

      const predicate = () =>
        new KikodaOpenSourceProject(defaultPr, { title: 'Will Throw Errors' });

      expect(predicate).toThrowError(DefaultPrTemplateError);
    });

    test('should throw an error when license is not Apache 2.0', () => {
      const badLicense = new NodeProject({
        name: 'test',
        defaultReleaseBranch: 'main',
        pullRequestTemplate: false,
        license: 'MIT',
        copyrightOwner: 'Kikoda',
        repository: 'https://link.to.repo/repo.git',
      });

      const predicate = () =>
        new KikodaOpenSourceProject(badLicense, { title: 'Will Throw Errors' });

      expect(predicate).toThrowError(InvalidLicenseError);
    });
  });
});
