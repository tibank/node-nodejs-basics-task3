export const setRequestHeaders = (req: any, res: any): void => {
  req.headers['Content-type'] = 'application/json';
  req.headers['Accept-Charset'] = 'utf8';

  res.setHeader('Content-type', 'application/json');
};
