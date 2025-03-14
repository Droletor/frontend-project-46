import _ from 'lodash';

const replacer = '    ';

const stringify = (data, depth) => {
  if (!_.isObject(data)) return `${data}`;

  const indent = replacer.repeat(depth);
  const entries = Object.entries(data);
  const strings = entries.map(([key, value]) => `${indent}    ${key}: ${stringify(value, depth + 1)}`);

  return `{\n${strings.join('\n')}\n${indent}}`;
};

const stylish = (data) => {
  const iter = (obj, depth) => {
    const indent = replacer.repeat(depth);
    const result = obj.flatMap((node) => {
      const {
        key, oldValue, newValue, value, children, type,
      } = node;
      switch (type) {
        case 'added':
          return `${indent}  + ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${indent}  - ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${indent}    ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${indent}  - ${key}: ${stringify(oldValue, depth + 1)}\n${indent}  + ${key}: ${stringify(newValue, depth + 1)}`;
        case 'nested':
          return `${indent}    ${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Stylish formatter for: '${type}' node not implemented!`);
      }
    });
    return `{\n${result.join('\n')}\n${indent}}`;
  };

  return iter(data, 0);
};

export default stylish;
