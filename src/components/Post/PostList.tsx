import { VStack, IconButton } from "@chakra-ui/react";
import Post from "./Post";
import { useQuery, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

interface post {
  id: number;
  title: string;
  body: string;
}

export default function PostList() {
  const [curPage, setCurPage] = useState(1);
  const fetchPost = async (pageId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageId}`
    );
    return response.json();
  };
  const queryClient = useQueryClient();

  useEffect(() => {
    const nextPage = curPage + 1;
    queryClient.prefetchQuery(["posts", nextPage], () => fetchPost(nextPage));
  }, [curPage, queryClient]);

  const query = useQuery(["posts", curPage], () => fetchPost(curPage));
  console.log(query.data);
  if (query.isError) {
    return <h1>Error</h1>;
  }
  if (query.isLoading) {
    return <h1>Loading...</h1>;
  }
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
      <IconButton
        _hover={{
          bgColor: "#170f23",
          color: "#fff",
        }}
        fontSize={20}
        bgColor="gray.600"
        color="gray.200"
        icon={<MdNavigateBefore />}
        aria-label=""
        position="absolute"
        top={2}
        left={0}
        disabled={curPage <= 1}
        onClick={() => setCurPage((curPage) => curPage - 1)}
      />
      {query.data.map((post: post) => {
        return (
          <Post
            page={curPage}
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        );
      })}
      <IconButton
        _hover={{
          bgColor: "#170f23",
          color: "#fff",
        }}
        fontSize={20}
        bgColor="gray.600"
        color="gray.200"
        icon={<MdOutlineNavigateNext />}
        aria-label=""
        position="absolute"
        top={2}
        right={0}
        disabled={curPage >= 10}
        onClick={() => setCurPage((curPage) => curPage + 1)}
      />
    </VStack>
  );
}
