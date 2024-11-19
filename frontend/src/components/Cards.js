import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const Cards = ()=>{

    const [cards,setCards]=useState([]);
    const [loading,setLoading]=useState(false);

    const fetchData=async ()=>{
        setLoading(true);
        const res=await axios.get("http://localhost:3001/movies/");
        setCards(res.data);
        setLoading(false);
    } 

    useEffect( ()=>{
        fetchData();       
    },[])


    return(
        <div className='flex flex-wrap justify-evenly'>
            {/*  Loading skeletons */}
            {loading && <Loading />}

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
        <div className="card card-side bg-base-200 shadow-xl m-2 w-1/4">
                <figure>
                    <img
                    src={props.ele.img_url}
                    alt={props.ele.title} />
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