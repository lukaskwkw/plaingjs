export type ImageCover = {
  url: string;
  name: string;
};

export type Post = {
  id: number;
  title: string;
  description: string;
  cover: ImageCover;
};
