export namespace RootComponentTypes {
}
export interface TextSplitterConfig {
  maxLength: number,
  minLength: number,
}
export interface TransformHtmlConfig {
  placeholderClass: string,
  basePathForRelativeImages: string,
  postId: string,
  textSplitterConfig?: TextSplitterConfig,
}
export interface HtmlData {
  html: string,
  section: number,
}
export type ContentBlock = ContentBlockIntro | ContentBlockH2;
export interface ContentBlockIntro {
  tag: 'intro',
  val: HtmlData,
}
export interface ContentBlockH2 {
  tag: 'h2',
  val: HtmlData,
}
export interface ImageData {
  src: string,
  width?: number,
  height?: number,
}
export interface BlocksAndImages {
  blocks: ContentBlock[],
  images: ImageData[],
}
