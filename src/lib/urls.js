export const googleImages = {
  name: 'Google Images',
  query: q =>
    `http://www.google.es/search?q=${q}&hl=es&tbs=isz:l&tbo=d&site=imghp&tbm=isch&sout=1&biw=1366&bih=643`,
  external: true,
};

export const wiktionary = {
  name: 'wiktionary',
  query: q => `https://en.wiktionary.org/wiki/${q}#Spanish`,
};

export const forvo = {
  name: 'forvo',
  query: q => `http://www.forvo.com/word/${q}/#es`,
};
