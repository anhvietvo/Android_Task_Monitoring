import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FAB } from "react-native-elements";

import { Context as TeamContext } from "../context/TeamContext";

const ManageTeams = ({ navigation }) => {
  const { state } = useContext(TeamContext);

  return (
    <View style={styles.btnContainer}>
      {state.length ? (
        <FlatList
          keyExtractor={(item) => item.TID}
          data={state}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("TeamTask")}
              >
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text style={styles.emptyItemText}>No Team Created</Text>
      )}
      <FAB
        title="Create Team"
        placement="right"
        onPress={() => navigation.navigate("CreateTeam")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
  },
  btn: {
    marginHorizontal: 30,
    height: 60,
    marginVertical: 15,
    alignSelf: "stretch",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#3bcdf9",
    borderColor: "#2E3191",
  },
  text: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  emptyItemText: {
    flex: 1,
    fontSize: 30,
    marginTop: 20,
    alignSelf: "center",
    color: "lightgrey",
  },
});

export default ManageTeams;
