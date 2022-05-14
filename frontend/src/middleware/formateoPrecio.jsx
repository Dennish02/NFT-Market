import icon from '../img/cl.png'

export default function formateoPrecio(number) {
   
        return(
            <div className='contIcon'>
            {number} <img className='iconcl' src={icon} width="20px"/> 
            </div>
        )
}
