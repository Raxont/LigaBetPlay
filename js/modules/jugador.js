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

  //* Obtiene todos los jugadores
  async getAllJugadores() {
    try {
      const res = await this.collection.find({}, {}).toArray(); // ? Obtiene todos los documentos de la colección
      return res; // ? Retorna el resultado
    } catch (error) {
      console.error("Error obteniendo jugadores: ", error); // ! Manejo de errores
      throw new Error("Error obteniendo jugadores"); // ! Lanza un error si ocurre un problema
    }
  }

  //* Obtiene un jugador por su ID
  async getJugadorById(id) {
    try {
      const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null; // ? Valida y convierte el ID a ObjectId
      if (!objectId) {
        throw new Error('Invalid ObjectId format'); // ! Lanza un error si el formato del ID no es válido
      }
      const res = await this.collection.aggregate([
        { $match: { _id: objectId } }, // ? Filtra el jugador por ID
        {
          $lookup: {
            from: 'equipos',
            localField: 'equipo',
            foreignField: '_id',
            as: 'equipo'
          }
        },
        {
          $lookup: {
            from: 'lesiones',
            localField: 'lesiones',
            foreignField: '_id',
            as: 'lesiones'
          }
        },
        {
          $lookup: {
            from: 'rendimientos',
            localField: 'rendimientos',
            foreignField: '_id',
            as: 'rendimientos'
          }
        },
        {
          $lookup: {
            from: 'goles',
            localField: 'gol',
            foreignField: '_id',
            as: 'gol'
          }
        },
        {
          $lookup: {
            from: 'tarjetas',
            localField: 'tarjetas',
            foreignField: '_id',
            as: 'tarjetas'
          }
        }
      ]).toArray(); // ? Ejecuta la agregación y convierte el resultado a un array
      return res.length > 0 ? res[0] : null; // ? Retorna el primer resultado si existe
    } catch (error) {
      console.error("Error obteniendo jugador por ID: ", error); // ! Manejo de errores
      throw new Error("Error obteniendo jugador por ID"); // ! Lanza un error si ocurre un problema
    }
  }

  //* Agrega un nuevo jugador
  async addJugador(jugador) {
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
