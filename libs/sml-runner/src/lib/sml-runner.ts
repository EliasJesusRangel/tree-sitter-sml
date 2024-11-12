import os from 'os';
import path from 'path';
import {
  scanFilesRespectingGit,
  InternalParser,
} from '@tree-sitter-sml/utilities';

import fs from 'fs';
// modify
const p = path.resolve(os.homedir(), 'Workspace/SML/apps/web');

export const smlRunner = () => {
  console.log('### TRYING TO RUN');
  const fileNames = scanFilesRespectingGit(p);
  console.log('#### fileNames');
  for (const fileName of fileNames) {
    const nodes = InternalParser.parse(
      fs.readFileSync(fileName).toString(),
      fileName
    ).walk();
    for (const node of Object.values(nodes)) {
      console.log(node);
    }
    // console.log(JSON.stringify(nodes, null, 2));
  }
};
