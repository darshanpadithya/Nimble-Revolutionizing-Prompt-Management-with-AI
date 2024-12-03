import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#F5F5F5",
    padding: 20,
    paddingTop: 90,
  },
  topButtonContainer: {
    position: "absolute",
    top: 40,
    right: 10,
    zIndex: 1,
  },
  topButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  topButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  messageList: {
    flexGrow: 1,
    marginBottom: 10,
  },
  message: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#D1E7DD",
    alignSelf: "flex-end",
  },
  botMessageContainer: {
    alignSelf: "flex-start",
    marginVertical: 5,
    maxWidth: "80%",
  },
  botMessage: {
    backgroundColor: "#E2E3E5",
    borderRadius: 5,
    padding: 5,
  },
  botName: {
    fontWeight: "bold",
    color: "#333",
  },
  messageText: {
    fontSize: 16,
    paddingLeft: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedKeywordContainer: {
    backgroundColor: "#733b73",
    paddingHorizontal: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedKeywordText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginTop: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#4CAF50",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
  },

  keywordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  keywordText: {
    fontWeight: "bold",
    fontSize: 16,
    paddingRight: 5,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  formFieldContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#555",
  },
  textInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  addButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "transparent", // Make background transparent for icon
  },

  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    backgroundColor: "#d9d9d9", // Light gray background
    borderRadius: 8, // Rounded corners for a softer look
    marginBottom: 10,
    position: "static",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    borderRadius: 10,
    margin: 5, // Spacing between each option
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
    maxHeight: 400, // Adjust the maxHeight for the options container
    overflow: "scroll",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    color: "white",
    fontSize: 12,
    marginRight: 5,
  },
  deleteButtonContainer: {
    marginLeft: 8, // Distance between the main text and the "X"
  },
  deleteButton: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
  },
  resetButton: {
    backgroundColor: "#28a745",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
    marginLeft: 5,
    alignSelf: "center",
    flexBasis: "100%",
  },
  resetButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  usernameText: {
    color: "#FF5722", // A bold, vibrant orange that contrasts nicely with the background
    fontSize: 18, // Larger font size to make the username prominent
    fontWeight: "900", // Ultra-bold for maximum emphasis
    textAlign: "center", // Center aligned for balance
    textTransform: "capitalize", // Capitalize for neatness
    marginVertical: 10, // Adequate spacing around the name
    // textDecorationLine: "underline", // Underline for extra emphasis
    letterSpacing: 2, // Increased spacing between letters for clarity
  },

  emoji: {
    fontSize: 28, // Larger for the emoji to stand out
    marginLeft: 8, // Add space between text and emoji
    textAlign: "center", // Align emoji with text
  },

  helloText: {
    fontSize: 18, // Larger font size to make the username prominent
    fontWeight: "900",
    fontWeight: "bold",

    color: "#FF5722", // Same green color for the "Hello" part
  },
  greetingImage: {
    width: "100%", // Adjust width
    height: 250, // Adjust height
    marginTop: 10, // Optional for spacing
    borderRadius: 10, // Optional for rounded corners
  },
  greetingText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },

  interactiveText: {
    marginTop: -50,
    fontSize: 16,
    fontStyle: "italic",
    color: "#555", // Slightly muted to make it feel like a casual chat
  },
  questionText: {
    fontSize: 18,
    color: "#333",
    marginTop: 10, // Adds space to separate the greeting from the question
  },

  topLeftButtonContainer: {
    position: "absolute",
    top: 35, // Adjust based on your needs
    left: 20, // Adjust based on your needs
    zIndex: 1, // Make sure it's above other elements
  },
  circleButton: {
    width: 50, // Diameter of the circle
    height: 50, // Diameter of the circle
    borderRadius: 25, // To make it circular
    backgroundColor: "#4CAF50", // Button color
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Optional shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  circleButtonText: {
    fontSize: 24, // Adjust font size to make the letter fit inside the circle
    color: "white",
    fontWeight: "bold", // Optional: make the letter bold
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1976D2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  circleButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 10, // Space between the circle button and the Log Out button
    backgroundColor: "#2196F3", // Log Out button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
