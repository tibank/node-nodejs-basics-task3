import EventEmitter from 'events';

const parser = (str: string): [string, string[], string] => {
  const positionColon = str.lastIndexOf(':');
  if (~positionColon) {
    return [str, str.slice(0, positionColon).split('/').filter(Boolean), str.slice(positionColon + 1)];
  } else {
    return [str, str.split('/'), ''];
  }
};

export const parseRouter = (req: any, emitter: EventEmitter): void => {
  const events: [string, string[], string][] = (emitter.eventNames() as string[]).map(parser);
  const arrURL: string[] = req.url.trim().split('/').filter(Boolean);

  for (const [eventName, routes, method] of events) {
    const params: any = {};
    if (method === req.method && routes.length === arrURL.length) {
      let isRouteMatches = true;
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].startsWith(':')) {
          params[routes[i].slice(1)] = arrURL[i];
        } else if (routes[i] !== arrURL[i]) {
          isRouteMatches = false;
          break;
        }
      }

      if (isRouteMatches) {
        if (Object.keys(params).length) {
          req.params = params;
        }
        req.eventNameEmitted = eventName;
        break;
      }
    }
  }
};
