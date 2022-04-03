import { Text, Box, Flex } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Flex
      position="absolute"
      top={0}
      left={{ base: "0", md: "60" }}
      right={0}
      bgColor="#E0C3FC"
      h={{ base: "full", md: "60px" }}
      w="full-60"
      px={5}
      gap={{ base: "2", md: "8" }}
      alignItems="center"
      direction={{ base: "column", md: "row" }}
    >
      <Text
        fontSize={28}
        borderBottomColor="gray.500"
        borderBottomWidth={1}
        w="full"
        display={{ base: "block", md: "none" }}
      >
        Nav bar
      </Text>
      <Box
        w={{ base: "full", md: "80px" }}
        px={2}
        py={2}
        borderRadius={2}
        cursor="pointer"
        _hover={{ bgColor: "#97D9E1", color: "#fff" }}
      >
        <Text>Page 1</Text>
      </Box>
      <Box
        w={{ base: "full", md: "80px" }}
        px={2}
        py={2}
        borderRadius={2}
        cursor="pointer"
        _hover={{ bgColor: "#97D9E1", color: "#fff" }}
      >
        <Text>Page 2</Text>
      </Box>
      <Box
        w={{ base: "full", md: "80px" }}
        px={2}
        py={2}
        borderRadius={2}
        cursor="pointer"
        _hover={{ bgColor: "#97D9E1", color: "#fff" }}
      >
        <Text>Page 3</Text>
      </Box>
    </Flex>
  );
};

export default NavBar;
