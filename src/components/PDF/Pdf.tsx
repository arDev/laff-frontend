import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer"
import "./Pdf.css"
import { IPersona } from "../../interfaces/IPersona";
import { useEffect, useState } from "react";
import logo from "../../assets/lafflogo.png"
import BoldArial from "../../assets/Arial_Bold.ttf";
import Arial from "../../assets/Arial.ttf";
import Texto from "../ListadoJugadores/Texto";
import { appSetting } from "../../settings/appSettings";


const styles = StyleSheet.create(
    {
        campo: {
            display: "flex",
            flexDirection: "row",
            gap: 5,
        },
        campoFicha: {
            marginBottom: 10,
            display: "flex",
            flexDirection: "row",
            gap: 5,
        },
        texto: {
            fontSize: 11,
            fontFamily: "Arial"
        },
        socio: {
            justifyContent: "flex-end",
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Arial",

        },
        titulo: {
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Arial"
        },
        titulo1: {
            fontSize: 12,
            fontWeight: "bold",
            fontFamily: "Arial"
        },
        firma: {
            fontSize: 14
        },

        logoFicha: {
            width: "2cm",
            height: "2cm",
        },
        foto: {
            width: "3cm",
            height: "2.5cm",
        },
        fotoFicha: {
            width: "4cm",
            height: "4cm",
        },
        page: {
            backgroundColor: '#E4E4E4',
            padding: 20
        },
        carnet: {
            border: '2px solid black',
            width: '9cm',
            height: '5cm'
        },
        ficha: {
            marginTop: 2,
            border: '2px solid black',
            width: '15.5cm',
            height: '10cm'
        },
        section: {
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: 'center'
        },
        sectionTitulo: {
            padding: 5,
            display: "flex",
            flexDirection: "row",
            gap: 15,
            justifyContent: "space-between",

        },
        sectionPie: {
            padding: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        sectionLeyendaFicha: {
            padding: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
        },
        sectionFirma: {
            padding: 15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end"
        },
    });

type personaParam = {
    persona?: IPersona,
    carnet?: boolean,
    ficha?: boolean
}

const Pdf = ({ persona, carnet, ficha }: personaParam) => {

    Font.register({
        family: "Arial",
        fontStyle: "normal",
        fontWeight: "normal",
        fonts: [
            {
                src: Arial,
            },
            {
                src: BoldArial,
                fontWeight: "bold",
            },
        ],
    });


    const [url, setUrl] = useState<string>("")

    useEffect(() => {
        const id = persona == undefined ? 0 : persona.id
        setUrl(appSetting.urlApi + "/laff/api.php?request=carnet&id=" + id)
    }, [])


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {
                    //Carnet
                }
                {!carnet ? <></> :
                    <View style={styles.carnet}>
                        <View style={styles.sectionTitulo}>
                            <View>
                                <Text style={styles.titulo1}>Liga amateur de Futbol de Flores</Text>
                            </View>
                            <View style={styles.campo}>
                                <Text style={styles.socio}>123456</Text>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <View style={{ border: "2" }}>
                                <Image
                                    style={styles.foto}
                                    src={url}
                                />
                            </View>
                            <View >
                                <View style={styles.campo}>
                                    <Text style={styles.titulo}>Apellido</Text>
                                    <Text style={styles.texto}>{persona?.apellido}</Text>
                                </View>
                                <View style={styles.campo}>
                                    <Text style={styles.titulo}>Nombre</Text>
                                    <Text style={styles.texto}>{persona?.nombre}</Text>
                                </View>
                                <View style={styles.campo}>
                                    <Text style={styles.titulo}>Nro de Doc</Text>
                                    <Text style={styles.texto}>{persona?.nroDoc}</Text>
                                </View>
                                <View style={styles.campo}>
                                    <Text style={styles.titulo}>Equipo</Text>
                                    <Text style={styles.texto}>{persona?.direccion}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.sectionPie}>
                            <View>
                                <Texto tamano={8} >_____________</Texto>
                                <Texto tamano={8} >Jugador</Texto>
                            </View>
                            <View>
                                <Texto tamano={8} >___________________</Texto>
                                <Texto tamano={8} >Comisión Directiva</Texto>
                            </View>
                        </View>
                    </View>
                }
                {
                    //Ficha
                }
                {!ficha ? <></> :
                    <View style={styles.ficha}>
                        <View style={styles.sectionTitulo}>
                            <View style={styles.sectionTitulo}>
                                <View>
                                    <Image style={styles.logoFicha} src={logo} />
                                </View>
                                <View>
                                    <Text style={[styles.titulo1]}>Liga amateur de Futbol de Flores</Text>
                                    <Texto tamano={10}>Ficha de persona</Texto>
                                </View>
                            </View>
                            <View style={styles.sectionTitulo}>
                                <View>
                                    <Texto tamano={14} negrita={true} >123456</Texto>
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={{ border: "2" }}>
                                <Image
                                    style={styles.fotoFicha}
                                    src={url}
                                />
                            </View>
                            <View >
                                <View style={styles.campoFicha}>
                                    <Text style={styles.titulo}>Nombre</Text>
                                    <Text style={styles.texto}>{persona?.apellido}, {persona?.nombre}</Text>
                                </View>
                                <View style={styles.campoFicha}>
                                    <Text style={styles.titulo}>Domicilio</Text>
                                    <Text style={styles.texto}>{persona?.direccion}</Text>
                                </View>
                                <View style={styles.campoFicha}>
                                    <Text style={styles.titulo}>Localidad </Text>
                                    <Text style={styles.texto}>{persona?.localidad}</Text>
                                    <Text style={styles.titulo}>Tel. </Text>
                                    <Text style={styles.texto}>{persona?.telefono}</Text>
                                </View>
                                <View style={styles.campoFicha}>
                                    <Text style={styles.titulo}>Fecha Nacimiento</Text>
                                    <Text style={styles.texto}>11/11/2011</Text>
                                </View>
                                <View style={styles.campoFicha}>
                                    <Text style={styles.titulo}>Nro de Doc</Text>
                                    <Text style={styles.texto}>{persona?.nroDoc}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.sectionLeyendaFicha}>
                            <View >
                                <Texto tamano={10}>La persona es jugador del quipo XXXXXXXX</Texto>

                            </View>
                        </View>
                        <View style={styles.sectionFirma}>
                            <View>
                                <Texto tamano={8}>___________________</Texto>
                                <Texto tamano={8}>    Firma jugador</Texto>
                            </View>
                        </View>

                    </View>
                }
            </Page>
        </Document >
    )
}

export default Pdf;