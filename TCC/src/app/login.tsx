import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function entrar() {
    if (!cnpj.trim() || !senha.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha o CNPJ e a senha.");
      return;
    }

    Alert.alert("Login", `Tentativa de acesso com ${cnpj}`);
  }

  return (
    <SafeAreaView style={styles.page}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="shield-checkmark-outline" size={25} color="#fff" />
          </View>

          <Text style={styles.brand}>FiscalPro</Text>
          <Text style={styles.subtitle}>Gestão tributária inteligente</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Bem-vindo de volta</Text>
          <Text style={styles.description}>
            Acesse sua conta para continuar
          </Text>

          <Text style={styles.label}>CNPJ</Text>

          <View style={styles.inputContainer}>
  <Ionicons name="business-outline" size={19} color="#718096" />

  <TextInput
    style={styles.input}
    value={cnpj}
    onChangeText={setCnpj}
    placeholder="00.000.000/0000-00"
    placeholderTextColor="#94A3B8"
    keyboardType="numeric"
    autoCapitalize="none"
    autoCorrect={false}
  />
</View>

          <Text style={styles.label}>Senha</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={19} color="#718096" />

            <TextInput
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              placeholder="Digite sua senha"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!mostrarSenha}
            />

            <Pressable
              onPress={() => setMostrarSenha((valorAtual) => !valorAtual)}
              hitSlop={10}
            >
              <Ionicons
                name={mostrarSenha ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#718096"
              />
            </Pressable>
          </View>

          <Pressable onPress={() => Alert.alert("Recuperação de senha")}>
            <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={entrar}
          >
            <Ionicons name="log-in-outline" size={21} color="#fff" />
            <Text style={styles.loginButtonText}>Entrar</Text>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.line} />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.ssoButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => Alert.alert("Login corporativo")}
          >
            <Ionicons name="business-outline" size={19} color="#172033" />
            <Text style={styles.ssoButtonText}>Entrar com SSO Corporativo</Text>
          </Pressable>

          <Text style={styles.support}>
            Problemas para acessar?{" "}
            <Text style={styles.supportLink}>Fale com o suporte</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#0B1017",
  },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    backgroundColor: "#112143",
    paddingTop: 36,
    paddingBottom: 38,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2866E8",
    marginBottom: 14,
  },

  brand: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "#B8C3D9",
    fontSize: 13,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#F4F6FB",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 24,
    marginTop: -16,
  },

  title: {
    color: "#172033",
    fontSize: 20,
    fontWeight: "700",
  },

  description: {
    color: "#7A869D",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 24,
  },

  label: {
    color: "#172033",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 7,
  },

  inputContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D9DEEA",
    borderRadius: 8,
    paddingHorizontal: 13,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    color: "#172033",
    fontSize: 14,
  },

  forgotPassword: {
    color: "#2463EB",
    fontSize: 12,
    textAlign: "right",
    marginTop: -7,
    marginBottom: 22,
  },

  loginButton: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#2866E8",
    borderRadius: 8,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  buttonPressed: {
    opacity: 0.75,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E4ED",
  },

  dividerText: {
    color: "#8993A7",
    fontSize: 12,
    marginHorizontal: 12,
  },

  ssoButton: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D9DEEA",
    borderRadius: 8,
  },

  ssoButtonText: {
    color: "#172033",
    fontSize: 14,
    fontWeight: "500",
  },

  support: {
    color: "#8993A7",
    fontSize: 12,
    textAlign: "center",
    marginTop: 28,
  },

  supportLink: {
    color: "#2463EB",
    fontWeight: "600",
  },
});
