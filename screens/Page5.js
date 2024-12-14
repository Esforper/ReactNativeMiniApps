import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function Page5() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = () =>{
    if(!inputText.trim()) return;

    const newMessage = { id: Date.now().toString(), text: inputText, sender: 'user'};
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setInputText('');

    setIsLoading(true);
    setTimeout(() => {
      const replyMessage = { id:Date.now().toString(), text: 'Test', sender:'bot'};
      setMessages((prevMessages) => [replyMessage, ...prevMessages]);
      setIsLoading(false);

    }, 3000);

  };

  const renderItem = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle = {styles.messageList}
        />
        {
          isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size='small' color='#555'/>
              <Text style={styles.loadingText}>...</Text>
            </View>
          )}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='mesaj yazın...'
              value={inputText}
              onChangeText={setInputText}/>
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                  <Text style={styles.sendButtonText}>Gönder</Text>
              </TouchableOpacity>
          </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageList: { padding: 10 },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0078fe',
    borderRadius: 10,
    marginRight: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginLeft: 10,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#0078fe',
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: '#555',
  },
});