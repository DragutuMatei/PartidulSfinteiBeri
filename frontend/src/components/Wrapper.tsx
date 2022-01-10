import { Box } from "@chakra-ui/layout";
import React from "react";

interface WrapperProps {
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <Box w="100%" mx="auto" mt={8} maxW="800px">{children}</Box>;
};
