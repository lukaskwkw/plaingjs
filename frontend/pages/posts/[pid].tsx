import { apiUrl } from "../../config";
import fetch from "node-fetch";
import { NextPage, NextPageContext } from "next";
import { Post } from "../../model";

interface Props {
  postContent: Post;
}

const PostPage: NextPage<Props> = ({ postContent }) => (
  <>
    <h2>{postContent.title}</h2>
    <p>{postContent.description}</p>
  </>
);

PostPage.getInitialProps = async ({ query }: NextPageContext) => {
  //TODO: add client database i.e. redux or kind of singleton and try to get from it first
  const { pid } = query;
  if (typeof pid !== "string") {
    return;
  }

  const url = `${apiUrl}posts/${encodeURIComponent(pid)}`;

  const postContent = await fetch(url).then(r => r.json());

  return { postContent };
};

export default PostPage;
