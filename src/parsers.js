import * as fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import yaml from 'js-yaml';

const getParser = (extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse;
    case '.yml':
    case '.yaml':
      return yaml.load;
    default:
      throw new Error(`Parser for: '${extension}' not implemented!`);
  }
};

const parseFile = (filepath) => {
  const extension = path.extname(filepath);
  const resolvedPath = path.resolve(process.cwd(), filepath);

  const parse = getParser(extension);
  const data = fs.readFileSync(resolvedPath, { encoding: 'utf8', flag: 'r' });

  return parse(data);
};

export default parseFile;
