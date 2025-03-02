import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer"
import "../PDF/Pdf.css"
import { useEffect } from "react";
import logo from "../../assets/lafflogo.png"
import BoldArial from "../../assets/Arial_Bold.ttf";
import Arial from "../../assets/Arial.ttf";
import Texto from "./Texto";
import { IEquipo } from "../../interfaces/IEquipo";
// @ts-ignore
import { Table, TR, TH, TD } from '@ag-media/react-pdf-table';
import { useEquipo } from "../../customHook/useEquipo";
import useDate from "../../customHook/useDate";

const borderColor = 'black'

const styles = StyleSheet.create(
    {
        table: {
            width: '100%',
        },
        th: {
            fontSize: 12,
            height: "0.8cm",
            backgroundColor: 'grey',
        },
        td: {
            fontSize: 12,
            height: "0.8cm",
        },
        campo: {
            display: "flex",
            flexDirection: "row",
            gap: 5,
        },
        titulo1: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Arial"
        },
        mb: {
            marginBottom: 10
        },
        firma: {
            fontSize: 14
        },
        logo: {
            width: 70,
            height: 70,
        },
        foto: {
            width: 60,
            height: 60,
        },
        page: {
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
            justifyContent: "space-between"

        },
        sectionPie: {
            padding: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end"
        },
        celda:
        {
            padding: 5
        },
        centrar: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10
        }, row: {
            flexDirection: 'row',
            alignItems: 'center',
            height: 24,
            fontStyle: 'bold',
        },
        description: {
            width: '60%',
            textAlign: 'left',
            borderColor: borderColor,
            borderWidth: 1,
            paddingLeft: 8,
            fontSize: 12
        },
        qty: {
            width: '10%',
            borderColor: borderColor,
            borderWidth: 1,
            textAlign: 'right',
            paddingRight: 8,
            fontSize: 12
        },
        rate: {
            width: '15%',
            borderColor: borderColor,
            borderWidth: 1,
            textAlign: 'right',
            paddingRight: 8,
            fontSize: 12
        },
        amount: {
            width: '15%',
            textAlign: 'right',
            borderColor: borderColor,
            borderWidth: 1,
            paddingRight: 8,
            fontSize: 12
        },
    });

type equipoParam = {
    equipo?: IEquipo
}

const Listado = ({ equipo }: equipoParam) => {
    const { fechaFormateada } = useDate()

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

    const { dtSelect, delegado1, delegado2, jugadores, file } = useEquipo(equipo)

    const GetDtDel = (dtDel: {
        value: number,
        label: string,
        nroDoc?: string
    }) => {
        if (dtDel.value > 0)
            return dtDel.label

        return ""
    }

    const GetDtDelDoc = (dtDel: {
        value: number,
        nroDoc?: string
    }) => {
        if (dtDel.value > 0)
            return dtDel.nroDoc

        return ""
    }


    useEffect(() => {
        //const id = persona == undefined ? 0 : persona.id
        //setUrl("/laff/api.php?request=carnet&id=" + id)
        //cargarJugadores()
    }, [])
/*
    const cargarJugadores = () => {
        if (equipo == undefined)
            return

        const requestOptions = {
            method: "GET"
        };

        fetch(appSetting.urlApi + "/laff/api.php?request=equipo_get_jugadores&id=" + equipo.id + "&lista=1", requestOptions)
            .then((response) => response.json())
            .then((resultados) => {
                setJugadores(resultados)
            })
            .catch((error) => console.error(error));
    }
*/
    return (
        <Document>
            <Page size="LEGAL" style={styles.page}>
                <View>
                    <View style={styles.sectionTitulo}>
                        <View>
                            <Image style={styles.logo} src={logo} />
                        </View>
                        <View>
                            <Text style={[styles.titulo1, styles.mb]}>Liga amateur de Futbol de Flores</Text>
                            <Texto tamano={10}>{"Informe impreso el dia: " + fechaFormateada()}</Texto>
                        </View>
                        <View>
                            <Image style={styles.logo} src={file} />
                        </View>
                    </View>

                    <View style={styles.centrar}>
                        <Texto tamano={20} negrita={true}>Listado de buena fe</Texto>
                    </View>
                    <View style={styles.centrar}>
                        <Texto tamano={24} negrita={true}>{equipo?.nombre.toUpperCase()}</Texto>
                    </View>
                    <View>
                        <Table>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Nro de Orden: </Texto>
                                    <Text style={{ fontSize: 10 }}>{equipo?.orden}</Text>
                                </TD>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Vestuario: </Texto>
                                </TD>
                            </TR>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Fecha: </Texto>
                                </TD>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Planillero: </Texto>
                                </TD>
                            </TR>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Horario: </Texto>
                                </TD>
                                <TD style={styles.celda}>
                                    <Texto tamano={10} negrita={true}>Dia: </Texto>
                                </TD>
                            </TR>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Arbitro: </Texto>
                                </TD>
                                <TD style={styles.celda}>
                                    <Texto tamano={10} negrita={true}>DNI Arbitro: </Texto>
                                </TD>
                            </TR>
                        </Table>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Table>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Delegado: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDel(delegado1)}</Texto>
                                </TD>
                                <TD style={styles.celda}>
                                    <Texto tamano={10} negrita={true}>DNI: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDelDoc(delegado1)}</Texto>
                                </TD>
                            </TR>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>SubDelegado: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDel(delegado2)}</Texto>
                                </TD>
                                <TD style={styles.celda}>
                                    <Texto tamano={10} negrita={true}>DNI: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDelDoc(delegado2)}</Texto>
                                </TD>
                            </TR>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Dt: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDel(dtSelect)}</Texto>
                                </TD>
                                <TD style={styles.celda}>
                                    <Texto tamano={10} negrita={true}>DNI: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDelDoc(dtSelect)}</Texto>
                                </TD>
                            </TR>
                        </Table>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Table weightings={[0.05, 0.05, 0.05, 0.1, 0.6, 0.2, 0.2, 0.2]}>
                            <TH>
                                <TD style={styles.th}><Text>Ex</Text></TD>
                                <TD style={styles.th}>A</TD>
                                <TD style={styles.th}>G</TD>
                                <TD style={styles.th}>Nro</TD>
                                <TD style={styles.th}>Apellido, Nombre</TD>
                                <TD style={styles.th}>Carnet</TD>
                                <TD style={styles.th}>Nro de Doc</TD>
                                <TD style={styles.th}>Firma</TD>
                            </TH>
                            {jugadores.slice(0, 24).map(
                                (j, index) => (
                                    <TR key={index}>
                                        <TD style={styles.td}></TD>
                                        <TD style={styles.td}></TD>
                                        <TD style={styles.td}></TD>
                                        <TD style={styles.td}></TD>
                                        <TD style={styles.td}>{j.apellido}{j.apellido ? "," :""} {j.nombre}</TD>
                                        <TD style={styles.td}>{j.carnet}</TD>
                                        <TD style={styles.td}>{j.nroDoc}</TD>
                                        <TD style={styles.td}></TD>
                                    </TR>
                                )
                            )
                            }
                        </Table>
                    </View>
                </View>
            </Page>
            <Page size="LEGAL" style={styles.page}>
                <View>
                    <View style={styles.sectionTitulo}>
                        <View>
                            <Image style={styles.logo} src={logo} />
                        </View>
                        <View>
                            <Text style={[styles.titulo1, styles.mb]}>Liga amateur de Futbol de Flores</Text>
                            <Texto tamano={10}>{"Informe impreso el dia: " + fechaFormateada()}</Texto>
                        </View>
                        <View>
                            <Image style={styles.logo} src={file} />
                        </View>
                    </View>

                    <View style={styles.centrar}>
                        <Texto tamano={20} negrita={true}>Listado de buena fe</Texto>
                    </View>
                    <View style={styles.centrar}>
                        <Texto tamano={24} negrita={true}>{equipo?.nombre.toUpperCase()}</Texto>
                    </View>
                    <View>
                        <Table>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Nro de Orden: </Texto>
                                    <Text style={{ fontSize: 10 }}>{equipo?.orden}</Text>
                                </TD>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Vestuario: </Texto>
                                </TD>
                            </TR>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Fecha: </Texto>
                                </TD>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Planillero: </Texto>
                                </TD>
                            </TR>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Horario: </Texto>
                                </TD>
                                <TD style={styles.celda}>
                                    <Texto tamano={10} negrita={true}>Dia: </Texto>
                                </TD>
                            </TR>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Arbitro: </Texto>
                                </TD>
                                <TD style={styles.celda}>
                                    <Texto tamano={10} negrita={true}>DNI Arbitro: </Texto>
                                </TD>
                            </TR>
                        </Table>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Table>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Delegado: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDel(delegado1)}</Texto>
                                </TD>
                                <TD style={styles.celda}>
                                    <Texto tamano={10} negrita={true}>DNI: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDelDoc(delegado1)}</Texto>
                                </TD>
                            </TR>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>SubDelegado: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDel(delegado2)}</Texto>
                                </TD>
                                <TD style={styles.celda}>
                                    <Texto tamano={10} negrita={true}>DNI: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDelDoc(delegado2)}</Texto>
                                </TD>
                            </TR>
                            <TR>
                                <TD style={[styles.celda]}>
                                    <Texto tamano={10} negrita={true}>Dt: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDel(dtSelect)}</Texto>
                                </TD>
                                <TD style={styles.celda}>
                                    <Texto tamano={10} negrita={true}>DNI: </Texto>
                                    <Texto tamano={10} negrita={false}>{GetDtDelDoc(dtSelect)}</Texto>
                                </TD>
                            </TR>
                        </Table>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Table weightings={[0.05, 0.05, 0.05, 0.1, 0.6, 0.2, 0.2, 0.2]}>
                            <TH>
                                <TD style={styles.th}><Text>Ex</Text></TD>
                                <TD style={styles.th}>A</TD>
                                <TD style={styles.th}>G</TD>
                                <TD style={styles.th}>Nro</TD>
                                <TD style={styles.th}>Apellido, Nombre</TD>
                                <TD style={styles.th}>Carnet</TD>
                                <TD style={styles.th}>Nro de Doc</TD>
                                <TD style={styles.th}>Firma</TD>
                            </TH>
                            {jugadores.slice(24, 37).map(
                                (j, index) => (
                                    <TR key={index}>
                                        <TD style={styles.td}></TD>
                                        <TD style={styles.td}></TD>
                                        <TD style={styles.td}></TD>
                                        <TD style={styles.td}></TD>
                                        <TD style={styles.td}>{j.apellido}{j.apellido ? "," :""} {j.nombre}</TD>
                                        <TD style={styles.td}>{j.carnet}</TD>
                                        <TD style={styles.td}>{j.nroDoc}</TD>
                                        <TD style={styles.td}></TD>
                                    </TR>
                                )
                            )
                            }

                        </Table>
                    </View>
                </View>
            </Page>
        </Document >
    )
}

export default Listado;