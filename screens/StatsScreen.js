import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { getTasks } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

export default function StatsScreen({ navigation }) {
  const { currentUser } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      if (!currentUser) return;

      const fetchStats = async () => {
        try {
          const tasks = await getTasks(currentUser.uid);
          setTotal(tasks.length);
setCompleted(tasks.filter((t) => t.completed).length);
        } catch (error) {
          Alert.alert("خطأ في جلب البيانات", error.message);
        }
      };

      fetchStats();
    }, [currentUser])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.stat}>عدد المهام الكلي: {total}</Text>
      <Text style={styles.stat}>المكتملة: {completed}</Text>
      <Text style={styles.stat}>غير المكتملة: {total - completed}</Text>
      <Button title="العودة" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  stat: { fontSize: 20, marginVertical: 10 },
});
