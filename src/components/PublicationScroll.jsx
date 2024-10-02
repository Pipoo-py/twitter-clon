import { useEffect, useState, useRef } from "react";
import { getAllForPublication } from "../AllRequests";
import { Publication } from "./Publication";
import { useStateForPublications } from "./GlobalPublicationsContext";

export const PublicationScroll = ()=>{
    const { publications, setPublications } = useStateForPublications();
    const observerRef = useRef();
    const [ loading, setLoading ] = useState(true);


    const getNewPublication = async()=>{
        setLoading(true);
        let finalPublication = await getAllForPublication();
            setPublications(prevPublications => [...prevPublications, finalPublication]);
        setLoading(false);
    }


    useEffect(()=>{ getNewPublication(); }, []);

    useEffect(()=>{
        const observeItem = ( entries )=>{
            entries.forEach(entry => {
                if(entry.isIntersecting ){
                    getNewPublication();
                    observerRef.current.unobserve(entry.target)
                }
            });
        }

        const lastPublication = document.querySelector(".publications-container .publication__container:last-child");

        if(window.IntersectionObserver){
            observerRef.current = new IntersectionObserver(observeItem);
            if(lastPublication){
                observerRef.current.observe(lastPublication);
            }
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    },[ publications ])

    return(
        <div className="publications-container">
            {
                publications.map((publication,index)=>
                    <Publication 
                        user = { publication.user }
                        content = { publication. content }
                        description= { publication.description }
                        like = { publication.like }
                        comments = { publication.comments }
                        type = { publication.type }
                        verify = { publication.isVerified}
                        retweets={ publication.retweets }
                        key= { index }
                    />
                )
            }
            {
                loading ?  <span> Cargando publicaciones... </span> : null
            }
        </div>
    )
}