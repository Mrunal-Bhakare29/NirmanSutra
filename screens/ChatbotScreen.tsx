import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Voice from "@react-native-voice/voice";

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "👷‍♂️ Hello! I’m your NirmanSutra Assistant.\nAsk about materials, SSR rates, or nearby suppliers!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  // 🧱 30+ Civil Engineering / Construction Q&A
  const QA_MAP = [
    { key: ["hello", "hi"], answer: "Hello! 👷‍♂️ How can I help you today?" },
    { key: ["cement"], answer: "Cement rate is around ₹350–₹400 per bag depending on location." },
    { key: ["steel", "tmt"], answer: "TMT Steel costs around ₹55–₹65 per kg on average." },
    { key: ["sand"], answer: "River sand costs around ₹45–₹60 per cubic foot depending on region." },
    { key: ["aggregate", "metal"], answer: "Aggregate (metal) costs around ₹900–₹1200 per brass." },
    { key: ["concrete", "rcc"], answer: "RCC Concrete costs ₹4500–₹5500 per cubic meter." },
    { key: ["brick"], answer: "Brick rates are ₹7–₹10 per piece based on quality and region." },
    { key: ["tile", "flooring"], answer: "Floor tiles cost ₹35–₹70 per sq.ft. including laying." },
    { key: ["labour", "mason"], answer: "Mason labour charge is ₹700–₹900 per day in most regions." },
    { key: ["painter", "painting"], answer: "Painting labour cost is ₹20–₹30 per sq.ft. including material." },
    { key: ["plumber"], answer: "Plumber daily wage is around ₹800–₹1000 per day." },
    { key: ["electrician"], answer: "Electrician charge is ₹800–₹1000 per day depending on skill level." },
    { key: ["carpenter"], answer: "Carpenter labour is around ₹700–₹900 per day." },
    { key: ["waterproofing"], answer: "Waterproofing costs ₹70–₹150 per sq.ft. depending on method used." },
    { key: ["foundation", "footing"], answer: "Foundation depth and cost depend on soil bearing capacity — usually 4–6 feet deep." },
    { key: ["column"], answer: "Column concrete mix ratio is commonly 1:1.5:3 with Fe500 steel." },
    { key: ["beam"], answer: "Beam design depends on span and load — Fe500 steel with M20–M25 concrete is typical." },
    { key: ["slab"], answer: "Slab thickness is usually 4–6 inches for residential buildings." },
    { key: ["ssr"], answer: "SSR stands for Standard Schedule of Rates — a government-published cost reference." },
    { key: ["calculate", "estimation"], answer: "You can calculate material quantities using the Material Calculator in the app." },
    { key: ["supplier", "shop", "market"], answer: "You can find verified nearby suppliers in the Suppliers section." },
    { key: ["rate analysis"], answer: "Rate analysis breaks down cost into material, labour, machinery, and overhead." },
    { key: ["bitumen", "road"], answer: "Bitumen (VG30) rate is ₹60–₹70/kg; hot mix road costs ₹900–₹1200/ton." },
    { key: ["machinery", "jcb"], answer: "JCB hire charges are ₹900–₹1200 per hour depending on location." },
    { key: ["cement bag weight"], answer: "A standard cement bag weighs 50 kg." },
    { key: ["mix ratio"], answer: "Common concrete mix ratios: M20 → 1:1.5:3, M25 → 1:1:2." },
    { key: ["curing"], answer: "Curing should continue for at least 7–14 days to achieve strength." },
    { key: ["thank", "thanks"], answer: "You're welcome! 😊" },
    { key: ["bye", "goodbye"], answer: "Goodbye! Stay safe on your construction site! 👷‍♂️" },
    { key: ["material rate"], answer: "You can compare market and SSR rates in the Material Rate section." },
  ];

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // 💬 Handle Send
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const key = input.trim().toLowerCase();
      let botReply = "Sorry, I don't have an answer for that yet.";

      // Match by keywords
      for (let i = 0; i < QA_MAP.length; i++) {
        const qa = QA_MAP[i];
        if (qa.key.some((k) => key.includes(k))) {
          botReply = qa.answer;
          break;
        }
      }

      const botMsg = { id: Date.now().toString(), text: botReply, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  // 🎙️ Voice Input (Optional)
  const handleVoiceInput = async () => {
    try {
      await Voice.start("en-US");
      Voice.onSpeechResults = (event) => {
        const text = event.value[0];
        setInput(text);
      };
    } catch (e) {
      console.error("Voice error:", e);
    }
  };

  const renderMessage = ({ item }) => (
    <Animated.View
      style={[
        styles.message,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>🤖 NirmanSutra Assistant </Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
      />

      {/* Typing indicator */}
      {isTyping && (
        <View style={styles.typingContainer}>
          <ActivityIndicator color="#FFD700" size="small" />
          <Text style={styles.typingText}>Assistant is typing...</Text>
        </View>
      )}

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleVoiceInput} style={styles.micButton}>
          <Icon name="mic" size={22} color="#000" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask about materials or SSR..."
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Icon name="send" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// 💅 STYLES
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    backgroundColor: "#0f0f0fff",
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#FBC02D",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    height: 70,
  },
  headerText: { color: "white", fontSize: 25, fontWeight: "700", marginTop: 10 },
  chatContainer: { padding: 10 },
  message: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#9b7107ff",
    borderTopRightRadius: 0,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1E1E1E",
    borderTopLeftRadius: 0,
  },
  messageText: { color: "#fff", fontSize: 15 },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    marginBottom: 6,
  },
  typingText: { color: "#FBC02D", marginLeft: 8, fontSize: 13 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: "#333",
    backgroundColor: "#1A1A1A",
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingHorizontal: 12,
    backgroundColor: "#2C2C2C",
    borderRadius: 20,
    height: 60,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#ffd666",
    padding: 10,
    borderRadius: 50,
  },
  micButton: {
    marginRight: 8,
    backgroundColor: "#ffd666",
    padding: 10,
    borderRadius: 50,
  },
});
