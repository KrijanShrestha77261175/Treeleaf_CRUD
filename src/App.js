import logo from "./logo.svg";
import "./App.css";
import { TreeLeafProvider } from "./context/TreeLeafContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import FormComponent from "./components/Pages/Form";
import TableComponent from "./components/Pages/Table";
import { ROUTES } from "./components/Routes/routes.constant";

function App() {
  const navigate = useNavigate();
  return (
    <TreeLeafProvider>
      <VStack m={4}>
        <Heading fontFamily={'"Poppins", sans-serif'}>
          TreeLeaf CRUD Application
        </Heading>
        <Box
          border={"1px"}
          p={4}
          borderRadius={8}
          boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
          borderColor={"darkgrey"}
        >
          <FormComponent />
          <TableComponent />
          <Button
            mt={4}
            onClick={() => navigate(ROUTES.PROFILES)}
            colorScheme="teal"
          >
            View Profile
          </Button>
        </Box>
      </VStack>
    </TreeLeafProvider>
  );
}

export default App;
