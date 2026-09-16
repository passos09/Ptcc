import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

export default function App() {
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");

  function formatarCNPJ(texto: string) {
    let valor = texto.replace(/\D/g, "");

    if (valor.length > 14) {
      valor = valor.substring(0, 14);
    }

    valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
    valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

    setCnpj(valor);
  }

  function entrar() {
    if (!cnpj || !senha) {
      Alert.alert("Atenção", "Preencha o CNPJ e a senha.");
      return;
    }

    Alert.alert("Login", "Login realizado!");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* TÍTULO */}
        <View style={styles.titulo}>
          <Text style={styles.miniTitulo}>
            GESTORDOC - CENTRAL DE MONITORAMENTO FISCAL
          </Text>

          <Text style={styles.tituloPrincipal}>
            3DS - DOC-SYSTEM
          </Text>

          <Text style={styles.subtitulo}>
            Sistema de Monitoramento de Pendências Fiscais e Documentais
          </Text>
        </View>

        {/* SISTEMA */}
        <View style={styles.sistema}>

          {/* MENU LATERAL */}
          <View style={styles.menu}>

            {/* LOGO */}
            <View style={styles.logoArea}>
              <View style={styles.logo}>
                <Text style={styles.logoTexto}>D</Text>
              </View>

              <View>
                <Text style={styles.nomeLogo}>
                  GestorDoc
                </Text>

                <Text style={styles.versao}>
                  v1.0 - fiscal ops
                </Text>
              </View>
            </View>

            <View style={styles.linha} />


            {/* GERAL */}
            <Text style={styles.tituloMenu}>
              GERAL
            </Text>

            <Text style={styles.itemMenu}>
              • Dashboard
            </Text>

            <Text style={styles.itemMenu}>
              • Alertas
            </Text>


            {/* GESTÃO */}
            <Text style={styles.tituloMenu}>
              GESTÃO
            </Text>

            <Text style={styles.itemMenu}>
              • Empresas
            </Text>

            <Text style={styles.itemMenu}>
              • Certidões
            </Text>


            {/* ADMINISTRAÇÃO */}
            <Text style={styles.tituloMenu}>
              ADMINISTRAÇÃO
            </Text>

            <Text style={styles.itemMenu}>
              • Usuários
            </Text>


            {/* CONTA */}
            <Text style={styles.tituloMenu}>
              CONTA
            </Text>

            <View style={styles.sair}>
              <Text style={styles.sairTexto}>
                • Sair 
              </Text>
            </View>


            {/* USUÁRIO */}
            <View style={styles.usuario}>

              <View style={styles.avatar} />

              <View>
                <Text style={styles.nomeUsuario}>
                  Pedro Moia
                </Text>

                <Text style={styles.cargo}>
                  Administrador · acesso total
                </Text>
              </View>

            </View>

          </View>


          {/* ÁREA PRINCIPAL */}
          <View style={styles.conteudo}>

            <View style={styles.login}>

              {/* LOGO */}
              <View style={styles.logoLogin}>
                <Text style={styles.logoLoginTexto}>
                  D
                </Text>
              </View>


              {/* ENTRAR */}
              <Text style={styles.entrar}>
                Entrar
              </Text>

              <Text style={styles.descricao}>
                Acesse a central de monitoramento
                fiscal e documental da sua empresa.
              </Text>


              {/* CNPJ */}
              <Text style={styles.label}>
                CNPJ
              </Text>

              <TextInput
                style={styles.input}
                placeholder="00.000.000/0000-00"
                placeholderTextColor="#c5d0cd"
                value={cnpj}
                onChangeText={formatarCNPJ}
                keyboardType="numeric"
                maxLength={18}
              />


              {/* SENHA */}
              <Text style={styles.label}>
                SENHA
              </Text>

              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#c5d0cd"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />


              {/* BOTÃO */}
              <TouchableOpacity
                style={styles.botao}
                onPress={entrar}
              >
                <Text style={styles.textoBotao}>
                  Entrar
                </Text>
              </TouchableOpacity>


              {/* ESQUECI SENHA */}
              <TouchableOpacity>
                <Text style={styles.esqueci}>
                  Esqueci minha senha
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#061411",
  },

  scroll: {
    flexGrow: 1,
    paddingBottom: 30,
  },


  // TÍTULO

  titulo: {
    alignItems: "center",
    paddingTop: 25,
    paddingHorizontal: 20,
  },

  miniTitulo: {
    color: "#42ddc4",
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "bold",
    textAlign: "center",
  },

  tituloPrincipal: {
    color: "#B8860B",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },

  subtitulo: {
    color: "#819a94",
    fontSize: 12,
    marginTop: 7,
    textAlign: "center",
  },


  // SISTEMA

  sistema: {
    flex: 1,
    minHeight: 650,
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#263733",
    flexDirection: "row",
    backgroundColor: "#0a1916",
  },


  // MENU

  menu: {
    width: 210,
    backgroundColor: "#030d0b",
    borderRightWidth: 1,
    borderRightColor: "#1d302c",
    padding: 14,
  },

  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 7,
  },

  logo: {
    width: 31,
    height: 31,
    borderRadius: 8,
    backgroundColor: "#20b99f",
    alignItems: "center",
    justifyContent: "center",
  },

  logoTexto: {
    color: "#06241e",
    fontWeight: "bold",
    fontSize: 16,
  },

  nomeLogo: {
    color: "#e5f0ed",
    fontWeight: "bold",
    fontSize: 13,
  },

  versao: {
    color: "#55716a",
    fontSize: 8,
    marginTop: 3,
  },

  linha: {
    height: 1,
    backgroundColor: "#1d302c",
    marginVertical: 18,
  },

  tituloMenu: {
    color: "#506962",
    fontSize: 9,
    letterSpacing: 1.5,
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 8,
  },

  itemMenu: {
    color: "#839b95",
    fontSize: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  sair: {
    backgroundColor: "#10332c",
    borderLeftWidth: 2,
    borderLeftColor: "#42ddc4",
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 10,
  },

  sairTexto: {
    color: "#42ddc4",
    fontSize: 12,
    fontWeight: "bold",
  },


  // USUÁRIO

  usuario: {
    marginTop: "auto",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#1d302c",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  avatar: {
    width: 29,
    height: 29,
    borderRadius: 20,
    backgroundColor: "#087461",
  },

  nomeUsuario: {
    color: "#e5f0ed",
    fontSize: 11,
    fontWeight: "bold",
  },

  cargo: {
    color: "#587069",
    fontSize: 8,
    marginTop: 3,
  },


  // CONTEÚDO

  conteudo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },


  // LOGIN

  login: {
    width: "80%",
    maxWidth: 360,
  },

  logoLogin: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#32cbb0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  logoLoginTexto: {
    color: "#05251f",
    fontSize: 19,
    fontWeight: "bold",
  },

  entrar: {
    color: "#e7f4f1",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 7,
  },

  descricao: {
    color: "#78918b",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 25,
  },


  // CAMPOS

  label: {
    color: "#56716a",
    fontSize: 9,
    letterSpacing: 1.5,
    marginBottom: 7,
  },

  input: {
    height: 40,
    backgroundColor: "#101f1c",
    borderWidth: 1,
    borderColor: "#263934",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#ffffff",
    fontSize: 12,
    marginBottom: 18,
  },


  // BOTÃO

  botao: {
    height: 40,
    borderRadius: 8,
    backgroundColor: "#46ddc3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  textoBotao: {
    color: "#04251f",
    fontSize: 12,
    fontWeight: "bold",
  },


  // ESQUECI SENHA

  esqueci: {
    color: "#57716a",
    fontSize: 10,
    textAlign: "center",
    marginTop: 18,
  },

});