import process from 'node:process';
import path from 'node:path';
import * as fs from 'node:fs';
import parseFile from './parsers.js';
import buildDiffTree from './buildDiff.js';
import getFormatter from './formatters/index.js';

const resolvePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const getExtentionName = (filepath) => path.extname(filepath).slice(1);

const genDiff = (path1, path2, formatName = 'stylish') => {
  const resolvePath1 = resolvePath(path1);
  const resolvePath2 = resolvePath(path2);
  const extention1 = getExtentionName(path1);
  const extention2 = getExtentionName(path2);
  const data1 = readFile(resolvePath1);
  const data2 = readFile(resolvePath2);

  const object1 = parseFile(data1, extention1);
  const object2 = parseFile(data2, extention2);

  const diffTree = buildDiffTree(object1, object2);

  const formatedDiff = getFormatter(formatName);

  return formatedDiff(diffTree, formatName);
};

export default genDiff;
