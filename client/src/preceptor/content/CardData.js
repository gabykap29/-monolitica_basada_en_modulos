const cardColors = {
    deteccion: "#74b9ff", 
    registro: "#ff7675",  
    monitoreo: "#00d4ff", 
    administracion: "#fdcb6e" 
};

export const CardData = [
    {
        background: cardColors.deteccion,
        cardTitle: "Alumnos",
        cardText: "Sistema para la gestión de los alumnos.",
        to: "/IPF/students/"
    },
    {
        background: cardColors.registro,
        cardTitle: "Asistencias",
        cardText: "Sistema para la gestión de los alumnos.",
        to: "/IPF/preceptor/asistencias"
    },
    {
        background: cardColors.monitoreo,
        cardTitle: "Reportes",
        cardText: "Sistema para la gestión de los Reportes.",
        to: "/IPF/reports"
    },
]