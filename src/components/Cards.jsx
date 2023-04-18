import React, { useCallback, useEffect, useState } from 'react';
import Card from './Card';
import './container.css'
import Loading from './Loading';

const Cards = () => {
 
    const [images, setimages] = useState([]);
    const [input, setinput] = useState('');
    const [loading, setloading] = useState(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const peticion = useCallback(async()=>{

        const key = 'client_id=kgri863M5nIN73QFi2Si-6lA8wb-GPaax6QJIE3ghNo';

        let route = `https://api.unsplash.com/photos/?${key}`

        if (input !== '') {
            route = `https://api.unsplash.com/search/photos/?query=${input}&${key}`
        }

        setloading(true)

        const res = await fetch(route)
        const respuesta = await res.json()

        if (respuesta.results) {
            setimages(respuesta.results)
        }else{
            setimages(respuesta)
        }
        setloading(false)

        
        
    },[input])

    

    
    useEffect(() => {
        peticion()
    }, [input,peticion]);

    


    const handleSubmit = (e) => {
        e.preventDefault();
        const text = e.target[0].value;
        
        setinput(text);
    }


    return (
        <>
            <form onSubmit={handleSubmit} className='form-container-j10'>
                <label>
                <input className='w-100' type={'text'} name='input text' placeholder='Busca fotos gratuitas' autoComplete='off'/>
                <button type='submit'>
                <span class="material-symbols-outlined ">search
                </span>
                </button>

                </label>
                
            </form>

            <hr style={{color:'transparent'}}/>
            
            {loading && <Loading /> }
            

            <div className='row border'>

            {
                images.map((img)=>{
                    return  <div className='col'>
                                <Card key={img.id} img={img.urls.regular}/>
                            </div>
                })

                
            }
            </div>

            <hr style={{color:'transparent'}}/>

            <div className='footer-j10 text-center'>
                Jhoni ipia - &copy; {new Date().getFullYear()}
            </div>
 

        </>
    );
}

export default Cards;
