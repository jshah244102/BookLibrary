import React, { useContext } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Text, Card, Button, Title } from "react-native-paper";
import { BorrowedBooksContext } from "../App";

export default function BorrowedBooksScreen() {
  const { borrowedBooks, setBorrowedBooks } = useContext(BorrowedBooksContext);

  const returnBook = (bookId) => {
    Alert.alert("Return Book", "Are you sure you want to return this book?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () =>
          setBorrowedBooks(borrowedBooks.filter((book) => book.id !== bookId)),
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => returnBook(item.id)} color="#b00020">
          Return Book
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {borrowedBooks.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          You have no borrowed books.
        </Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f6", padding: 10 },
  card: { marginVertical: 8, elevation: 3 },
});
