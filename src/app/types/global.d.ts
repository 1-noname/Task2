declare const __IS_DEV__: boolean;

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
