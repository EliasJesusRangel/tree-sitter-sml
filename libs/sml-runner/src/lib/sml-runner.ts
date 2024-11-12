import os from 'os';
import path from 'path';
import {
  scanFilesRespectingGit,
  InternalParser,
} from '@tree-sitter-sml/utilities';

import fs from 'fs';
import Parser from 'tree-sitter';
// modify
const p = path.resolve(os.homedir(), 'Workspace/SML/apps/web');

const examine = (nodes: Parser.TreeCursor) => {
  while (nodes.currentNode) {
    if (nodes.currentNode.childCount > 0) {
      console.log(nodes.currentNode.childCount);
      nodes.currentNode.children.forEach((child) => examine(child.walk()));
    } else {
      console.log('NO CHILDREN');
      console.log(nodes.currentFieldName);
    }
    if (!nodes.gotoNextSibling()) {
      break;
    }
  }
};
export const smlRunner = () => {
  console.log('### TRYING TO RUN');
  const fileNames = scanFilesRespectingGit(p).filter(
    (filename) => filename.includes('.tsx') || filename.includes('.ts')
  );
  console.log('### Obtained filenames');
  for (const fileName of fileNames) {
    const nodes = InternalParser.parse(
      fs.readFileSync(fileName).toString(),
      fileName
    ).walk();

    examine(nodes);
  }
};
