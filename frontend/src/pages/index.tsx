import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

function Index() {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: undefined as string | undefined,
  });

  // const [{ data, fetching }] = usePostsQuery({ variables });

  return (
    <Layout>
      <div className="components">
        <div className="container">
          <div className="text-container">
            <h1>NEVER STOP EXPLORING THE WORLD.</h1>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
            </h3>
            <button>Click me !</button>
          </div>
        </div>
        <div className="slider">
          <div className="slider-cards">
          <div className="slider-card">
            <h3 className="slider-card-title">Task #1</h3>
            <h5 className="slider-card-subtitle">Something should be here</h5>
            <p className="slider-card-description">
              nush ce sa zic aici dar trb sa fie
            </p>
          </div>
          <div className="slider-card">
            <h3 className="slider-card-title">Task #2</h3>
            <h5 className="slider-card-subtitle">Something should be here</h5>
            <p className="slider-card-description">
              nush ce sa zic aici dar trb sa fie
            </p>
          </div>
          <div className="slider-card">
            <h3 className="slider-card-title">Task #3</h3>
            <h5 className="slider-card-subtitle">Something should be here</h5>
            <p className="slider-card-description">
              nush ce sa zic aici dar trb sa fie
            </p>
          </div>
          </div>
          <div className="buttons">
          <button className="slider-btn-left">Prev</button>
          <button className="slider-btn-right">Next</button>
          <span>0/1</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(Index);
