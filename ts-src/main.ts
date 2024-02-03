import {
  $init,
  instantiate,
  TransformHtmlConfig,
} from "../pkg/rust_html_component";

const todo = <T>(): T => {
  throw new Error(`TODO`);
};
const config: TransformHtmlConfig = {};
export const transform = async (input: string, config: TransformHtmlConfig) => {
  await $init;
  const instance = await instantiate(todo(), todo());
  return instance.transformHtml(input, config);
};
