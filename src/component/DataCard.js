import React from 'react'
import { Link } from 'react-router-dom';
import supabase from '../config/supabaseClient';

const DataCard = ({data,onDelete}) => {

  const handleDelete = async()=>{
    const {res,error} = await supabase.from('food').delete().eq('id',data.id);

    if (error) {
      console.log(error)
    }


    if (res) {
      console.log(res)
      onDelete(data.id)
    }
  }

  return (
    <div className='smoothie-card'>
        <h3>{data.title}</h3>
        <p>{data.method}</p>
        <div className='rating'>{data.rating}</div>

        <div className='buttons'>
            <Link to={"/" + data.id}>
                <i className='material-icons'>edit</i>
            </Link>
            <i className='material-icons' onClick={handleDelete}>delete</i>
        </div>
    </div>
  )
}


export default DataCard;