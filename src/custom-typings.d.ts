interface Window {
  store: any;
  __INITIAL_STATE__: any;
}

declare let nodeRequire: any;

declare module "marked" {
  const marked: any;
  export = marked;
}
