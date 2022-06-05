import React, { useLayoutEffect, useState, useEffect } from "react";
import {
    SafeAreaView, ScrollView, StyleSheet, View, Pressable, TextInput, KeyboardAvoidingView, Alert, Modal, Text,
} from "react-native";
import * as Haptics from "expo-haptics";
import { doc, getDocs, collection, where, query, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebase-config";
import { MaterialIcons } from '@expo/vector-icons';

const ModalExamen = ({ modalExamen, setModalExamen, examen, titulo }) => {
    const [examenState, setExamenState] = useState(examen);

    const estadoExamen = () => {
        if (examenState.estado === "inactivo") {
            return (
                <Text style={styles.textSubtitulo}>
                    Estado: <Text style={styles.textInactivo}>{examenState.estado}</Text>{" "}
                </Text>
            );
        }
    }

    const eliminarExamen = (x) => {
        const q = query(collection(db, "examenes"), where("codigoExamen", "==", x))
        const unsuscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref)
            })
            setModalExamen(!modalExamen)
        })
    }


    return (
        <Modal
            animationType="slide"
            presentationStyle="pageSheet"
            visible={modalExamen}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.containerBtnsPrincipales}>
                    <Pressable
                        style={({ pressed }) => [
                            { borderRadius: 10 },
                            pressed ? { opacity: 0.2 } : {},
                        ]}
                        onPress={() => {
                            setModalExamen(!modalExamen),
                                Haptics.notificationAsync(
                                    Haptics.NotificationFeedbackType.Success
                                );
                        }}
                    >
                        <Text style={styles.txtBtnSalir}>Salir</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            { borderRadius: 10 },
                            pressed ? { opacity: 0.2 } : {},
                        ]}
                        onPress={() => {
                            Alert.alert(
                                "Finalizar Examen",
                                "¿Seguro de finalizar el examen y recoger todos los resultados?",
                                [
                                    {
                                        text: "Cancelar",
                                        onPress: () => {
                                            return;
                                        },
                                        style: "cancel",
                                    },
                                    {
                                        text: "OK",
                                        onPress: () => {
                                            return;
                                        },
                                    },
                                ]
                            ),
                                Haptics.notificationAsync(
                                    Haptics.NotificationFeedbackType.Success
                                ),
                                console.log(plantillaState);
                        }}
                    >
                        <Text style={styles.txtBtnSalir}>Comenzar Examen</Text>
                    </Pressable>
                </View>

                <View style={styles.containerTituloExamen}>
                    <Text style={styles.textTitulo}> {titulo} </Text>
                    <Text style={styles.textSubtitulo}>
                        Responsable: {examenState.maestro}{" "}
                    </Text>
                    {estadoExamen()}
                </View>

                <View style={styles.containerBtnEstado}></View>

                <View style={styles.optionsMenu}>
                    <Pressable
                        style={({ pressed }) => [
                            pressed ? { opacity: 0.2, padding: 5 } : {},
                        ]}
                        onPress={() => {
                            Alert.alert('Eliminar Examen', '¿Seguro de borrar examen?', [
                                {
                                    text: 'Cancelar',
                                    onPress: () => { return },
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK', onPress: () => {
                                        eliminarExamen(examen.codigoExamen)
                                    }
                                },
                            ]), Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                        }
                        }
                    >

                        <View style={styles.optMenuCard}>
                            <MaterialIcons name="cancel" size={24} color="#a0a0a0" />

                            <Text style={styles.optMenuCardTxt}>
                                Eliminar examen
                            </Text>
                        </View>
                    </Pressable>

                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    optMenuCard: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    optMenuCardTxt: {
        marginLeft: 5,
        color: '#808080',
        fontWeight: '500'
    },
    optionsMenu: {
        marginTop: 20,
        flexDirection: 'column',
        marginHorizontal: +20
    },
    containerBtnsPrincipales: {
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        paddingHorizontal: 22,
        flexDirection: "row",
        backgroundColor: "#fff",
        zIndex: 2,
    },
    txtBtnSalir: {
        color: "#0F74F2",
        fontSize: 16,
        fontWeight: "600",
    },
    containerTituloExamen: {
        width: "100%",
        paddingHorizontal: 20,
    },

    textTitulo: {
        position: "relative",
        left: -8,
        fontSize: 30,
        marginBottom: 10,
    },
    textSubtitulo: {
        color: "#a0a0a0",
        fontSize: 16,
    },

    textInactivo: {
        color: "red",
        fontWeight: "600",
    },
});

export default ModalExamen;
