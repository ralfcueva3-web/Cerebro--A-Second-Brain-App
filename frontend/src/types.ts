export interface Tag {
  _id: string;
  title: string;
}

export interface Content {
  _id: string;
  link: string;
  type: "youtube" | "twitter" | "document" | "link";
  title: string;
  tags: Tag[];
}