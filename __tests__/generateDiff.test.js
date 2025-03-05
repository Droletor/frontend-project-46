import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as fs from 'node:fs';
import genDiff from '../src/generateDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('output format', () => {
  const jsonPath1 = getFixturePath('file1.json');
  const jsonPath2 = getFixturePath('file2.json');
  const yamlPath1 = getFixturePath('file1.yml');
  const yamlPath2 = getFixturePath('file2.yml');

  const stylishResult = readFile('stylishResult.txt');
  const plainResult = readFile('plainResult.txt');
  const jsonResult = readFile('jsonResult.txt');

  test.each([
    ['stylish', stylishResult],
    ['plain', plainResult],
    ['json', jsonResult],
  ])('%s format output', (format, result) => {
    expect(genDiff(jsonPath1, jsonPath2, format)).toEqual(result);
    expect(genDiff(yamlPath1, yamlPath2, format)).toEqual(result);
  });
});
