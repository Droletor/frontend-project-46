#!/usr/bin/env node

import { Command, Option } from 'commander';
import genDiff from '../src/generateDiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .addOption(new Option('-f, --format <type>', 'output format')
    .choices(['stylish', 'plain']).default('stylish'))
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    console.log(genDiff(filepath1, filepath2, format));
  });

program.parse();
