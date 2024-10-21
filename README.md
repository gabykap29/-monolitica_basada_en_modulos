# Sistema de Asistencia Institucional

## Descripción
Esta es una aplicación diseñada para **tomar asistencia** en una institución educativa. Está pensada para ser instalada en un servidor local dentro de la institución, lo que garantiza que los estudiantes no puedan marcar su asistencia desde ubicaciones externas.

## Usuarios
- **Estudiantes**: Pueden marcar su asistencia y ver su historial de inasistencias.
- **Preceptores**: Pueden gestionar la asistencia, llevar un seguimiento de los alumnos y exportar los registros.
- **Directivos**: Tienen acceso al sistema para supervisar y administrar el estado de asistencia de los estudiantes.

## Características Principales
1. **Control Local de Asistencia**: 
   - La aplicación solo permite a los estudiantes marcar su asistencia desde dentro de la institución, lo que asegura que no se pueda hacer de manera remota.
   - Si los estudiantes no marcan su asistencia dentro del periodo permitido, recibirán un correo electrónico o notificación informándoles sobre su tardanza y solicitando que se comuniquen con los preceptores.

2. **Seguimiento de Inasistencias**:
   - Los **estudiantes** pueden ver sus inasistencias por asignatura y conocer cuántas más faltas pueden tener antes de quedar en estado de "libre".
   - Los **preceptores** pueden llevar un seguimiento de la asistencia de los alumnos y notificarles su estado actual.

3. **Acceso Controlado**:
   - El sistema puede configurarse para permitir el registro de asistencia solo desde la red interna de la institución o a través de la IP pública de la misma, garantizando un control total.

4. **Exportación de Registros**:
   - Los **preceptores** tienen la capacidad de **exportar las tablas de asistencia en formato Excel**, facilitando la gestión y análisis de los datos.

## Tecnologías Utilizadas
- **Backend**: (NodeJS, Express, Mongoose)
- **Base de datos**: (MongoDB)
- **Frontend**: (React, Vite, PWA)

