import icon from '../img/cl.png'

export default function formateoPrecio(number) {
   
        return(
            <p className='contIcon'>
            {number} <img className='iconcl' src={icon} width="20px"/> 
            </p>
        )
}
