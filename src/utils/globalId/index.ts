export function toGlobalId(type: string, id: string): string {
  return Buffer.from(`${type}:${id}`).toString('base64');
}

export function fromGlobalId(globalId: string): { type: string; id: string } {
  const decoded = Buffer.from(globalId, 'base64').toString('utf8');
  const [type, id] = decoded.split(':');
  return { type, id };
}
