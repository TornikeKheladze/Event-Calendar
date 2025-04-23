import "./global.css";
import Calendar from "./src/components/Calendar/Calendar";

export default function App() {
  return <Calendar />;
}

// Open android/build.gradle and add:

// allprojects {
//     repositories {
//         // ... other repos
//         maven {
//             url "$rootDir/../node_modules/@notifee/react-native/android/libs"
//         }
//     }
// }

//  maven {
//             url "$rootDir/../node_modules/@notifee/react-native/android/libs"
//         }
