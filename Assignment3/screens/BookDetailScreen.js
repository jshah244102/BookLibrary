import React, { useContext, useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { Text, Button, Card, Title, Paragraph } from "react-native-paper";
import { BorrowedBooksContext } from "../App";

export default function BookDetailScreen({ route, navigation }) {
  const { book } = route.params;
  const { borrowedBooks, setBorrowedBooks } = useContext(BorrowedBooksContext);
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    setIsBorrowed(borrowedBooks.some((b) => b.id === book.id));
  }, [borrowedBooks]);

  const borrowBook = () => {
    if (borrowedBooks.length >= 3) {
      Alert.alert(
        "Limit Reached",
        "You cannot borrow more than 3 books at a time."
      );
      return;
    }
    if (!isBorrowed) {
      setBorrowedBooks([...borrowedBooks, book]);
      Alert.alert("Success", "Book borrowed successfully!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={{ marginBottom: 20 }}>
        <Card.Cover source={{ uri: book.coverUrl }} />
        <Card.Content>
          <Title>{book.title}</Title>
          <Paragraph style={styles.author}>By {book.author}</Paragraph>
          <Paragraph style={styles.description}>{book.description}</Paragraph>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={borrowBook}
        disabled={isBorrowed}
        style={styles.borrowButton}
      >
        {isBorrowed ? "Already Borrowed" : "Borrow Book"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f6f6f6",
    flexGrow: 1,
  },
  author: {
    marginTop: 10,
    fontStyle: "italic",
    color: "#555",
  },
  description: {
    marginTop: 15,
    fontSize: 16,
    lineHeight: 22,
  },
  borrowButton: {
    marginTop: 20,
  },
});
