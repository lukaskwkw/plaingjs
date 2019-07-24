import { backendUrl } from "../../config";
import fetch from "node-fetch";
import { NextPage, NextPageContext } from "next";
import { Post } from "../../model";
import url from "url";
import { NextPageContextStore } from "../../utils/with-redux-store";

interface Props {
  postContent: Post;
}

const PostPage: NextPage<Props> = ({ postContent }) => (
  <>
    <h2>{postContent.title}</h2>
    <p>{postContent.description}</p>
  </>
);

PostPage.getInitialProps = async ({ query }: NextPageContextStore) => {
  //TODO: add client database i.e. redux or kind of singleton and try to get from it first
  const { pid } = query;
  // if (typeof window !== "undefined") {
  //   return { postContent: { title: "zz", description: "xx" } };
  // }

  if (typeof pid !== "string") {
    return;
  }

  const postUrl = url.resolve(backendUrl, `/posts/${encodeURIComponent(pid)}`);

  const postContent = await fetch(postUrl).then(res => res.json());

  return { postContent };
};

export default PostPage;
