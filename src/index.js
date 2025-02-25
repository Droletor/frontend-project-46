import union from 'lodash/union.js';
import isEqual from 'lodash/isEqual.js';
import sortBy from 'lodash/sortBy.js';

const genDiff = (obj1, obj2) => {
  const keys = union(Object.keys(obj1), Object.keys(obj2));
  
  const diffs = keys.reduce((acc, key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (val1 !== undefined && val2 !== undefined) {
      if (isEqual(val1, val2)) {
        return [...acc, {key, val: val1, type: 'unchanged'}];
      }
      return [...acc, {key, val: val1, type: 'removed'}, {key, val: val2, type: 'added'}];
    }
    if (val1 !== undefined) return [...acc, {key, val: val1, type: 'removed'}];
    return [...acc, {key, val: val2, type: 'added'}];
  }, []);

  const sortedDiffs = sortBy(diffs, ['key']);
  const stringDiffs = sortedDiffs.map((diff) => {
    switch (diff.type) {
      case 'unchanged':
        return `    ${diff.key}: ${diff.val}`;
      case 'removed':
        return `  - ${diff.key}: ${diff.val}`;
      case 'added':
        return `  + ${diff.key}: ${diff.val}`;
    }
  });
  const result = `{\n${stringDiffs.join('\n')}\n}`;
  return result;
}

export default genDiff;