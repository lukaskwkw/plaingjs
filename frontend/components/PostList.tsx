import Link from "next/link";
import { Card, CardBody, CardImg } from "reactstrap";
import { CardTitle } from "reactstrap";
interface PostListArgs {
  posts?: any;
  search: string;
}

const PostList = ({ posts, search }: PostListArgs) => {
  if (posts && posts.length) {
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
                  <Link href="/posts/[pid]" as={`/posts/${post.id}`}>
                    <a className="btn btn-primary">View</a>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <style jsx global>{`
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
          `}</style>
        </div>
      );
    } else {
      return <h1>No posts Found</h1>;
    }
  }
  return <h1>Loading</h1>;
};

export default PostList;
