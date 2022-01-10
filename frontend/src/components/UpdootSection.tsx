import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Box, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <Box>
        <IconButton
          onClick={async () => {
            await vote({ value: 1, postId: post.id });
          }}
          aria-label="da like la sefu"
          icon={<ChevronUpIcon />}
        />
      </Box>
      <Box>{post.points}</Box>
      <Box>
        <IconButton
          onClick={async () => {
            await vote({ value: -1, postId: post.id });
          }}
          aria-label="da dislike la sefu"
          icon={<ChevronDownIcon />}
        />
      </Box>
    </Flex>
  );
};
