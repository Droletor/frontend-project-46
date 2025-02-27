import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as fs from 'node:fs';
import parseFile from '../src/parsers.js';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Compare flat json', () => {
  const obj1 = parseFile(getFixturePath('file1.json'));
  const obj2 = parseFile(getFixturePath('file2.json'));
  const result = readFile('flatResult.txt').trim();
  expect(genDiff(obj1, obj2)).toEqual(result);
});

test('Compare flat yaml', () => {
  const obj1 = parseFile(getFixturePath('file1.yml'));
  const obj2 = parseFile(getFixturePath('file2.yml'));
  const result = readFile('flatResult.txt').trim();
  expect(genDiff(obj1, obj2)).toEqual(result);
});
