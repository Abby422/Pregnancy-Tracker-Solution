import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, Button, TouchableOpacity} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { addPost, getPost } from "../services/firestore";
import firebase from "../services/firebase";

const Stack = createStackNavigator();

const topics = [
  { id: "1", title: "Prenatal care" },
  { id: "2", title: "Postnatal care" },
  { id: "3", title: "Breastfeeding" },
  { id: "4", title: "Infant care" },
  { id: "5", title: "Toddler care" },
  { id: "6", title: "Child care" },
];

const posts = [
  { id: "1", title: "Prenatal care", comments: [] },
  { id: "2", title: "Postnatal care", comments: [] },
  { id: "3", title: "Breastfeeding", comments: [] },
  { id: "4", title: "Infant care", comments: [] },
  { id: "5", title: "Toddler care", comments: [] },
  { id: "6", title: "Child care", comments: [] },
];

const comments = [
  { id: "1", postId: "1", text: "Prenatal care comment 1" },
  { id: "2", postId: "1", text: "Prenatal care comment 2" },
];

const TopicListScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTopics, setFilteredTopics] = useState(topics);

  const handleSearch = () => {
    const filtered = topics.filter((topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTopics(filtered);
  };

  const handleSelectTopic = (topic) => {
    navigation.navigate("TopicPosts", { selectedTopic: topic });
  };

  return (
    <View>
      <TextInput
        placeholder="Search topics"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={filteredTopics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectTopic(item)}>
            <View>
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const TopicPostsScreen = ({ route }) => {
  const { selectedTopic } = route.params;
  const [postsData, setPostsData] = useState([]);
  const [newPostText, setNewPostText] = useState("");

  useEffect(() => {
    const unsubscribe = firebase
        .firestore()
        .collection("posts")
        .where("topicId", "==", selectedTopic.id)
        .onSnapshot((snapshot) => {
            const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setPostsData(posts);
        });

    return () => unsubscribe();

  }, [selectedTopic]);

  const handleAddPost = () => {
    if (newPostText.trim() !== "") {
      firebase.firestore().collection("posts").add({
        topicId: selectedTopic.id,
        title: newPostText,
        comments: [],
        topic : selectedTopic.title,
      });

      setNewPostText("");
    }
  };

  const renderPost = ({ item }) => (
    <TouchableOpacity>
      <View>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Selected Topic: {selectedTopic.title}</Text>
      <FlatList
        data={postsData}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
      />
      <TextInput
        placeholder="Type your new post..."
        value={newPostText}
        onChangeText={setNewPostText}
      />
      <Button title="Add Post" onPress={handleAddPost} />
    </View>
  );
};

const CommunityScreen = () => {
  return (
    <Stack.Navigator initialRouteName="TopicList">
      <Stack.Screen name="TopicList" component={TopicListScreen} />
      <Stack.Screen name="TopicPosts" component={TopicPostsScreen} />
    </Stack.Navigator>
  );
};

export default CommunityScreen;
