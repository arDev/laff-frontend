import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer"
import "./Pdf.css"
import { IPersona } from "../../interfaces/IPersona";
import { useEffect, useState } from "react";
import logo from "../../assets/lafflogo.png"
import BoldArial from "../../assets/Arial_Bold.ttf";
import Arial from "../../assets/Arial.ttf";


const styles = StyleSheet.create(
    {
        campo: {
            display: "flex",
            flexDirection: "row",
            gap: 5,
        },
        texto: {
            fontSize: 11,
            fontFamily: "Arial"
        },
        titulo: {
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Arial"
          },
          titulo1: {
            fontSize: 13,
            fontWeight: "bold",
            fontFamily: "Arial"
          },
        firma: {
            fontSize: 14
        },
        logo: {
            width: 25,
            height: 25,
        },
        foto: {
            width: 60,
            height: 60,
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
            padding: 10,
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: 'center',
            
        },
        sectionPie: {
            padding: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end"
        },
    });

type personaParam = {
    persona?: IPersona
}

const Pdf = ({ persona }: personaParam) => {

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
        //cargarFoto()
        setUrl("http://localhost/laff/api.php?request=carnet&id=1")
    }, [])

    const cargarFoto = () => {
        //hacer la magia
        const requestOptions = {
            method: "GET"
        };
        const id = persona == undefined ? 0 : persona.id

        fetch("http://localhost/laff/api.php?request=foto&id=" + id, requestOptions)
            .then((response) => response.json())
            .then((foto) => {
                if (foto[0].imagen != "")
                    setUrl(foto[0].imagen)
                console.log(foto[0].imagen)
            })
            .catch((error) => console.error(error));
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.carnet}>
                    <View style={styles.sectionTitulo}>
                        <View >
                            <Image style={styles.logo} src={logo} />
                        </View>
                        <View>
                            <Text style={styles.titulo1}>Liga amateur de Futbol de Flores</Text>
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
                                <Text style={styles.titulo}>Socio:</Text>
                                <Text style={styles.texto}>9999</Text>
                            </View>
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
                        <View >
                            <Text style={styles.firma}>_____________</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document >
    )
}

export default Pdf;