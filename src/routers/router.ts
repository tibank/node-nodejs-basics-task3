export class Router {
  endpoints: any;
  constructor() {
    this.endpoints = {};
  }

  private addEndpoint(method: string, path: string, handler: any) {
    const endpoint: any = this.endpoints[path] ? this.endpoints[path] : (this.endpoints[path] = {});
    if (endpoint[method]) {
      throw new Error(`Method ${method} in route ${path} is already exists!`);
    } else {
      endpoint[method] = handler;
    }
  }

  public get(path: string, handler: any) {
    this.addEndpoint('GET', path, handler);
  }

  public post(path: string, handler: any) {
    this.addEndpoint('POST', path, handler);
  }

  public put(path: string, handler: any) {
    this.addEndpoint('PUT', path, handler);
  }

  public delete(path: string, handler: any) {
    this.addEndpoint('DELETE', path, handler);
  }
}
