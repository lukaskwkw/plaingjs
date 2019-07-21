import PostList from "../components/PostList";
import React from "react";
import fetch from "node-fetch";
import {
  Alert,
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row
} from "reactstrap";
import { apiUrl } from "../config";

class Index extends React.Component<{ posts: object }> {
  state = {
    query: ""
  };

  static async getInitialProps() {
    const res = await fetch(`${apiUrl}posts`);

    const posts = await res.json();
    return { posts };
  }

  onChange(e) {
    this.setState({ query: e.target.value.toLowerCase() });
  }
  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Col>
            <div className="search">
              <InputGroup>
                <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                <Input onChange={this.onChange.bind(this)} />
              </InputGroup>
            </div>
            <PostList posts={this.props.posts} search={this.state.query} />
          </Col>
        </Row>
        <style jsx>
          {`
            .search {
              margin: 20px;
              width: 500px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Index;
