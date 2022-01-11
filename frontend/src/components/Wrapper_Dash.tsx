import { Box } from "@chakra-ui/layout";
import React from "react";

interface Wrapper_DashProps {
}

export const Wrapper_Dash: React.FC<Wrapper_DashProps> = ({ children }) => {
  return <Box w="100%" mx="auto" mt={8} maxW="800px">{children}</Box>;
};
