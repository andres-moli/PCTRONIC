import Cookies from 'js-cookie'
// import { produce } from "immer"
import { homeEndpoints } from '../generalApi'
// import { loginSchemaType } from '@/pages/auth/controller/schemas'
import { ToastyErrorGraph } from '../../lib/utils'

/**
 * Login action and set user's data and its token
 * @param data 
 * @returns 
 */
export const login = async(data: any) => {
  try {
    const res = await homeEndpoints.loginUser({
      signinInput: {
        email: data.email,
        password: data.password
      }
    })

    Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_SESSION, res?.signin?.token)
    Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_USER, JSON.stringify(res.signin.user))

    // setter(produce((draft: IGeneral) => {
    //   draft.isLogged = true
    //   draft.userInfo = res.signin.user
    // }))

    return true
  } catch (error) {
    ToastyErrorGraph(error as any)
    return false
  }
}

// /**
//  * Download form 
//  * @param id 
//  * @param companyName 
//  */
// export const downloadForm = async(id: number, companyName: string) => {
  
//   setter(produce((draft: IGeneral) => {
//     draft.isAdvertisign = {
//       isActive: true,
//       advertisignMsg: `Se está descargando el formulario de ${companyName}`,
//       type: "working"
//     }
//   }))

//     await downloadFormById(id).then(() => {
      
//     }).finally(() => {

//       setter(produce((draft: IGeneral) => {
//         draft.isAdvertisign = {
//           isActive: false,
//           advertisignMsg: "¡Listo!",
//           type: "success"
//         }
//       }))

//     })
// }

// export const downloadAnnexe = async(mongoId:string, annexeName: string) => {
//   // downloadAnnexeFromRest
//   setter(produce((draft: IGeneral) => {
//     draft.isAdvertisign = {
//       isActive: true,
//       advertisignMsg: `Se está descargando el formulario de`,
//       type: "success"
//     }
//   }))

//     await downloadAnnexeFromRest(mongoId, annexeName).then(() => {
      
//     }).finally(() => {

//       setter(produce((draft: IGeneral) => {
//         draft.isAdvertisign = {
//           isActive: false,
//           advertisignMsg: "¡Listo!",
//           type: "success"
//         }
//       }))

//     })
// }
