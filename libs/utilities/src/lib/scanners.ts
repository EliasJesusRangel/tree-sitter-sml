import * as path from 'path';
import { execSync } from 'child_process';

export const scanFilesRespectingGit = (rootDirectory: string): string[] => {
  const absoluteRootDir = path.resolve(rootDirectory);
  const gitOutput = execSync('git ls-files', {
    cwd: absoluteRootDir,
  }).toString();

  const gitFiles = gitOutput.split('\n').filter((line) => line.trim() !== '');
  const absoluteFilePaths = gitFiles.map((file) =>
    path.join(absoluteRootDir, file)
  );
  return absoluteFilePaths;
};
