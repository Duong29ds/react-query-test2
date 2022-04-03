import { Flex, HStack, Image, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import PostDetail from "./PostDetail";
import { useMutation, useQueryClient } from "react-query";

const Post = (props) => {
  const [selectPost, setSelectPost] = useState(0);

  async function deletePost(postId) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/postId/${postId}`,
      { method: "DELETE" }
    );
    return response.json();
  }

  async function updatePost(postId) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/postId/${postId}`,
      //error data interface
      { method: "PATCH", data: { title: "Hello", body: "Hello" } }
    );
    return response.json();
  }
  const queryClient = useQueryClient();

  const mutationDelete = useMutation((postId) => deletePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", props.page]);
    },
  });
  const mutationEdit = useMutation((postId) => updatePost(postId), {
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts", props.page]);
      const previousPosts = queryClient.getQueryData(["posts", props.page]);
      queryClient.setQueryData(["posts", props.page], (old) => [
        ...old,
        newPost,
      ]);
      return { previousPosts };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["posts", props.page], context.previousPost);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts", props.page]);
    },
  });
  return (
    <Flex direction="column" gap={5}>
      <HStack>
        <Image
          src="https://xuconcept.com/wp-content/uploads/2021/11/tai-hinh-nen-mien-phi.jpg"
          height={{ base: "100px", md: "150px", lg: "200px" }}
        />
        <Flex
          direction="column"
          justify="space-between"
          alignItems="center"
          gap="20px"
        >
          <Text fontWeight="bold" fontSize={{ base: "15", lg: "20" }}>
            {props.title}
          </Text>
          <Text px={10} fontSize={{ base: "12", lg: "18" }}>
            {props.body}
          </Text>
          <HStack>
            <Button
              colorScheme="blue"
              onClick={() => setSelectPost(props.id)}
              fontSize={{ base: "12", lg: "18" }}
            >
              View Comments
            </Button>
            <Button
              fontSize={{ base: "12", lg: "18" }}
              colorScheme="blue"
              onClick={() => mutationDelete.mutate(props.id)}
            >
              Delete Post
            </Button>
            <Button
              fontSize={{ base: "12", lg: "18" }}
              colorScheme="blue"
              onClick={() => mutationEdit.mutate(props.id)}
            >
              Edit Post
            </Button>
          </HStack>
        </Flex>
      </HStack>
      {selectPost !== 0 && <PostDetail id={selectPost} />}
    </Flex>
  );
};

export default Post;
