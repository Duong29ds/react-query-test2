import React from "react";
import { useQuery } from "react-query";
import { HStack, VStack, Text, Avatar } from "@chakra-ui/react";

interface comment {
  id: Number;
  name: string;
  email: string;
  body: string;
}

export default function PostDetail(props: { id: Number }) {
  const fetchComments = async (postId: Number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
  };

  const query = useQuery(["comments", props.id], () => fetchComments(props.id));
  if (query.isLoading) {
    return <h1>Loading....</h1>;
  }
  return (
    <VStack justify="flex-start">
      {query.data.map((comment: comment) => (
        <HStack w="100%">
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Text>{comment.body}</Text>
        </HStack>
      ))}
    </VStack>
  );
}
