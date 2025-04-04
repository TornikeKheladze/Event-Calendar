import { SafeAreaView } from "react-native";
import "./global.css";
import Calendar from "./src/components/Calendar/Calendar";

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <Calendar />
    </SafeAreaView>
  );
}
