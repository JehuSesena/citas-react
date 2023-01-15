import { useState, useEffect } from "react"
import Error from "./Error";
function Form({ pacientes, setPacientes, paciente, setPaciente}) {
  // states del form
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  //states de validacion
  const [error, setError] = useState(false);

  useEffect( () => {
    if( Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const rand = Math.random().toString(36).substring(2)
    const date = Date.now().toString(36)
    return rand + date
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //validacion del form
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true);
      return;
    }

    setError(false);

    //Se crea el objeto que guarda la informacion de pacientes
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
    };

    if (paciente.id) {
      //Se esta editando el registro
      //se asigna el mismo id
      objetoPaciente.id = paciente.id;
      //se busca entre los pacientes el reggistro que contenga el mismo ID,
      //cuando se encuentre, sus datos se reemplazan, sino tiene el mismo ID,
      //la informacion se queda tal cual
      const pacientesActualizados = pacientes.map( pacienteState => 
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      )
      //se cambia por el nuevo array de pacientes
      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      //se esta agregando un nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    //Se reinician los valores del form
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  } 
  return (
    <div className="md:w-1/2 lg:w-2/5 mb-10">
      <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">Añade pacientes y <span className="text-indigo-600 font-bold">adminístralos</span></p>
      <form className="bg-white shadow-md rounded-md py-10 px-5 mx-5" onSubmit={ handleSubmit }>

        { error && <Error> <p>Todos los campos son obligatorios</p> </Error>}

        <div className="mb-5">
          <label htmlFor = "mascota"className="block text-gray-700 uppercase font-bold">Nombre mascota</label>
          <input id = "mascota" type="text" placeholder="Nombre de la mascota"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={ nombre } onChange={(e) => setNombre(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor = "propietario"className="block text-gray-700 uppercase font-bold">Nombre del propietario</label>
          <input id = "propietario" type="text" placeholder="Nombre del propietario"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={ propietario } onChange={(e) => setPropietario(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email </label>
          <input type="email" id="email" placeholder="Email de contacto" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ email } onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor = "alta"className="block text-gray-700 uppercase font-bold">alta</label>
          <input id = "alta" type="date"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={ fecha } onChange={(e) => setFecha(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor = "sintomas"className="block text-gray-700 uppercase font-bold">sintomas</label>
          <textarea id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={ sintomas } onChange={(e) => setSintomas(e.target.value)}
          placeholder="Describe los sintomas"></textarea>
        </div>
        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
          value= {paciente.id ? 'Editar paciente' : 'Agregar paciente'} />
      </form>
    </div>
  )
}

export default Form