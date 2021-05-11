import React, { useContext, useEffect, useCallback, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { FAB } from "react-native-elements";

import { Context as TeamContext } from "../../context/TeamContext";
import { Context as AuthContext } from "../../context/AuthContext";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ManageTeams = ({ navigation }) => {
  const { state, loadTeam } = useContext(TeamContext);
  const authContext = useContext(AuthContext);

  // Control pull down flat list to refresh
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // Load Team in db to render every time ManageTeams Screen re-render
  useEffect(() => {
    loadTeam(authContext.state.username);
  }, []);

  return (
    <View style={styles.btnContainer}>
      {state.length ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={state}
          keyExtractor={(item) => item.TID.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("TeamTask", { item })}
              >
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <ScrollView
          style={styles.btnContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.emptyItemText}>No Team Created</Text>
        </ScrollView>
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
