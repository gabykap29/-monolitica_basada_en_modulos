const cardColors = {
    deteccion: "#74b9ff", 
    registro: "#ff7675",  
    monitoreo: "#00d4ff", 
    administracion: "#fdcb6e",
    preceptores: "#ff5544"
};

export const CardDataAdmin = [
    {
        background: cardColors.deteccion,
        cardTitle: "Alumnos",
        cardText: "Sistema para la gestión de los alumnos.",
        to: "/IPF/students/"
    },
    {
        background: cardColors.preceptores,
        cardTitle: "Preceptores",
        cardText: "Sistema para la gestión de los preceptores.",
        to: "/IPF/preceptores/"
    },
    {
        background: cardColors.registro,
        cardTitle: "Asistencias",
        cardText: "Sistema para la gestión de los alumnos.",
        to: "/IPF/preceptores/asistencias/"
    },
    {
        background: cardColors.monitoreo,
        cardTitle: "Reportes",
        cardText: "Sistema para la gestión de los Reportes.",
        to: "/IPF/reports"
    },
    {
        background: cardColors.administracion,
        cardTitle: "Auditoria",
        cardText: "Sistema para la gestión de las auditorías.",
        to: "/IPF/audits"
    },
]