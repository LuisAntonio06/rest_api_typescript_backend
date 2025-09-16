import server from "./server";
import colors from "colors";

/* Definir puerto de la app */
const port = process.env.PORT || 4000
server.listen(port , () => {
    console.log(colors.blue.bold(`REST API EN EL PUERTO: ${port}`));
})


