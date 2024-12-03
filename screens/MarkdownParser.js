import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

const parseMarkdown = (text) => {
  console.log(text);
  const parts = text
    .split(
      /(\*\*[^*]+\*\*|##[^\n]+|###\s*\d+\.[^\n]+|[\*][^*]+[\*]|`[^`]+`|\[.*?\]\(.*?\)|\n\*[^*]+|\n\n+)/g
    )
    .filter(Boolean);

  return parts.map((part, index) => {
    // Bold Text (**bold**)
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <Text key={index} style={styles.boldText}>
          {part.slice(2, -2)}
        </Text>
      );
    }

    // Header (## Header or ### Numbered Header)
    if (part.startsWith("##")) {
      // Handle numbered headers like ### 4. Current Trends and Data:
      if (part.startsWith("###") && part.match(/^###\s*\d+\./)) {
        return (
          <>
            <Text key={index} style={styles.header}>
              {part.trim()}
            </Text>
            <Text key={`${index}-space`} style={styles.lineBreak}>
              {"\n"}
            </Text>
          </>
        );
      }
      return (
        <>
          <Text key={index} style={styles.header}>
            {part.slice(2).trim()}
          </Text>
          <Text key={`${index}-space`} style={styles.lineBreak}>
            {"\n"}
          </Text>
        </>
      );
    }

    // Italic Text (*italic*)
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <Text key={index} style={styles.italicText}>
          {part.slice(1, -1)}
        </Text>
      );
    }

    // Inline Code (`code`)
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <>
          <Text key={index} style={styles.inlineCode}>
            {part.slice(1, -1)}
          </Text>
          <Text key={`${index}-space`} style={styles.lineBreak}>
            {"\n"}
          </Text>
        </>
      );
    }

    // Hyperlinks [Text](URL)
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [, linkText, url] = match;
        return (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(url)}>
            <Text style={styles.linkText}>{linkText}</Text>
          </TouchableOpacity>
        );
      }
    }

    // Bullet List Items (* item)
    if (part.startsWith("*") || part.startsWith("\n*")) {
      const itemText = part.trim().slice(1).trim();

      return (
        <View key={index} style={styles.listItem}>
          <Text style={styles.listBullet}>•</Text>
          <Text style={styles.listText}>{itemText}</Text>
        </View>
      );
    }

    // Line Breaks (Empty Line)
    if (part.startsWith("\n\n")) {
      return (
        <Text key={index} style={styles.lineBreak}>
          {"\n"}
        </Text>
      );
    }

    // Default Text (plain text)
    return (
      <Text key={index} style={styles.defaultText}>
        {part}
        <Text style={styles.lineBreak}>{"\n"}</Text>
      </Text>
    );
  });
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    marginVertical: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2a72d4",
    marginVertical: 12,
  },
  italicText: {
    fontStyle: "italic",
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  inlineCode: {
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontFamily: "monospace",
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  linkText: {
    color: "#1e90ff",
    textDecorationLine: "underline",
    fontSize: 16,
    marginVertical: 5,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
    paddingLeft: 5,
  },
  listBullet: {
    marginRight: 10,
    fontSize: 20,
    color: "#444",
    alignSelf: "flex-start",
  },
  listText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  lineBreak: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 5,
    color: "#444",
  },
  defaultText: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 5,
    color: "#444",
  },
});

export default parseMarkdown;
