import process from 'node:process';
import path from 'node:path';
import * as fs from 'node:fs';
import parseFile from './parsers.js';
import buildDiffTree from './buildDiff.js';
import getFormatter from './formatters/index.js';

const getFileInfo = (filepath) => {
  const resolvedPath = path.resolve(process.cwd(), filepath);
  const extention = path.extname(resolvedPath).slice(1);
  const data = fs.readFileSync(resolvedPath, 'utf-8');

  return { extention, data };
};

const genDiff = (path1, path2, formatName = 'stylish') => {
  const file1 = getFileInfo(path1);
  const file2 = getFileInfo(path2);

  const object1 = parseFile(file1.data, file1.extention);
  const object2 = parseFile(file2.data, file2.extention);

  const diffTree = buildDiffTree(object1, object2);

  const formatedDiff = getFormatter(formatName);

  return formatedDiff(diffTree, formatName);
};

export default genDiff;
