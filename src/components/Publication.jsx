import { FaRegComment, FaEllipsisH, FaRegHeart, FaHeart, FaRegBookmark, FaRegShareSquare, FaCheckCircle } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import "../stylesheets/Publication.css";
import { useState } from "react";

export const Publication = ({ user, description, content, type, like, comments, verify, retweets }) => {

    const [ likes, setLikes ] = useState(like);
    const [ retweet, setRetweets ] = useState(retweets);
    const [ isLiked, setIsLiked ] =  useState(false);
    const [ isRetweeted, setIsRetweeted ] =  useState(false);

    const clickOnLikeButton = ()=>{
        if(isLiked){
            setLikes(prevLikes=> prevLikes - 1);
            setIsLiked(!isLiked);
        } else{
            setLikes(prevLikes=> prevLikes + 1);
            setIsLiked(!isLiked);
        }
    }

    const clickOnRetweetButton = ()=>{
        if(isRetweeted){
            setRetweets(prevRetweets=> prevRetweets - 1);
            setIsRetweeted(!isRetweeted);
        } else{
            setRetweets(prevRetweets=> prevRetweets + 1);
            setIsRetweeted(!isRetweeted);
        }
    }

    return (
        <div className="publication__container">
            <div className="publication-top">
                <div className="publication-top__user-info">
                    <img src={`${user.picture.medium}`} alt={`${user.name.title}`} />
                    <span className="user-info__name"> { user.name.first } { user.name.last } </span>
                    { verify ? <FaCheckCircle className="verify-icon "/> : null}
                    <span className="user-info__account"> @{ user.name.first }{ user.name.last } </span>
                </div>
                <div className="publication-top__more-options-container">
                    <FaEllipsisH className="more-options-icon icon"/>
                </div>
            </div>
            <div className="publication-description">
                <p>
                    { description }
                </p>
            </div>
            <div className="publication-content__container">
                {
                    type === "image" ? <img src={`${content.urls.small}`} alt={`${content.alt_description}`}></img> : type === "video" ? <video src={`${content.link}`} controls ></video> : null
                }
            </div>
            <div className="publication-interactions__container">
                <div className="main-interactions">
                    <div className="publication-interactions__comments">
                            <FaRegComment className="comment-icon icon"/>
                    </div>
                    <div className="publication-interactions__retweet" 
                        onClick={()=> clickOnRetweetButton()}
                    >
                        {
                            isRetweeted ? <FaArrowsRotate className="retweet-icon icon rt-animated"/> :  <FaArrowsRotate className= "retweet-icon icon"/>
                        }
                        
                        <span> { retweet }</span>
                    </div>
                    <div className="publication-interactions__like"
                        onClick={()=> clickOnLikeButton()}
                    >   
                        {
                            isLiked ? <FaHeart  className="animated-like icon"/> : <FaRegHeart className="like-icon icon"/>
                        }
                        <span> { likes }</span>
                    </div>
                    <div className="publication-interactions__like">
                        <FaRegBookmark className="bookmark-icon icon"/>
                    </div>
                </div>
                <div className="publication-interactions__share-container">
                    <FaRegShareSquare className="share-icon icon"/>
                </div>
            </div>
        </div>
    );
};