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

  test('Difference in default format', () => {
    expect(genDiff(jsonPath1, jsonPath2)).toEqual(stylishResult);
    expect(genDiff(yamlPath1, yamlPath2)).toEqual(stylishResult);
  });

  test('Difference in stylish format', () => {
    expect(genDiff(jsonPath1, jsonPath2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(yamlPath1, yamlPath2, 'stylish')).toEqual(stylishResult);
  });

  test('Difference in plain format', () => {
    expect(genDiff(jsonPath1, jsonPath2, 'plain')).toEqual(plainResult);
    expect(genDiff(yamlPath1, yamlPath2, 'plain')).toEqual(plainResult);
  });

  test('Difference in json format', () => {
    expect(genDiff(jsonPath1, jsonPath2, 'json')).toEqual(jsonResult);
    expect(genDiff(yamlPath1, yamlPath2, 'json')).toEqual(jsonResult);
  });
});
