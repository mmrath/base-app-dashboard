export function isPresent(val:any) {
  return val !== undefined && val !== null;
}

export function parseError(val:any):any {
  if (isPresent(val)) {
    if (isPresent(val['_body'])) {
      return JSON.parse(val['_body']);
    }
  }
  return val;
}

