const useDate = () => {

  const today = () : string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const fechaFormateada = () => {
    const hoy = new Date();
    const fechaFormat = hoy.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long", // Formato de mes largo (ej. "agosto")
      day: "numeric", // Incluir el día
    });
    return fechaFormat;
  };

  return { fechaFormateada, today };
};

export default useDate;
