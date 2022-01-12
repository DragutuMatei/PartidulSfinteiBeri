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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          provident sed aliquam. Repellat non, est quasi nostrum molestias
          obcaecati et praesentium quas, consequuntur, nam asperiores deleniti
          tempora? Similique, esse ducimus!
        </p>
        <p>
          provident sed aliquam. Repellat non, est quasi nostrum molestias
          obcaecati et praesentium quas, consequuntur, nam asperiores deleniti
          tempora? Similique, esse ducimus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          provident sed aliquam. Repellat non, est quasi nostrum molestias
          obcaecati et praesentium quas, consequuntur, nam asperiores deleniti
          tempora? Similique, esse ducimus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          obcaecati et praesentium quas, consequuntur, nam asperiores deleniti
          tempora? Similique, esse ducimus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          provident sed aliquam. Repellat non, est quasi nostrum molestias
          obcaecati et praesentium quas, consequuntur, nam asperiores deleniti
          tempora? Similique, esse ducimus!
        </p>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(about);
