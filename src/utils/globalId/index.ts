import type { ResolversInterfaceTypes } from '../../graphql/types.generated';

type NodeType = ResolversInterfaceTypes<never>['Node']['__typename'];
const NODE_TYPES: NodeType[] = ['Team', 'User'];

function isValidNodeType(type: string): type is NodeType {
  return NODE_TYPES.some((nodeType) => nodeType === type);
}

export function toGlobalId(type: NodeType, id: string): string {
  return Buffer.from(`${type}:${id}`).toString('base64');
}

// TODO: 無効なグローバルIDの場合は null を返却したいので、この関数では Result errorを返す。
export function fromGlobalId(globalId: string): { type: NodeType; id: string } {
  const decoded = Buffer.from(globalId, 'base64').toString('utf8');
  const [type, id] = decoded.split(':');

  if (!type || !id) {
    // TODO: Result error
    throw new Error('Invalid global ID format');
  }

  if (!isValidNodeType(type)) {
    // TODO: Result error
    throw new Error(`Invalid node type: ${type}`);
  }

  return { type, id };
}
