import { FaRegImage, FaRegUserCircle } from "react-icons/fa";
import "../stylesheets/NewPage.css";
import { useState } from "react";
import { useStateForPublications } from "./GlobalPublicationsContext";

export const NewPost = ()=>{
    const [ media, setMedia ] = useState("");
    const [ preview, setPreview ] = useState("");
    const [ loadingMedia, setLoadingMedia ] = useState(); 
    const { publications, setPublications } = useStateForPublications();

    const verifyTypeOfPublication = ()=>{
        let type;
        if(!media){ 
            type = "text";
        }
        else if(media.type.startsWith("image/")) type = "image";
        else if(media.type.startsWith("video/")) type = "video";
        return type;
    }

    const publishPost = (e)=>{
        e.preventDefault();
        let type = verifyTypeOfPublication();
        let finalPublication  = {
            user: {
                picture: {
                    medium: "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                },
                name: {
                    title: "Alejandro Salazar",
                    first: "Alejandro",
                    last: "Salazar"
                },

            },
            content: {
                urls:{
                    small: preview
                },
                link: preview,
                alt__description: "Publicación del usuario"
            },
            description: e.target.children[0].value,
            like: 0,
            comments: null,
            type,
            isVerified: false,
            retweets: 0
        }
        setPublications(prevPublications => [ finalPublication, ...prevPublications ]);
        setMedia("");
        setPreview("");
    }

    const dropMediaInInput = (e)=>{
        const file = e.target.files[0];
        setLoadingMedia(true);
        if(file){
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setMedia(file);
                setPreview(reader.result);
                setLoadingMedia(false);
            }
            reader.readAsDataURL(file);
        }     
    }

    const dropMediaCompleteContainer = (e)=>{
        e.preventDefault();
        setLoadingMedia(true);
        const file = e.dataTransfer.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setMedia(file);
                setPreview(reader.result);
                setLoadingMedia(false);
            }
            reader.readAsDataURL(file);
        }     
    }

    return(
        <>
        <div className="new-post__container"
        onDrop={(e)=> dropMediaCompleteContainer(e)}
        onDragOver={(e)=> e.preventDefault()}
        >
            <div className="new-post__user-img-container">
                <FaRegUserCircle className="user-icon"/>
            </div>
            <form action="" className="form" onSubmit={(e)=> publishPost(e)}>
                <textarea name="post" id="postTextArea" placeholder="¿Qué está pasando?" defaultValue=""></textarea>
                <input type="file" accept="image/*, video/*" placeholder="Arrastre archivos aquí o haga el click en el icono" id="inputFile"
                style={{display: "none"}}
                onChange={(e)=> dropMediaInInput(e)}
                />
                <div className="form-icons__container">
                        <input type="submit" value="Publicar" id="postSubmit"/>
                        <label htmlFor="inputFile">
                            <FaRegImage className="img-icon"/>
                        </label>
                </div>
            </form>
            { 
                preview && (
                    loadingMedia ? <span>Cargando multimedia...</span> :  media  && media.type.startsWith("video/") ? (
                        <video src={preview} controls muted autoplay
                        style={{ width: "clamp(150px, 50dvw, 400px)", margin: "12px auto", borderRadius: "8px" }} 
                        ></video>
                    )  :  <img src={preview} alt="publicacion del usuario" srcSet="" 
                    style={{ width: "clamp(150px, 50dvw, 400px)", margin: "12px auto", borderRadius: "8px" }} 
                    /> 
                )
            }
        </div>
        </>
    )
}