import { ObjectId } from 'mongodb'; // ? Importa el constructor de ObjectId de MongoDB
import { connect } from '../../helpers/db/conexion.js'; // ? Importa la clase de conexión a la base de datos

export class JugadoresRepository extends connect {
  static instance; // ! Instancia única del repositorio

  constructor() {
    if (typeof JugadoresRepository.instance === 'object') {
      return JugadoresRepository.instance; // ! Retorna la instancia existente si ya está creada
    }
    super(); // ? Llama al constructor de la clase base
    this.collection = this.db.collection('jugador'); // ? Inicializa la colección de jugadores en la base de datos
    JugadoresRepository.instance = this; // ! Guarda la instancia actual para futuras referencias
    return this; // ! Retorna la instancia del repositorio
  }

  //* Verifica permisos del usuario
  hasPermission(permission) { 
    return this.permissions.includes(permission); // ? Retorna el permiso
  }

  //* Obtiene todos los jugadores
  async getAllJugadores() {
    if (!this.hasPermission('view')) {
      throw new Error('No tienes permiso para ver los jugadores.'); // ! Lanza un error si el usuario usado no tiene ese permiso
    }
    try {
      const res = await this.collection.find({}).toArray(); // ? Obtiene todos los documentos de la colección
      return res; // ? Retorna el resultado
    } catch (error) {
      console.error("Error obteniendo jugadores: ", error); // ! Manejo de errores
      throw new Error("Error obteniendo jugadores"); // ! Lanza un error si ocurre un problema
    }
  }

  //* Agrega un nuevo jugador
  async addJugador(jugador) {
    if (!this.hasPermission('add')) {
      throw new Error('No tienes permiso para agregar jugadores.'); // ! Lanza un error si el usuario usado no tiene ese permiso
    }
    try {
      const res = await this.collection.insertOne(jugador); // ? Inserta un nuevo documento en la colección
      return res; // ? Retorna el resultado de la inserción
    } catch (error) {
      console.error("Error agregando jugador: ", error); // ! Manejo de errores
      throw new Error("Error agregando jugador"); // ! Lanza un error si ocurre un problema
    }
  }

  //* Actualiza la información de un jugador
  async updateJugador(id, jugadorActualizado) {
    if (!this.hasPermission('update')) {
      throw new Error('No tienes permiso para actualizar jugadores.'); // ! Lanza un error si el usuario usado no tiene ese permiso
    }
    try {
      const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null; // ? Valida y convierte el ID a ObjectId
      if (!objectId) {
        throw new Error('Invalid ObjectId format'); // ! Lanza un error si el formato del ID no es válido
      }
      const res = await this.collection.updateOne(
        { _id: objectId }, // ? Filtro para encontrar el jugador por ID
        { $set: jugadorActualizado } // ? Actualiza los campos del jugador
      );
      return res; // ? Retorna el resultado de la actualización
    } catch (error) {
      console.error("Error actualizando jugador: ", error); // ! Manejo de errores
      throw new Error("Error actualizando jugador"); // ! Lanza un error si ocurre un problema
    }
  }

  //* Elimina un jugador por su ID
  async deleteJugador(id) {
    if (!this.hasPermission('delete')) {
      throw new Error('No tienes permiso para eliminar jugadores.'); // ! Lanza un error si el usuario usado no tiene ese permiso
    }
    try {
      const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null; // ? Valida y convierte el ID a ObjectId
      if (!objectId) {
        throw new Error('Invalid ObjectId format'); // ! Lanza un error si el formato del ID no es válido
      }
      const res = await this.collection.deleteOne({ _id: objectId }); // ? Elimina el documento con el ID especificado
      return res; // ? Retorna el resultado de la eliminación
    } catch (error) {
      console.error("Error eliminando jugador: ", error); // ! Manejo de errores
      throw new Error("Error eliminando jugador"); // ! Lanza un error si ocurre un problema
    }
  }
}
