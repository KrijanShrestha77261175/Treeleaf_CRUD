import React, { useContext, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import TreeLeafContext from "../../context/TreeLeafContext";

const TableComponent = () => {
  const { entries, deleteEntry, updateEntry } = useContext(TreeLeafContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    onOpen();
  };

  const handleSubmit = (data) => {
    updateEntry({ ...selectedEntry, ...data });
    onClose();
  };

  return (
    <>
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
            <Th>Actions</Th>
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
              </Td>
              <Td>
                <Button onClick={() => handleEdit(entry)}>Edit</Button>
                <Button ml={2} onClick={() => deleteEntry(entry.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Entry</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input defaultValue={selectedEntry?.name} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input defaultValue={selectedEntry?.email} />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input defaultValue={selectedEntry?.phone} />
            </FormControl>
            <FormControl>
              <FormLabel>Date Of Birth</FormLabel>
              <Input type="date" defaultValue={selectedEntry?.dob} />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input defaultValue={selectedEntry?.city} />
            </FormControl>
            <FormControl>
              <FormLabel>District</FormLabel>
              <Input defaultValue={selectedEntry?.district} />
            </FormControl>
            <FormControl>
              <FormLabel>Province</FormLabel>
              <Select defaultValue={selectedEntry?.province}>
                <option value="Province 1">Province 1</option>
                <option value="Province 2">Province 2</option>
                <option value="Province 3">Province 3</option>
                <option value="Province 4">Province 4</option>
                <option value="Province 5">Province 5</option>
                <option value="Province 6">Province 6</option>
                <option value="Province 7">Province 7</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input defaultValue={selectedEntry?.country} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableComponent;
