import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as fs from 'node:fs';
import genDiff from '../src/generateDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Compare flat json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const result = readFile('flatResult.txt').trim();
  expect(genDiff(path1, path2)).toEqual(result);
});

test('Compare flat yaml', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  const result = readFile('flatResult.txt').trim();
  expect(genDiff(path1, path2)).toEqual(result);
});

test('Compare deep json', () => {
  const path1 = getFixturePath('deepFile1.json');
  const path2 = getFixturePath('deepFile2.json');
  const result = readFile('deepResult.txt').trim();
  expect(genDiff(path1, path2)).toEqual(result);
});

test('Compare deep yaml', () => {
  const path1 = getFixturePath('deepFile1.yml');
  const path2 = getFixturePath('deepFile2.yml');
  const result = readFile('deepResult.txt').trim();
  expect(genDiff(path1, path2)).toEqual(result);
});
