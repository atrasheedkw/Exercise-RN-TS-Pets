import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import pets from "@/data/pets";
import PetItem from "./PetItem";

const PetList = () => {
  //adopted list useState that keeps being updated as an array
  const [Adopted, setAdopted] = useState<number[]>([]);
  const adoptHandler = (inputValue: number): void => {
    setAdopted((prevList) => [...prevList, inputValue]);
  };
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const petList = pets
    .filter((pet) => !Adopted.includes(pet.id)) // only show pets not adopted
    .filter((pet) => pet.name && pet.name.includes(query))
    .filter((pet) => type === "All" || pet.type.includes(type))
    .map((pet) => <PetItem key={pet.id} pet={pet} onAdopt={adoptHandler} />);

  //useState for pet type

  //handlepress for filters

  const handlePressFilters = (inputValue: string): void => {
    console.log("Filter OnPress Check: " + inputValue);
    setType(inputValue);
  };
  //filter logic based on pets array
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={(value) => {
          setQuery(value);
        }}
      />

      {/* Filter by type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            handlePressFilters("All");
          }}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            handlePressFilters("Cat");
          }}
        >
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            handlePressFilters("Dog");
          }}
        >
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            handlePressFilters("Rabbit");
          }}
        >
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Pet List */}
      {petList}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
