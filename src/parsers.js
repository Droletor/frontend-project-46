import yaml from 'js-yaml';

const getParser = (extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse;
    case 'yml':
    case 'yaml':
      return yaml.load;
    default:
      throw new Error(`Parser for: '${extension}' not implemented!`);
  }
};

const parseFile = (data, extension) => {
  const parse = getParser(extension);

  return parse(data);
};

export default parseFile;
