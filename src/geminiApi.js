import axios from "axios";
import { db } from "./firebaseConfig"; // Make sure the path to firebaseConfig is correct
import { doc, getDoc } from "firebase/firestore";

// Function to fetch API configuration from Firestore
const fetchApiConfig = async () => {
  const docRef = doc(db, "gemini", "api");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return { API_URL: data.API_URL, API_KEY: data.API_KEY };
  } else {
    throw new Error("API configuration document does not exist.");
  }
};

// Function to connect to the API with dynamically fetched URL and Key
export const testApiConnection = async (inputValue) => {
  console.log("Attempting to connect to API with input:", inputValue);

  try {
    const { API_URL, API_KEY } = await fetchApiConfig(); // Fetch API details from Firestore

    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: inputValue,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error generating output:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to generate output from API. Please try again.");
  }
};
