import { connect } from "../../helpers/db/conexion";

export async function obtenerJugadores() {
  const dbConnection = new connect();
  const db = dbConnection.db;
  
  const jugadores = await db.collection('jugadores').aggregate([
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
  ]).toArray();

  await dbConnection.close();
  return jugadores;
}

export async function agregarJugador(jugador) {
  const dbConnection = new connect();
  const db = dbConnection.db;
  
  const result = await db.collection('jugadores').insertOne(jugador);

  await dbConnection.close();
  return result;
}

export async function editarJugador(id, jugadorActualizado) {
  const dbConnection = new connect();
  const db = dbConnection.db;

  const result = await db.collection('jugadores').updateOne(
    { _id: id },
    { $set: jugadorActualizado }
  );

  await dbConnection.close();
  return result;
}

export async function eliminarJugador(id) {
  const dbConnection = new connect();
  const db = dbConnection.db;

  const result = await db.collection('jugadores').deleteOne({ _id: id });

  await dbConnection.close();
  return result;
}
