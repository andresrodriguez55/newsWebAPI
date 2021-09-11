import './News.css';
import React, {useState, useEffect } from 'react';
import Header from '../Header/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import db from '../Database/Database';
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
    const [doesNewsExist, setDoesNewsExist]=useState(true);
    const [newsContent, setNewsContent] = useState();
    const linkKey = useLocation().pathname;
    const linkPrefix="https://andresrodriguez55.github.io/newsWebAPI/#";

    useEffect(async function()
    {
        await db.collection("news").where(firebase.firestore.FieldPath.documentId(),"==", linkKey.substring(1)).get().then(
            (snapshot) => 
            {
                snapshot.forEach( (childSnapshot) =>
                {
                    const data=childSnapshot.data();
                    setNewsContent(
                    {
                        title: data.title,
                        author: data.author,
                        category: data.category,
                        date: (new Date(data.date.seconds*1000)).toLocaleDateString
                        (
                            "en-US", 
                            { 
                                weekday: 'long', year: 'numeric', 
                                month: 'long', day: 'numeric', 
                                hour: "2-digit", minute:"2-digit",
                                hour12:false
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

        if(!newsContent)
            setDoesNewsExist(false);
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
                            <span className="ContentOfArticleFont" dangerouslySetInnerHTML={
                                {
                                    __html: (newsContent.content) ? newsContent.content : ""
                                }}/>
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

    if(!doesNewsExist)
    {
        return(
            <div>
                <Header/>
                <div style={{textAlign: "center"}} >
                    <h3>Error! The link does not exist!</h3>
                </div> 
            </div>
        );
    }
    
    return(
        <div>
            <Header/>
            <div style={{ alignItems: "center", display: "flex", justifyContent: "center",  width: "100%" }}>
                <CircularProgress/>
            </div> 
        </div>
    );  
}