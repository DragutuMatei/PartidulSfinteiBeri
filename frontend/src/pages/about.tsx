import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

interface aboutProps {}

const about: React.FC<aboutProps> = ({}) => {
  return (
    <Layout>
      <div className="aboutTxt">
        <p>
        This website will help you and your team . Why would you choose us ? The answer is to STAY organised and connected ! You can track in real time the tasks that are uploaded , review them and add comments to improve the experience. Time now can be by your side even more by adding a deadline to a task you added!More feature develop everyday .
        </p>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(about);
