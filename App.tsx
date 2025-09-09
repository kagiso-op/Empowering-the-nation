import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";

type Course = {
  id: string;
  name: string;
  fee: number;
  purpose: string;
  content: string;
};

const sixMonthCourses: Course[] = [
  { id: "1", name: "First Aid", fee: 1500, purpose: "Provide first aid awareness and basic life support.", content: "Wounds, burns, fractures, CPR, emergency management" },
  { id: "2", name: "Sewing", fee: 1500, purpose: "Garment alterations & tailoring services.", content: "Stitches, threading, sewing buttons/zips, designing garments" },
  { id: "3", name: "Landscaping", fee: 1500, purpose: "Landscaping for gardens.", content: "Indigenous/exotic plants, garden layout, plant balance, fixed structures" },
  { id: "4", name: "Life Skills", fee: 1500, purpose: "Basic life necessities.", content: "Banking, labor rights, literacy, numeracy" },
];

const shortCourses: Course[] = [
  { id: "5", name: "Child Minding", fee: 750, purpose: "Basic child and baby care skills.", content: "Birth–6 months, toddler care, educational toys" },
  { id: "6", name: "Cooking", fee: 750, purpose: "Prepare and cook nutritious family meals.", content: "Nutrition basics, meal planning, recipes" },
  { id: "7", name: "Garden Maintenance", fee: 750, purpose: "Basic garden care knowledge.", content: "Watering, pruning, planting techniques" },
];

export default function App() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const toggleCourse = (course: Course) => {
    setSelectedCourses(prev =>
      prev.includes(course.id)
        ? prev.filter(id => id !== course.id)
        : [...prev, course.id]
    );
  };

  const calculateTotal = () => {
    const allCourses = [...sixMonthCourses, ...shortCourses];
    const total = allCourses
      .filter(course => selectedCourses.includes(course.id))
      .reduce((sum, course) => sum + course.fee, 0);

    return `R${total}`;
  };

  const renderCourse = ({ item }: { item: Course }) => (
    <TouchableOpacity
      style={[
        styles.courseCard,
        selectedCourses.includes(item.id) && styles.selectedCard,
      ]}
      onPress={() => toggleCourse(item)}
    >
      <Text style={styles.courseTitle}>{item.name}</Text>
      <Text style={styles.fee}>Fee: R{item.fee}</Text>
      <Text style={styles.purpose}>Purpose: {item.purpose}</Text>
      <Text style={styles.content}>Content: {item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
      <View style={styles.headerBar}>
  <Image source={require("./assets/logo.png")}
    style={styles.logo} 
  />

  <Text style={styles.header}>Empowering the Nation</Text>
  <View style={{ width: 40 }} />
</View>

        <Text style={styles.subHeader}>Six-Month Learnerships</Text>
        <FlatList
          data={sixMonthCourses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />

        <Text style={styles.subHeader}>Six-Week Short Courses</Text>
        <FlatList
          data={shortCourses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />

        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total Fees: {calculateTotal()}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 15,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logo: { 
    width: 40, 
    height: 40, 
    borderRadius: 8 
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00e5ff",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00e5ff",
    marginVertical: 10,
  },
  courseCard: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedCard: {
    borderColor: "#00e5ff",
    borderWidth: 2,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00e5ff",
  },
  fee: {
    color: "#fff",
    marginTop: 5,
  },
  purpose: {
    color: "#ccc",
    marginTop: 5,
  },
  content: {
    color: "#aaa",
    marginTop: 5,
    fontStyle: "italic",
  },
  totalBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 12,
  },
  totalText: {
    color: "#00e5ff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
