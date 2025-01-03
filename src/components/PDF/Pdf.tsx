import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import "./Pdf.css"

const styles = StyleSheet.create(
    {
        page: {
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            
            textAlign: 'center'
        }

    });

const Pdf = () => {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>

            </Page>
        </Document>
    )
}

export default Pdf;