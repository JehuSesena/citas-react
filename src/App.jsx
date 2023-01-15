import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"
import Form from "./components/Form"
import { useState, useEffect} from 'react' 
function App() {
  //Aqui se definen los props que se pasan al form
  const INITIAL = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  const [ pacientes, setPacientes ] = useState(INITIAL);
  const [ paciente, setPaciente] = useState({});


  useEffect(()=>{
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  },[pacientes])

  const eliminarPaciente = (id) => {
    //retorno los pacientes que no coincidan con el id
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados);
  }
  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-12 md:flex">
        <Form
          // props que se pasan al form
          pacientes = { pacientes }
          setPacientes = { setPacientes }
          paciente = { paciente }
          setPaciente = { setPaciente }
          />
        <ListadoPacientes
          pacientes = { pacientes }
          setPaciente = { setPaciente }
          eliminarPaciente = { eliminarPaciente }
        />
      </div>
    </div>
  )
}

export default App
