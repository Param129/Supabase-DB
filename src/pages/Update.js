import supabase from "../config/supabaseClient";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";


const Update = () =>{

    const {id}=useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')
    const [formError, setFormError] = useState(null);


    const handlesubmit = async(e)=>{
        e.preventDefault();

        if (!title || !method || !rating) {
            setFormError('Please fill in all the fields correctly.')
            return
        }

        const {data,error} = await supabase.from('food').update({title,method,rating}).eq('id',id).select();

        if (error) {
            setFormError('Please fill in all the fields correctly.')
        }

        if (data) {
            setFormError(null)
            navigate('/')
        }
    }


    //useeffect is used to fetch that single record
    useEffect(()=>{

        const fetchdata = async()=>{

            // fetch data using id
            const {data,error} = await supabase.from('food').select().eq('id',id).single();

            if(error){
                navigate('/', { replace: true })
            }

            if (data) {
                setTitle(data.title)
                setMethod(data.method)
                setRating(data.rating)
            }
        }

        fetchdata();

    },[id,navigate]);

    return (
        <div className="page update">
            <form onSubmit={handlesubmit}>

                <label htmlFor="title">Title:</label>
                <input
                    type="text" 
                    id="title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />


                <label htmlFor="method">Method:</label>
                <textarea
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
                    onChange={(e)=>setRating(e.target.value)}
                />

                <button>Update data</button>

                {formError && <p className="error">{formError}</p>}

            </form>
        </div>
    )
}

export default Update;