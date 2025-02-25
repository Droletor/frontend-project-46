#!/usr/bin/env node

import parseFile from '../src/parser.js';
import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
	const format = options.format;
    const obj1 = parseFile(filepath1);
    const obj2 = parseFile(filepath2);
  });

program.parse();