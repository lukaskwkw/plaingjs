import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle
} from "reactstrap";
import { CardText, CardTitle, Col, Row } from "reactstrap";

interface PostListArgs {
  posts?: any;
  search: string;
}

const PostList = ({ posts, search }: PostListArgs) => {
  // if (error) return "Error loading posts";
  //if posts are returned from the GraphQL query, run the filter query
  //and set equal to variable postsearch

  // return <p>dupa</p>;

  if (posts && posts.length) {
    //searchQuery
    const searchQuery = posts.filter(query =>
      query.title.toLowerCase().includes(search)
    );
    if (searchQuery.length != 0) {
      return (
        <div>
          <div className="h-100">
            {searchQuery.map(post => (
              <Card
                style={{ width: "30%", margin: "0 10px" }}
                className="h-100"
                key={post.id}
              >
                {post.cover && (
                  <CardImg
                    top={true}
                    style={{ height: 250 }}
                    src={`http://localhost:1337${post.cover.url}`}
                  />
                )}
                <CardBody>
                  <CardTitle>{post.title}</CardTitle>
                  {/* <CardText>{res.description}</CardText> */}
                </CardBody>
                <div className="card-footer">
                  <Link as={`/posts/${post.id}`} href={`/posts?id=${post.id}`}>
                    <a className="btn btn-primary">View</a>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </div>
      );
    } else {
      return <h1>No posts Found</h1>;
    }
  }
  return <h1>Loading</h1>;
};

export default PostList;
