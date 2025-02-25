import * as fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const parseFile = (filepath) => {
  const extension = path.extname(filepath);
  const resolvedPath = path.resolve(process.cwd(), filepath);

  switch (extension) {
    case '.json':
	  return parseJSON(resolvedPath);
	default:
	  throw new Error(`Parser for: '${extension}' not implemented!`);
  }
}

const parseJSON = (filepath) => {
  const data = fs.readFileSync(filepath, { encoding: 'utf8', flag: 'r' });
  const obj = JSON.parse(data);
  return obj;
}

export default parseFile;