import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import { Box } from "@chakra-ui/react";
import PostList from "./components/Post/PostList";
import Setting from "./components/Setting";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Box height="100vh">
      <SideBar />
      <Box display={{ base: "none", md: "block" }}>
        <NavBar />
      </Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/postlist" element={<PostList />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Box>
  );
}

export default App;
