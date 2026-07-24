import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { blogAuthorType } from "./blogAuthorType";
import { blogCategoryType } from "./blogCategoryType";
import { blogPostType } from "./blogPostType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, blogAuthorType, blogCategoryType, blogPostType],
};
