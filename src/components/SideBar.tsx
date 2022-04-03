import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

import {
  VStack,
  HStack,
  Text,
  Box,
  useDisclosure,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { SiChakraui } from "react-icons/si";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { useState } from "react";

function SideBarContent() {
  const navigation = useNavigate();
  return (
    <VStack
      position="absolute"
      bgColor="gray.100"
      w={{ base: "full", md: 60 }}
      top={0}
      left={0}
      bottom={0}
    >
      <Box pt={2}>
        <SiChakraui fontSize={60} color="#6284FF" />
      </Box>

      <HStack
        cursor="pointer"
        borderBottomWidth={1}
        borderBottomColor="gray.500"
        borderRadius={10}
        _hover={{
          bgColor: "#6284FF",
          color: "#fff",
        }}
        justify="start"
        w="95%"
        px={5}
        py={2}
        onClick={() => {
          navigation("/");
        }}
      >
        <AiOutlineHome fontSize={25} />
        <Text>Home</Text>
      </HStack>
      <HStack
        cursor="pointer"
        borderBottomWidth={1}
        borderBottomColor="gray.500"
        borderRadius={10}
        _hover={{
          bgColor: "#6284FF",
          color: "#fff",
        }}
        justify="start"
        w="95%"
        px={5}
        py={2}
        onClick={() => {
          navigation("/postlist");
        }}
      >
        <BsFillFileEarmarkPostFill fontSize={25} />
        <Text>Posts</Text>
      </HStack>
      <HStack
        cursor="pointer"
        borderBottomWidth={1}
        borderBottomColor="gray.500"
        borderRadius={10}
        _hover={{
          bgColor: "#6284FF",
          color: "#fff",
        }}
        justify="start"
        w="95%"
        px={5}
        py={2}
        onClick={() => {
          navigation("/setting");
        }}
      >
        <AiOutlineSetting fontSize={25} />
        <Text>Settings</Text>
      </HStack>
    </VStack>
  );
}

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isNav, setIsNav] = useState(false);
  const handleClickNavBar = () => {
    setIsNav(true);
    onOpen();
  };

  const handleClickSideBar = () => {
    setIsNav(false);
    onOpen();
  };

  return (
    <Box>
      <Box display={{ base: "none", md: "block" }}>
        <SideBarContent />
      </Box>
      <Box
        display={{ base: "flex", md: "none" }}
        px={2}
        py={2}
        borderBottomWidth={1}
        borderBottomColor="gray.200"
      >
        <IconButton
          icon={<BiMenuAltLeft />}
          aria-label=""
          onClick={handleClickSideBar}
        />
        <Flex pt={2} justifyContent="center" w="full">
          <SiChakraui fontSize={30} color="#6284FF" />
        </Flex>
        <IconButton
          icon={<BiMenuAltRight />}
          aria-label=""
          onClick={handleClickNavBar}
        />
      </Box>

      <Drawer
        placement={isNav ? "right" : "left"}
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <IconButton
              icon={<MdOutlineCancel />}
              aria-label=""
              onClick={onClose}
              position="absolute"
              fontSize={20}
              top={0}
              right={0}
              zIndex={1}
              variant="ghost"
            />
            {isNav ? <NavBar /> : <SideBarContent />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SideBar;
