import { getInput } from '@actions/core';

import { extractVariables } from './scripts/extract_var_yaml_to_env';

const yamlFile = getInput('config_file');
const prefix = getInput('prefix') || 'YAML_';

extractVariables(yamlFile, prefix);
