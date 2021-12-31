import React from 'react'
import { LoginCorreoApi,LoginTelefonoApi } from '../Apis/ApiUsuarios'
export const AuthContext = React.createContext()

export const  AuthProvider = (props) => {
   
    const dataAuthInicial = {
      
    }
    //const history = useHistory();
    const [usuario, setUsuario] = React.useState(dataAuthInicial)
   
   

    const iniciarSesion = async(Correo, Password) => {
        console.log("entro a inicio con correo "+ Correo + " PASSWORD ES  "+Password)
        try {
       
            const rawResponse = await LoginCorreoApi(
                Correo,Password
              );
          
              const JsonResponse = await rawResponse.json();
              console.log("EL STATUS ES "+JsonResponse.status)
              if (JsonResponse.status == 200) {
                localStorage.setItem('usuario', JSON.stringify(JsonResponse.data))
                setUsuario(JsonResponse.data)
      
                return {error: false, usuario: usuario, status:200,Rol:JsonResponse.data.Rol}
         
              } else if (JsonResponse.status == 400) {
                  console.log("error 404")
                return {error: true, mensaje:  'Error 404', status: 400}
              } else {
                console.log("Otro error")
                return {error: true, mensaje:  'Otro error', status: 500}
              }
           
       
        } catch (error) {
            console.log(error)
            let mensaje = 'error';

            return {error: true, mensaje:  mensaje}
        }
    }

    const iniciarSesionTelefono = async(Telefono, Password) => {
        console.log("entro a inicio con correo "+ Telefono + " PASSWORD ES  "+Password)
        try {
       
            const rawResponse = await LoginTelefonoApi(
                Telefono,Password
              );
          
              const JsonResponse = await rawResponse.json();
              console.log("EL STATUS ES "+JsonResponse.status)
              if (JsonResponse.status == 200) {
                localStorage.setItem('usuario', JSON.stringify(JsonResponse.data))
                setUsuario(JsonResponse.data)
      
                return {error: false, usuario: usuario, status:200,Rol:JsonResponse.data.Rol}
         
              } else if (JsonResponse.status == 400) {
                  console.log("error 404")
                return {error: true, mensaje:  'Error 404', status: 400}
              } else {
                console.log("Otro error")
                return {error: true, mensaje:  'Otro error', status: 500}
              }
           
       
        } catch (error) {
            console.log(error)
            let mensaje = 'error';

            return {error: true, mensaje:  mensaje}
        }
    }


    const cerrarSesion = () => {
       // alert("llamando a cerrar sesion")
        localStorage.removeItem('usuario')
        setUsuario({})
       // return auth.signOut()
    } 

   
    React.useEffect(() => {
        const usuarioLocal = localStorage.getItem('usuario')

        if(usuarioLocal){
            setUsuario(JSON.parse(usuarioLocal))
           
        }

        
    }, [])

    return (
        <AuthContext.Provider value={{usuario,cerrarSesion, iniciarSesion,iniciarSesionTelefono,setUsuario}}>
           { props.children}
        </AuthContext.Provider>
    )
}
