import Parser from 'tree-sitter';
import TsGrammar from 'tree-sitter-typescript';

export class InternalParser {
  private static instance: InternalParser;
  private static parser = new Parser();

  private constructor() {
    console.log('### Internal Parser CREATED');
  }

  public static getInstance(): InternalParser {
    if (!InternalParser.instance) {
      InternalParser.instance = new InternalParser();
    }
    return InternalParser.instance;
  }
  public static parse(input: string, fileName: string) {
    if (fileName.endsWith('tsx')) {
      this.parser.setLanguage(TsGrammar.tsx);
    } else {
      this.parser.setLanguage(TsGrammar.typescript);
    }
    console.log('### ...PARSING');
    const result = this.parser.parse(input);
    console.log('### DONE PARSING');
    return result;
  }
}
