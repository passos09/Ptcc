import React from "react";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";

export default function Dashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        horizontal={false}
      >
        {/* TÍTULO */}
        <View style={styles.titulo}>
          <Text style={styles.miniTitulo}>
            REGULARIS · CENTRAL DE MONITORAMENTO FISCAL
          </Text>

          <Text style={styles.tituloPrincipal}>
            Protótipo Web — versão futurista
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
                <Text style={styles.logoTexto}>R</Text>
              </View>

              <View>
                <Text style={styles.nomeLogo}>
                  Regularis
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

            <View style={styles.menuSelecionado}>
              <Text style={styles.menuSelecionadoTexto}>
                • Dashboard
              </Text>
            </View>

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
              • Tributos
            </Text>

            <Text style={styles.itemMenu}>
              • Certidões
            </Text>

            {/* ADMINISTRAÇÃO */}
            <Text style={styles.tituloMenu}>
              ADMINISTRAÇÃO
            </Text>

            <Pressable
              onPress={() => router.push("/usuarios")}
            >
              <Text style={styles.itemMenu}>
                • Usuários
              </Text>
            </Pressable>

            {/* CONTA */}
            <Text style={styles.tituloMenu}>
              CONTA
            </Text>

            <View style={styles.sair}>
              <Text style={styles.sairTexto}>
                • Sair (demo)
              </Text>
            </View>

            {/* USUÁRIO */}
            <View style={styles.usuario}>
              <View style={styles.avatar}>
                <Text style={styles.avatarTexto}>M</Text>
              </View>

              <View>
                <Text style={styles.nomeUsuario}>
                  Marina Souza
                </Text>

                <Text style={styles.cargo}>
                  Administrador · acesso
                </Text>

                <Text style={styles.cargo}>
                  total
                </Text>
              </View>
            </View>
          </View>

          {/* ÁREA PRINCIPAL */}
          <View style={styles.conteudo}>

            {/* CABEÇALHO */}
            <View style={styles.cabecalho}>
              <View>
                <Text style={styles.status}>
                  STATUS · CONTABILIDADE VALE SUL
                </Text>

                <Text style={styles.visaoGeral}>
                  Visão geral
                </Text>
              </View>

              <View style={styles.acoes}>
                <View style={styles.administrador}>
                  <Text style={styles.administradorTexto}>
                    Administrador
                  </Text>
                </View>

                <Pressable style={styles.botaoSair}>
                  <Text style={styles.botaoSairTexto}>
                    Sair
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* CARD PRINCIPAL */}
            <View style={styles.cardPrincipal}>

              {/* CÍRCULO */}
              <View style={styles.circuloArea}>
                <View style={styles.circulo}>
                  <Text style={styles.porcentagem}>
                    82%
                  </Text>

                  <Text style={styles.regularidade}>
                    REGULARIDADE
                  </Text>
                </View>
              </View>

              {/* TEXTO */}
              <View style={styles.cardTexto}>
                <Text style={styles.cardTitulo}>
                  21 empresas sob monitoramento contínuo
                </Text>

                <Text style={styles.cardDescricao}>
                  O sistema consulta automaticamente tributos e certidões
                  federais, estaduais e municipais, atualizando o índice de
                  regularidade em tempo real e disparando alertas preventivos.
                </Text>

                <View style={styles.tags}>
                  <View style={styles.tag}>
                    <Text style={styles.tagTexto}>
                      18 tributos em dia
                    </Text>
                  </View>

                  <View style={styles.tag}>
                    <Text style={styles.tagTexto}>
                      3 pendentes
                    </Text>
                  </View>

                  <View style={styles.tag}>
                    <Text style={styles.tagTexto}>
                      2 alertas ativos
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* INDICADORES */}
            <View style={styles.indicadores}>

              <View style={styles.indicador}>
                <Text style={styles.numeroVerde}>
                  18
                </Text>

                <Text style={styles.indicadorTexto}>
                  Tributos pagos em dia
                </Text>
              </View>

              <View style={styles.indicador}>
                <Text style={styles.numeroVermelho}>
                  03
                </Text>

                <Text style={styles.indicadorTexto}>
                  Tributos pendentes
                </Text>
              </View>

              <View style={styles.indicador}>
                <Text style={styles.numeroVermelho}>
                  02
                </Text>

                <Text style={styles.indicadorTexto}>
                  Alertas ativos
                </Text>
              </View>

              <View style={styles.indicador}>
                <Text style={styles.numeroVerde}>
                  21
                </Text>

                <Text style={styles.indicadorTexto}>
                  Empresas monitoradas
                </Text>
              </View>

            </View>

            {/* PARTE INFERIOR */}
            <View style={styles.parteInferior}>

              {/* EMPRESAS */}
              <View style={styles.empresasCard}>

                <Text style={styles.secaoTitulo}>
                  Empresas com pendência
                </Text>

                {/* CABEÇALHO TABELA */}
                <View style={styles.tabelaCabecalho}>
                  <Text style={styles.coluna}>
                    Empresa
                  </Text>

                  <Text style={styles.coluna}>
                    CNPJ
                  </Text>

                  <Text style={styles.coluna}>
                    Situação
                  </Text>
                </View>

                {/* EMPRESA 1 */}
                <View style={styles.linhaEmpresa}>
                  <Text style={styles.empresaNome}>
                    Vale Sul Comércio Ltda
                  </Text>

                  <Text style={styles.cnpj}>
                    12.345.678/0001-90
                  </Text>

                  <View style={styles.statusPendente}>
                    <Text style={styles.statusPendenteTexto}>
                      Pendente
                    </Text>
                  </View>
                </View>

                {/* EMPRESA 2 */}
                <View style={styles.linhaEmpresa}>
                  <Text style={styles.empresaNome}>
                    Nordeste Materiais ME
                  </Text>

                  <Text style={styles.cnpj}>
                    98.765.432/0001-11
                  </Text>

                  <View style={styles.statusVencendo}>
                    <Text style={styles.statusVencendoTexto}>
                      Vence em 3 dias
                    </Text>
                  </View>
                </View>

                {/* EMPRESA 3 */}
                <View style={styles.linhaEmpresa}>
                  <Text style={styles.empresaNome}>
                    Central Distribuidora S.A.
                  </Text>

                  <Text style={styles.cnpj}>
                    45.222.111/0001-30
                  </Text>

                  <View style={styles.statusDia}>
                    <Text style={styles.statusDiaTexto}>
                      Em dia
                    </Text>
                  </View>
                </View>

              </View>

              {/* LADO DIREITO */}
              <View style={styles.colunaDireita}>

                {/* SITUAÇÃO */}
                <View style={styles.situacaoCard}>
                  <Text style={styles.situacaoTitulo}>
                    Situação documental: atenção
                  </Text>

                  <Text style={styles.situacaoTexto}>
                    1 empresa com contrato vencido há mais de 30 dias
                  </Text>

                  <View style={styles.pontoVermelho} />
                </View>

                {/* ALERTAS */}
                <View style={styles.alertasCard}>

                  <Text style={styles.secaoTitulo}>
                    Últimos alertas
                  </Text>

                  {/* ALERTA 1 */}
                  <View style={styles.alerta}>
                    <View style={styles.alertaIcone}>
                      <Text style={styles.alertaIconeTexto}>
                        !
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.alertaTitulo}>
                        ICMS não pago
                      </Text>

                      <Text style={styles.alertaEmpresa}>
                        Vale Sul Comércio Ltda
                      </Text>

                      <Text style={styles.alertaTempo}>
                        HÁ 2H
                      </Text>
                    </View>
                  </View>

                  {/* ALERTA 2 */}
                  <View style={styles.alerta}>
                    <View style={styles.alertaIconeAmarelo}>
                      <Text style={styles.alertaIconeTexto}>
                        i
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.alertaTitulo}>
                        Certidão a vencer
                      </Text>

                      <Text style={styles.alertaEmpresa}>
                        Prefeitura de Guarulhos
                      </Text>

                      <Text style={styles.alertaTempo}>
                        ONTEM
                      </Text>
                    </View>
                  </View>

                </View>

              </View>
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

  /* TÍTULO */

  titulo: {
    alignItems: "center",
    paddingTop: 25,
    paddingHorizontal: 20,
  },

  miniTitulo: {
    color: "#20cdb0",
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "bold",
    textAlign: "center",
  },

  tituloPrincipal: {
    color: "#e8f1ee",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },

  subtitulo: {
    color: "#78918b",
    fontSize: 12,
    marginTop: 7,
    textAlign: "center",
  },

  /* SISTEMA */

  sistema: {
    flexDirection: "row",
    minHeight: 690,
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#263733",
    backgroundColor: "#0a1916",
  },

  /* MENU */

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
    backgroundColor: "#25c9ad",
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

  menuSelecionado: {
    backgroundColor: "#10372f",
    borderLeftWidth: 2,
    borderLeftColor: "#42ddc4",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  menuSelecionadoTexto: {
    color: "#42ddc4",
    fontSize: 12,
    fontWeight: "bold",
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

  /* USUÁRIO */

  usuario: {
    marginTop: 25,
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
    alignItems: "center",
    justifyContent: "center",
  },

  avatarTexto: {
    color: "#c9fff4",
    fontWeight: "bold",
    fontSize: 12,
  },

  nomeUsuario: {
    color: "#e5f0ed",
    fontSize: 11,
    fontWeight: "bold",
  },

  cargo: {
    color: "#587069",
    fontSize: 8,
    marginTop: 2,
  },

  /* CONTEÚDO */

  conteudo: {
    flex: 1,
    paddingBottom: 25,
  },

  /* CABEÇALHO */

  cabecalho: {
    minHeight: 75,
    paddingHorizontal: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1d302c",
  },

  status: {
    color: "#55716a",
    fontSize: 8,
    letterSpacing: 1.5,
  },

  visaoGeral: {
    color: "#e5f0ed",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
  },

  acoes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  administrador: {
    borderWidth: 1,
    borderColor: "#167f6e",
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  administradorTexto: {
    color: "#42ddc4",
    fontSize: 9,
    fontWeight: "bold",
  },

  botaoSair: {
    borderWidth: 1,
    borderColor: "#263733",
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },

  botaoSairTexto: {
    color: "#e5f0ed",
    fontSize: 10,
    fontWeight: "bold",
  },

  /* CARD PRINCIPAL */

  cardPrincipal: {
    margin: 28,
    marginBottom: 18,
    padding: 25,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#263733",
    backgroundColor: "#111f1c",
    flexDirection: "row",
    alignItems: "center",
  },

  circuloArea: {
    width: 145,
    alignItems: "center",
    justifyContent: "center",
  },

  circulo: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "#3fe3c4",
    alignItems: "center",
    justifyContent: "center",
  },

  porcentagem: {
    color: "#42ddc4",
    fontSize: 24,
    fontWeight: "bold",
  },

  regularidade: {
    color: "#56716a",
    fontSize: 7,
    marginTop: 4,
  },

  cardTexto: {
    flex: 1,
    paddingLeft: 20,
  },

  cardTitulo: {
    color: "#e5f0ed",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },

  cardDescricao: {
    color: "#78918b",
    fontSize: 10,
    lineHeight: 16,
    maxWidth: 620,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 13,
  },

  tag: {
    borderWidth: 1,
    borderColor: "#263b36",
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },

  tagTexto: {
    color: "#708a83",
    fontSize: 8,
  },

  /* INDICADORES */

  indicadores: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 28,
  },

  indicador: {
    flex: 1,
    minHeight: 72,
    borderWidth: 1,
    borderColor: "#263733",
    borderRadius: 11,
    backgroundColor: "#111f1c",
    padding: 13,
    justifyContent: "center",
  },

  numeroVerde: {
    color: "#42ddc4",
    fontSize: 22,
    fontWeight: "bold",
  },

  numeroVermelho: {
    color: "#ff6258",
    fontSize: 22,
    fontWeight: "bold",
  },

  indicadorTexto: {
    color: "#708881",
    fontSize: 9,
    marginTop: 3,
  },

  /* PARTE INFERIOR */

  parteInferior: {
    flexDirection: "row",
    gap: 18,
    paddingHorizontal: 28,
    marginTop: 18,
  },

  empresasCard: {
    flex: 1.4,
    borderWidth: 1,
    borderColor: "#263733",
    borderRadius: 12,
    backgroundColor: "#111f1c",
    padding: 16,
  },

  secaoTitulo: {
    color: "#e5f0ed",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 14,
  },

  tabelaCabecalho: {
    flexDirection: "row",
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#263733",
  },

  coluna: {
    flex: 1,
    color: "#526c65",
    fontSize: 8,
  },

  linhaEmpresa: {
    minHeight: 43,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#22332f",
  },

  empresaNome: {
    flex: 1,
    color: "#d9e7e3",
    fontSize: 9,
    fontWeight: "bold",
  },

  cnpj: {
    flex: 1,
    color: "#718a83",
    fontSize: 8,
  },

  statusPendente: {
    backgroundColor: "#3a2724",
    borderWidth: 1,
    borderColor: "#a84b3e",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },

  statusPendenteTexto: {
    color: "#ff6658",
    fontSize: 7,
  },

  statusVencendo: {
    backgroundColor: "#3b3420",
    borderWidth: 1,
    borderColor: "#87712b",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },

  statusVencendoTexto: {
    color: "#e3c84e",
    fontSize: 7,
  },

  statusDia: {
    backgroundColor: "#123d34",
    borderWidth: 1,
    borderColor: "#167f6e",
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 9,
  },

  statusDiaTexto: {
    color: "#42ddc4",
    fontSize: 7,
  },

  /* DIREITA */

  colunaDireita: {
    flex: 0.85,
    gap: 15,
  },

  situacaoCard: {
    minHeight: 58,
    borderWidth: 1,
    borderColor: "#874238",
    borderRadius: 12,
    backgroundColor: "#30201e",
    padding: 13,
    position: "relative",
  },

  situacaoTitulo: {
    color: "#ff6258",
    fontSize: 10,
    fontWeight: "bold",
  },

  situacaoTexto: {
    color: "#8e7772",
    fontSize: 8,
    marginTop: 4,
  },

  pontoVermelho: {
    position: "absolute",
    right: 14,
    top: 23,
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#c05245",
  },

  alertasCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#263733",
    borderRadius: 12,
    backgroundColor: "#111f1c",
    padding: 16,
  },

  alerta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#263733",
  },

  alertaIcone: {
    width: 27,
    height: 27,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#a84b3e",
    backgroundColor: "#34231f",
    alignItems: "center",
    justifyContent: "center",
  },

  alertaIconeAmarelo: {
    width: 27,
    height: 27,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#86732c",
    backgroundColor: "#332e1e",
    alignItems: "center",
    justifyContent: "center",
  },

  alertaIconeTexto: {
    color: "#e5c94c",
    fontWeight: "bold",
    fontSize: 13,
  },

  alertaTitulo: {
    color: "#dce9e5",
    fontSize: 10,
    fontWeight: "bold",
  },

  alertaEmpresa: {
    color: "#708780",
    fontSize: 8,
    marginTop: 3,
  },

  alertaTempo: {
    color: "#526c65",
    fontSize: 6,
    marginTop: 3,
  },

});