import {GUARDAR_PAGINA} from '../constantes/index'

export function guardarPagina(pageNumber){
    return function (dispatch){
        return dispatch({
            type: GUARDAR_PAGINA,
            payload: pageNumber
        })
    }
}