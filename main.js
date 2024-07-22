import { JugadoresRepository } from "./js/modules/jugador.js"; // ? Importa el repositorio de jugadores
import { ObjectId } from "mongodb"; // ? Importa el constructor de ObjectId de MongoDB

//* Función principal que ejecuta diferentes acciones basadas en el parámetro 'action'
async function main(action) {
  try {
    const jugadoresRepo = new JugadoresRepository(); //* Crea una instancia del repositorio de jugadores

    if (action === "getAll") { //* Si la acción es 'getAll', obtiene todos los jugadores
      const jugadores = await jugadoresRepo.getAllJugadores();
      console.log("Jugadores:", jugadores);

    } else if (action === "add") { //* Si la acción es 'add', agrega un nuevo jugador
      const nuevoJugador = { //* Coloca los datos deseados para crear el nuevo jugador
        id: "789012",
        nombre: "Cristiano Ronaldo",
        edad: 36,
        posicion: "Delantero",
        nacionalidad: "Portugal",
        numeroCamiseta: 7,
        equipo: new ObjectId("60d5f6c2d6f2b3424c1a1e99"),
        lesiones: [],
        rendimientos: [],
        tarjetas: [],
      };

      const resultadoAgregar = await agregarJugador(
        jugadoresRepo,
        nuevoJugador
      );
      console.log("Jugador agregado:", resultadoAgregar);

    } else if (action === "update") { //* Si la acción es 'update', actualiza la información de un jugador
      const idJugador = "66a01fa8cec18f9345caaeeb"; // ! Reemplaza con el ID del jugador que deseas actualizar
      const jugadorActualizado = {
        nombre: "Juan Pérez Actualizado",
        edad: 26,
      };
      const resultadoActualizar = await actualizarJugador(
        jugadoresRepo,
        idJugador,
        jugadorActualizado
      );
      console.log("Jugador actualizado:", resultadoActualizar);

    } else if (action === "delete") { //* Si la acción es 'delete', elimina un jugador
      const idJugador = "66a01cca99c40907606321fe"; // ! Reemplaza con el ID del jugador que deseas eliminar
      const resultadoEliminar = await eliminarJugador(jugadoresRepo, idJugador);
      console.log("Jugador eliminado:", resultadoEliminar);

    } else {
      console.log(
        "Acción no válida. Usa 'getAll', 'add', 'update' o 'delete'." //! Esta acción no es válida
      );
    }
  } catch (error) {
    console.error("Error:", error); // ! Manejo de errores
  }
}

//* Función para agregar un jugador
async function agregarJugador(jugadoresRepo, jugador) {
  try {
    const resultado = await jugadoresRepo.addJugador(jugador);
    return resultado;
  } catch (error) {
    console.error("Error agregando jugador:", error); // ! Manejo de errores al agregar un jugador
  }
}

//* Función para actualizar un jugador
async function actualizarJugador(jugadoresRepo, id, jugadorActualizado) {
  try {
    const resultado = await jugadoresRepo.updateJugador(id, jugadorActualizado);
    return resultado;
  } catch (error) {
    console.error("Error actualizando jugador:", error); // ! Manejo de errores al actualizar un jugador
  }
}
//* Función para eliminar un jugador
async function eliminarJugador(jugadoresRepo, id) {
  try {
    const resultado = await jugadoresRepo.deleteJugador(id);
    return resultado;
  } catch (error) {
    console.error("Error eliminando jugador:", error); // ! Manejo de errores al eliminar un jugador
  }
}

const action = "getAll"; //* Acción por defecto
main(action); // * Ejecuta la función principal con la acción definida
/**
 * @returns Jugadores: [
            {
            _id: new ObjectId('669ed147f9b63eee6a4cff8c'),
            id: '123456',
            nombre: 'Lionel Messi',
            edad: 35,
            posicion: 'Delantero',
            nacionalidad: 'Argentina',
            numeroCamiseta: 10,
            equipo: new ObjectId('669ed4e7cb9973c272a301ce'),
            lesiones: [
                new ObjectId('60d5f6c2d6f2b3424c1a1e88'),
                new ObjectId('60d5f6c2d6f2b3424c1a1e89')
            ],
            rendimientos: [
                new ObjectId('60d5f6c2d6f2b3424c1a1e77'),
                new ObjectId('60d5f6c2d6f2b3424c1a1e78')
            ],
            gol: [
                new ObjectId('60d5f6c2d6f2b3424c1a1e66'),
                new ObjectId('60d5f6c2d6f2b3424c1a1e67')
            ],
            tarjetas: [
                new ObjectId('60d5f6c2d6f2b3424c1a1e55'),
                new ObjectId('60d5f6c2d6f2b3424c1a1e56')
            ]
            }
            ]
 */