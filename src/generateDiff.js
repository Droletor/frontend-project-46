import parseFile from './parsers.js';
import buildDiffTree from './buildDiff.js';
import formatedDiff from './formatters/stylish.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const object1 = parseFile(path1);
  const object2 = parseFile(path2);

  const diffTree = buildDiffTree(object1, object2);

  return formatedDiff(diffTree, formatName);
};

export default genDiff;
