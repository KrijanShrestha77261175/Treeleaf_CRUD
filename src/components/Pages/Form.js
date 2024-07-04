import React, { useContext, useEffect, useState } from "react";
import TreeLeafContext from "../../context/TreeLeafContext";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const FormComponent = () => {
  const { addEntry, updateEntry } = useContext(TreeLeafContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [countries, setCountries] = useState([]);
  const [editId, setEditId] = useState(null);
  const toast = useToast();
  const [selectedCountry, setSelectedCountry] = useState("Nepal");

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const onSubmit = (data) => {
    const newEntry = {
      ...data,
      id: editId || uuidv4(),
      profilePicture: data.profilePicture[0],
    };
    if (editId) {
      updateEntry(newEntry);
      setEditId(null);
    } else {
      addEntry(newEntry);
    }
    reset();
    toast({
      title: "Success.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} mb={4}>
      <FormControl isInvalid={errors.name}>
        <FormLabel>Name</FormLabel>
        <Input {...register("name", { required: true })} />
        {errors.name && <Text color="red.500">Name is required</Text>}
      </FormControl>
      <FormControl isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <Text color="red.500">Invalid email address</Text>}
      </FormControl>
      <FormControl isInvalid={errors.phone}>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="tel"
          {...register("phone", {
            required: true,
            minLength: 7,
            pattern: /^\d+$/,
          })}
        />
        {errors.phone && <Text color="red.500">Invalid phone number</Text>}
      </FormControl>
      <FormControl isInvalid={errors.dob}>
        <FormLabel>Date Of Birth</FormLabel>
        <Input type="date" {...register("dob", { required: true })} />
        {errors.dob && <Text color="red.500">Date Of Birth is required</Text>}
      </FormControl>
      <FormControl isInvalid={errors.city}>
        <FormLabel>City</FormLabel>
        <Input {...register("city", { required: true })} />
        {errors.city && <Text color="red.500">City is required</Text>}
      </FormControl>
      <FormControl isInvalid={errors.district}>
        <FormLabel>District</FormLabel>
        <Input {...register("district", { required: true })} />
        {errors.district && <Text color="red.500">District is required</Text>}
      </FormControl>
      <FormControl>
        <FormLabel>Province</FormLabel>
        <Select {...register("province", { required: true })}>
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
        <Select
          {...register("country")}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.cca3} value={country.name.common}>
              {country.name.common}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isInvalid={errors.profilePicture}>
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type="file"
          accept="image/png"
          {...register("profilePicture", {
            required: true,
            validate: (files) => files[0]?.type === "image/png",
          })}
        />
        {errors.profilePicture && (
          <Text color="red.500">Profile picture must be a PNG file</Text>
        )}
      </FormControl>
      <Button type="submit" mt={4} colorScheme="teal">
        Submit
      </Button>
    </Box>
  );
};

export default FormComponent;
