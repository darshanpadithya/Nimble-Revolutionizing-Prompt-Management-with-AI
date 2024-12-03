import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { testApiConnection } from "../src/geminiApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../screens/styles";
import parseMarkdown from "./MarkdownParser";
import { getDoc } from "firebase/firestore";
import { auth } from "../src/firebaseConfig";
import { getFirestore, doc } from "firebase/firestore";
import { initialPrompts } from "../src/prompts";
import GreetingMessage from "../src/GreetingMessage";

const db = getFirestore();

const InputScreen = ({ navigation }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const flatListRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [newPromptText, setNewPromptText] = useState("");
  const [predefinedPrompts, setPredefinedPrompts] = useState([
    ...initialPrompts,
  ]);
  const [username, setUsername] = useState(""); // State for username
  const [showLogoutButton, setShowLogoutButton] = useState(false); // State to control the visibility of the "Log Out" button

  const handleToggle = () => {
    setShowLogoutButton((prevState) => !prevState); // Toggle the "Log Out" button visibility
  };
  const handleAddPrompt = () => {
    if (newKeyword.trim() && newPromptText.trim()) {
      const isDuplicate = predefinedPrompts.some(
        (item) => item.keyword === newKeyword
      );
      if (isDuplicate) {
        alert("This keyword already exists.");
        return;
      }
      setPredefinedPrompts((prevPrompts) => [
        ...prevPrompts,
        { keyword: newKeyword, prompt: newPromptText },
      ]);
      setNewKeyword("");
      setNewPromptText("");
      setModalVisible(false);
    }
  };

  const getInitial = (name) => {
    if (name && name.length > 0) {
      return name.charAt(0).toUpperCase(); // Capitalize the first letter
    }
    return ""; // Return blank if no username
  };

  // Fetch prompts from AsyncStorage on initial load
  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const storedPrompts = await AsyncStorage.getItem("prompts");
        if (storedPrompts) {
          setPredefinedPrompts(JSON.parse(storedPrompts));
        } else {
          setPredefinedPrompts(initialPrompts); // Use default if nothing is stored
        }
      } catch (error) {
        console.error("Failed to load prompts from AsyncStorage", error);
        setPredefinedPrompts(initialPrompts);
      }
    };

    loadPrompts();
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const fetchedUsername = userDoc.data().username || "User";
            setUsername(fetchedUsername); // Set the username state

            const initialMessage = {
              type: "bot",
              style: styles.greetingText,
              isGreeting: true,
            };
            setMessages([initialMessage]);
          }
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setMessages([
          {
            type: "bot",
            style: styles.greetingText,
            isGreeting: true,
          },
        ]);
      }
    };

    fetchUsername();
  }, []);

  // Save prompts to AsyncStorage whenever they change
  useEffect(() => {
    const savePrompts = async () => {
      try {
        await AsyncStorage.setItem(
          "prompts",
          JSON.stringify(predefinedPrompts)
        );
      } catch (error) {
        console.error("Failed to save prompts to AsyncStorage", error);
      }
    };

    savePrompts();
  }, [predefinedPrompts]);

  const handleDeletePrompt = (keyword) => {
    setPredefinedPrompts((prevPrompts) =>
      prevPrompts.filter((prompt) => prompt.keyword !== keyword)
    );
  };

  const handleResetPrompts = () => {
    setPredefinedPrompts([...initialPrompts]);
  };

  const handleSend = async () => {
    const promptText = selectedKeyword
      ? predefinedPrompts.find((item) => item.keyword === selectedKeyword)
          ?.prompt +
        " " +
        inputValue
      : inputValue;

    if (!promptText.trim()) return;

    const userMessage = {
      keyword: selectedKeyword,
      text: inputValue,
      type: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setSelectedKeyword(null);

    try {
      const apiResponse = await testApiConnection(promptText);
      const replyText =
        apiResponse.candidates[0]?.content?.parts[0]?.text ||
        "No reply received.";
      const botMessage = { text: replyText, type: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      flatListRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      const errorMessage = { text: "Failed to fetch reply.", type: "bot" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleOptionSelect = (item) => {
    setSelectedKeyword(item.keyword);
    setShowOptions(false);
  };

  const renderOptions = () => {
    if (!showOptions) return null;
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.optionsContainer}>
          {predefinedPrompts.map((item, index) => (
            <View key={index} style={styles.optionItem}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionSelect(item)}
              >
                <Text style={styles.optionText}>{item.keyword}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeletePrompt(item.keyword)}
                style={styles.deleteButtonContainer}
              >
                <Text style={styles.deleteButton}>x</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPrompts}
          >
            <Text style={styles.resetButtonText}>Reset Prompts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const handleLogout = () => {
    // Perform logout logic
    try {
      // Firebase sign-out (if you're using Firebase)
      auth
        .signOut()
        .then(() => {
          setUsername(""); // Reset the username or clear user data
          setShowLogoutButton(false); // Hide the Log Out button after logging out
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Error", "Failed to log out. Please try again.");
        });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while logging out.");
    }
    navigation.navigate("SignInScreen");
  };

  const renderItem = ({ item }) => {
    if (item.type === "bot") {
      return (
        <View style={styles.botMessageContainer}>
          <Text style={styles.botName}>Friday</Text>
          <View style={styles.botMessage}>
            {item.isGreeting ? (
              <GreetingMessage username={username} />
            ) : (
              <Text style={styles.messageText}>{parseMarkdown(item.text)}</Text>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.message, styles.userMessage]}>
        {item.keyword && (
          <View style={styles.keywordContainer}>
            <Text style={styles.keywordText}>{item.keyword}: </Text>
          </View>
        )}
        <Text style={styles.messageText}>{parseMarkdown(item.text)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topButtonContainer}>
          <TouchableOpacity
            style={styles.topButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.topButtonText}>📑 ➕ </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topLeftButtonContainer}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={handleToggle} // Toggle visibility when pressed
          >
            <Text style={styles.circleButtonText}>{getInitial(username)}</Text>
          </TouchableOpacity>
        </View>

        {showLogoutButton && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        )}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Enter Keyword and Prompt</Text>

              <View style={styles.formFieldContainer}>
                <Text style={styles.label}>Keyword:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type here..."
                  value={newKeyword}
                  onChangeText={setNewKeyword}
                />
              </View>

              <View style={styles.formFieldContainer}>
                <Text style={styles.label}>Prompt Text:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type prompt here..."
                  value={newPromptText}
                  onChangeText={setNewPromptText}
                />
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddPrompt}
              >
                <Text style={styles.addButtonText}>Add Prompt</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messageList}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        {renderOptions()}
        <View style={styles.inputContainer}>
          {selectedKeyword && (
            <View style={styles.selectedKeywordContainer}>
              <Text style={styles.selectedKeywordText}>{selectedKeyword}</Text>
            </View>
          )}
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleSend}
            multiline
            numberOfLines={1}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Text style={styles.uploadButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InputScreen;
