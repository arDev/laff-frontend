import { Text, StyleSheet } from "@react-pdf/renderer"

interface TextComponentProps {
    children?: string; // children será de tipo string
    tamano: number
    negrita?: boolean
    mb? :number
    padding? : number
    borderWidth? :number
}

const Texto = ({ children, tamano, negrita, mb, borderWidth, padding }: TextComponentProps) => {


    const styles = StyleSheet.create(
        {
            texto: {

                fontFamily: "Arial"
            }
        });

    return (
        <Text style={[styles.texto, { fontSize: tamano
                        , fontWeight: negrita ? "bold" : "normal"
                        , marginBottom: mb ? mb : 0
                        , borderWidth: borderWidth ? borderWidth : 0
                        , padding : padding ? padding : 0
                 }]}>{children}</Text>
    )
}

export default Texto;