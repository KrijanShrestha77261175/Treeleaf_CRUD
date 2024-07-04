import React, { useContext } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Image,
} from "@chakra-ui/react";
import TreeLeafContext from "../../context/TreeLeafContext";

const Profiles = () => {
  const { entries } = useContext(TreeLeafContext);

  if (!entries || entries.length === 0) {
    return (
      <Box p={4}>
        <Text>No profiles found.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Profiles
      </Text>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>DOB</Th>
            <Th>City</Th>
            <Th>District</Th>
            <Th>Province</Th>
            <Th>Country</Th>
            <Th>Profile Picture</Th>
          </Tr>
        </Thead>
        <Tbody>
          {entries.map((entry) => (
            <Tr key={entry.id}>
              <Td>{entry.name}</Td>
              <Td>{entry.email}</Td>
              <Td>{entry.phone}</Td>
              <Td>{entry.dob}</Td>
              <Td>{entry.city}</Td>
              <Td>{entry.district}</Td>
              <Td>{entry.province}</Td>
              <Td>{entry.country}</Td>
              <Td>
                {entry.profilePicture instanceof File ||
                entry.profilePicture instanceof Blob ? (
                  <Image
                    src={URL.createObjectURL(entry.profilePicture)}
                    alt="Profile"
                    boxSize="50px"
                  />
                ) : (
                  <span>No image</span>
                )}
                {/* {entry.profilePicture && (
                  <Image
                    src={`/path/to/images/${entry.profilePicture}`}
                    alt="Profile"
                    boxSize="50px"
                  />
                )} */}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Profiles;
