import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import "./Pdf.css"
import { IPersona } from "../../interfaces/IPersona";
import { useEffect, useState } from "react";
import {Table, TR, TH, TD} from '@ag-media/react-pdf-table';

const styles = StyleSheet.create(
    {
        tabla: {
            padding: 30,
            fontSize: 8

        },
        logo: {
            width: 84,
            height: 70
        },
        page: {
            backgroundColor: '#E4E4E4',
            padding: 20
        },
        section1: {
            border: '2px solid black',

        },
        section: {
            padding: 10,
            display: "flex",
            flexDirection: "row",
            gap: 50,
            alignItems: "center"
        }

    });

type personaParam = {
    persona?: IPersona
}

const Pdf = ({ persona }: personaParam) => {

    const [url, setUrl] = useState<string>("")

    useEffect(() => {
        //cargarFoto()
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
                <View style={styles.section1}>
                    <View style={styles.section}>
                        <View >
                            <Image
                                style={styles.logo}
                                src="http://localhost/laff/api.php?request=foto&id=1"
                            />
                            <Text>{persona?.nombre}</Text>
                        </View>
                        <View >
                            <Text>Section #2</Text>
                            <Text>Section #2</Text>
                            <Text>Section #2</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tabla}>
                    <Table>
                        <TH>
                            <TD>Header 1</TD>
                            <TD>Header 2</TD>
                        </TH>
                        <TR>
                            <TD>Data 1</TD>
                            <TD>Data 2</TD>
                        </TR>
                    </Table>
                </View>

            </Page>
        </Document >
    )
}

export default Pdf;