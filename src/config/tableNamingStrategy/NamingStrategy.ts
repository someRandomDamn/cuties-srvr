import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class NamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join('_'));
  }

  eagerJoinRelationAlias(alias: string, propertyPath: string): string {
    const out = alias + '_' + propertyPath.replace('.', '_');
    const match = out.match(/_/g) || [];
    return out + match.length;
  }
}
