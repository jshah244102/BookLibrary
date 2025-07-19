import React, { useEffect, useState, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Text, Card, Button, Title, Paragraph } from "react-native-paper";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { BorrowedBooksContext } from "../App";

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { borrowedBooks } = useContext(BorrowedBooksContext);

  const uploadBooks = async () => {
    try {
      const booksRef = collection(db, "books");
      for (const book of booksToUpload) {
        await addDoc(booksRef, book);
        console.log(`Uploaded: ${book.title}`);
      }
      console.log("All books uploaded successfully!");
    } catch (error) {
      console.error("Error uploading books: ", error);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const booksCol = collection(db, "books");
      const bookSnapshot = await getDocs(booksCol);
      const bookList = bookSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(bookList);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate("BookDetail", { book: item })}
    >
      <Card.Cover source={{ uri: item.coverUrl }} />
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>By {item.author}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => navigation.navigate("BookDetail", { book: item })}
        >
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchBooks} />
        }
        ListEmptyComponent={
          !loading && <Text style={{ textAlign: "center" }}>No books found</Text>
        }
      />

      <Button
        mode="contained"
        style={styles.borrowedButton}
        onPress={() => navigation.navigate("BorrowedBooks")}
      >
        Borrowed Books ({borrowedBooks.length})
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f6", padding: 10 },
  card: { marginBottom: 10, elevation: 3 },
  borrowedButton: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
  },
});
