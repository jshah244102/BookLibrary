import React, { useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import BookListScreen from "./screens/BookListScreen";
import BookDetailScreen from "./screens/BookDetailScreen";
import BorrowedBooksScreen from "./screens/BorrowedBooksScreen";

export const BorrowedBooksContext = createContext();

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
    background: "#f6f6f6",
  },
};

export default function App() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  return (
    <BorrowedBooksContext.Provider value={{ borrowedBooks, setBorrowedBooks }}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="BookList"
            screenOptions={{
              headerStyle: { backgroundColor: theme.colors.primary },
              headerTintColor: "white",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          >
            <Stack.Screen
              name="BookList"
              component={BookListScreen}
              options={{ title: "Book Library" }}
            />
            <Stack.Screen
              name="BookDetail"
              component={BookDetailScreen}
              options={{ title: "Book Details" }}
            />
            <Stack.Screen
              name="BorrowedBooks"
              component={BorrowedBooksScreen}
              options={{ title: "Borrowed Books" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </BorrowedBooksContext.Provider>
  );
}
