import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cards = ()=>{

    const [cards,setCards]=useState([]);
    const [loading,setLoading]=useState(false);

    const fetchData=async ()=>{
        setLoading(true);
        const res=await axios.get("http://localhost:3001/movies");
        setCards(res.data);
        setLoading(false);
    } 

    useEffect( ()=>{
        fetchData();       
    },[])


    return(
        <div className='flex mx-auto'>
            {loading && <p>Loading..</p>}

            {!loading && cards.map((item)=>{
                return(
                    <MovieCard ele={item} key={item._id}/>
                )
            }
            )}
        </div>
    );
};


const MovieCard=(props)=>{

    const navigate=useNavigate();
   
    const handleMovieClick=(movieId)=>{
        navigate(`/movies/${movieId}`);
    }

    return(
        <div className="card card-side bg-base-100 shadow-xl p-2">
                <figure>
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{props.ele.title}</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={()=>handleMovieClick(props.ele._id)} >Book Tickets</button>
                    </div>
                </div>
        </div>
    )
}


export default Cards;