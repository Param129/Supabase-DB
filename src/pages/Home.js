import supabase from "../config/supabaseClient";
import {useState,useEffect} from 'react';


import DataCard from "../component/DataCard";

const Home = () =>{

    const [fetchError, setfetchError] = useState(null);
    const [data, setData] = useState(null); // state to fetch data
    const [orderBy, setOrderBy] = useState('created_at')

    // update state immediatly as we delete 
    const handledelete = async(id)=>{
        setData(prevdata => {
            return prevdata.filter(d => d.id !== id); // return new array with remove id that we pass 
        });
    }

    useEffect(()=>{

        // cretaing an async function to fetch data
        const fetchdata = async()=>{
            const {data,error} = await supabase.from('food').select().order(orderBy, {ascending: true}); // fetching all data from supabase  (tablename=food)
            
            if(error){
                setfetchError('error in fetching data from supabase');
                setData(null);
                console.log(error);
            }

            if(data){
                setData(data);
                setfetchError(null);
            }
        }

        fetchdata();

    },[orderBy])

    return (
        <div className="page home">
            {fetchError && (<p>{fetchError}</p>)}

            {/* if data is there please show data */}
            {data && (
                <div className="smoothies">

                    <div className="order-by">
                        <p>Order by:</p>
                        <button onClick={() => setOrderBy('created_at')}>Time Created</button>
                        <button onClick={() => setOrderBy('title')}>Title</button>
                        <button onClick={() => setOrderBy('rating')}>Rating</button>
                    </div>

                    <div className="smoothie-grid">
                        {data.map(d => (
                            <DataCard key={d.id} data={d} onDelete={handledelete} />
                        ))}
                    </div>

                </div>
            )}
        </div>
    )
}

export default Home;