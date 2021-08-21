import './News.css';
import React, {useState, useEffect } from 'react';
import Header from './Header/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import db from './Database/Database';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase';
import {
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
  } from "react-share";

export default function News()
{   
    const [newsContent, setNewsContent] = useState();
    const linkKey = useLocation().pathname;
    const linkPrefix="https://andresrodriguez55.github.io/newsWebAPI/#";

    useEffect(()=>{
        try
        {
            console.log(linkKey);
            db.collection("news").where(firebase.firestore.FieldPath.documentId(),"==", linkKey.substring(1)).get().then(
                (snapshot) => {
                    snapshot.forEach( (childSnapshot) =>{
                        const data=childSnapshot.data();
                        setNewsContent({
                            title: data.title,
                            author: data.author,
                            category: data.category,
                            date: (new Date(data.date.seconds*1000)).toLocaleDateString(
                                    "en-US", { weekday: 'long', year: 'numeric', 
                                                month: 'long', day: 'numeric', 
                                                hour: "2-digit", minute:"2-digit"
                                            }
                                ),
                            content: data.content,
                            description: data.description,
                            imgUrl: data.imgUrl,
                        });
                        return;
                    })
                }
            );
        }

        catch(e){;}

    }, []);

    if(newsContent)
    {
        return(<div><Header/>
            <div className="ArticleArea">
                <div className="Article">
                    <img alt={newsContent.title}
                        src= {newsContent.imgUrl ? 
                            newsContent.imgUrl : 
                            "https://s.france24.com/media/display/d1676b6c-0770-11e9-8595-005056a964fe/w:1280/p:16x9/news_1920x1080.png"}
                        className="ImageOfArticle"/>

                    <div className="TextOfArticleArea">
                        <div className="TitleOfArticleArea">
                            <span className="TitleOfArticleFont">{newsContent.title}<br/></span>
                        </div>
                        <div className="AuthorOfArticleArea">
                            <span className="AuthorOfArticleFont">
                                By {newsContent.author ? newsContent.author : "unknow"}, 
                                published at {newsContent.date ? newsContent.date : "unknow date"}       
                            </span>
                        </div>
                        <div className="ContentOfArticleArea">
                            <span className="ContentOfArticleFont">{newsContent.content}<br/></span>
                        </div>   
                    </div>
                    
                    <ul className="ShareButtonsList">
                        <li className="ShareElement">
                            <WhatsappShareButton url={linkPrefix+linkKey} 
                                title={"News of News! website: "+'\''+newsContent.title+'\''}>
                                <WhatsappIcon size={30}/>
                            </WhatsappShareButton>
                        </li>
                        <li className="ShareElement">
                            <TwitterShareButton url={linkPrefix+linkKey} 
                                title={"News of News! website: "+'\''+newsContent.title+'\''}>
                                <TwitterIcon size={30}/>
                            </TwitterShareButton>
                        </li>
                        <li className="ShareElement">
                            <LinkedinShareButton url={linkPrefix+linkKey} 
                                title={"News of News! website: "+'\''+newsContent.title+'\''}>
                                <LinkedinIcon size={30}/>
                            </LinkedinShareButton>
                        </li>
                        <li className="ShareElement">
                            <FacebookShareButton url={linkPrefix+linkKey} 
                                quote={"News of News! website: "+'\''+newsContent.title+'\''}>
                                <FacebookIcon size={30}/>
                            </FacebookShareButton> 
                        </li>
                    </ul>

                </div>
            </div> 
        </div>)  
    }
    
    return(<div><Header/>
        <div className="Loading">
            <CircularProgress/>
        </div> 
    </div>)  
}