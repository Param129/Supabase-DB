import supabase from "../config/supabaseClient";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'



const Create = () =>{

    const navigate = useNavigate();

    const [title,setTitle] = useState('');
    const [method,setMethod] = useState('');
    const [rating,setrating] = useState('');
    const [formError,setFormError] = useState(null);



    const handlesubmit = async(e)=>{
        e.preventDefault();

        if(!title || !rating || !method){
            setFormError('Please fill in all fields');
        }

        // insert in supabase db
        const { data, error } = await supabase.from('food').insert([{ title, method, rating }]).select();

        if(error){
            console.log(error)
            setFormError('Please fill in all the fields correctly.')
        }

        if (data) {
            console.log(data)
            setFormError(null)
            navigate('/')
        }
    }



    return (
        <div className="page create">
            <form onSubmit={handlesubmit}>

                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />


                <label htmlFor="method">Method:</label>
                <input 
                    type="text" 
                    id="method"
                    value={method}
                    onChange={(e)=>setMethod(e.target.value)}
                />


                <label htmlFor="rating">Rating:</label>
                <input 
                    type="number" 
                    id="rating"
                    value={rating}
                    onChange={(e)=>setrating(e.target.value)}
                />


                <button>Submit data</button>

                {formError && <p className="error">{formError}</p>}

            </form>
        </div>
    )
}

export default Create;