import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { UpdootSection } from "../components/UpdootSection";

function Index() {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: undefined as string | undefined,
  });

  // const [{ data, fetching }] = usePostsQuery({ variables });
  const [{ data, fetching }] = usePostsQuery();

  return (
    <Layout>
      <NextLink href="create-post">
        <Link>Create Post</Link>
      </NextLink>
      <br />
      <br />
      <Stack spacing={8}>
        {!data ? (
          <h1>Nu mai avem, MA IA CAPU IN PULA MEA</h1>
        ) : (
          // data!.posts.posts.map((p) => (
          data!.posts.map((p) => (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              <UpdootSection post={p} />
              <Box>
                <Heading fontSize="xl">{p.title}</Heading>
                <Text>posted by {p.creator.username}</Text>
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            </Flex>
          ))
        )}
      </Stack>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(Index);
