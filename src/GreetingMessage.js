import React, { useEffect, useState } from "react";
import { View, Text, Image, Animated } from "react-native";
import { db } from "../src/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import styles from "../screens/styles";

const GreetingMessage = ({ username }) => {
  const [displayText, setDisplayText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [t3, setT3] = useState("");
  const [t4, setT4] = useState("");
  const typingSpeed = 40;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const docRef = doc(db, "gemini", "initial");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setT1(data.text1 || "Hii");
          setT2(data.text2 || "");
          setT3(data.text3 || "");
          setT4(data.text4 || "");
          setImageUrl(data.image || "");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    // Concatenate fetched text into `fullText` once t1, t2, t3, and t4 are available
    const fullText = `${t1}\n${t2}\n${t3}\n${t4}`;

    if (fullText) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        currentIndex++;
        if (currentIndex === fullText.length) {
          clearInterval(interval);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }
  }, [t1, t2, t3, t4]);

  return (
    <View style={styles.botMessage}>
      <Text style={styles.greetingText}>
        <Text style={styles.helloText}>Hey, </Text>
        <Text style={styles.usernameText}>{username}</Text>
      </Text>

      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.greetingImage} />
      ) : (
        <Text>Loading image...</Text>
      )}

      <Animated.Text style={styles.interactiveText}>
        {displayText}
      </Animated.Text>
    </View>
  );
};

export default GreetingMessage;
