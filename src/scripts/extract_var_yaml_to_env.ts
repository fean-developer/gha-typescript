import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as process from 'process';

/**
 * Extrai as variáveis de um arquivo YAML e as coloca no ambiente.
 * @param yamlFile Arquivo YAML.
 * @param prefix Prefixo para as variáveis de ambiente.
 */
export const extractVariables = (yamlFile: string, prefix: string = 'YAML_'): void => {
  const fileContent = fs.readFileSync(yamlFile, 'utf8');
  const data = yaml.load(fileContent);

  function flatten(data: any, parentKey: string = '', sep: string = '_'): Record<string, any> {
    const items: Record<string, any> = {};

    if (typeof data === 'object' && !Array.isArray(data)) {
      for (const [k, v] of Object.entries(data)) {
        const newKey = parentKey ? `${parentKey}${sep}${k}` : k;
        Object.assign(items, flatten(v, newKey, sep));
      }
    } else if (Array.isArray(data)) {
      data.forEach((v, i) => {
        const newKey = `${parentKey}${sep}${i}`;
        Object.assign(items, flatten(v, newKey, sep));
      });
    } else {
      items[parentKey] = data;
    }

    return items;
  }

  const flatData = flatten(data);

  for (const [key, value] of Object.entries(flatData)) {
    const envVar = `${prefix}${key.toUpperCase()}`;
    process.env[envVar] = String(value);
    console.log(`${envVar}=${value}`);
  }

  // Verifica se ORGANIZATION_NAME está vazio ou indefinido
  const organizationName = process.env[`${prefix}ORGANIZATION_NAME`];
  if (!organizationName) {
    console.error('Error: ORGANIZATION_NAME is required and cannot be empty.');
    process.exit(1);
  }
};
