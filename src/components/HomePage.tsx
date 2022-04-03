import React from "react";
import { VStack, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <VStack
      position="absolute"
      top="100px"
      right="0"
      left={{ base: "0", md: 60 }}
      bottom="0"
      overflowY="auto"
      px={10}
    >
      <Text fontSize={20}>HomePage</Text>
    </VStack>
  );
}
