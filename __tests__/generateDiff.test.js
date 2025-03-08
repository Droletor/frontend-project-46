import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as fs from 'node:fs';
import genDiff from '../src/generateDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe.each([
  ['json'],
  ['yml'],
])('\'%s\' file extension', (ext) => {
  const path1 = getFixturePath(`file1.${ext}`);
  const path2 = getFixturePath(`file2.${ext}`);

  test.each([
    ['stylish'],
    ['plain'],
    ['json'],
  ])('\'%s\' format output', (format) => {
    const result = readFile(`${format}Result.txt`);
    expect(genDiff(path1, path2, format)).toEqual(result);
  });
});
