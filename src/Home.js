import './Home.css';
import Header from './Header/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {Link, useHistory, useLocation} from "react-router-dom";
import db from './Database/Database';

export default function Home()
{
    const [listOfNews, setListOfNews] = useState([]);
    const [lastDoc, setLastDoc]=useState();
    const [category, setCategory]=useState("General");
    const [linkOfNews, setLinkOfNews]=useState();
  
    const history=useHistory();
    const redirect = () => 
    {
      history.push(linkOfNews);
    };

    const clickedCategoryInDrawer=useLocation().state;

    const getNews=()=>
    {
      console.log(clickedCategoryInDrawer);

      const newsList=[];
      let databaseData=db.collection("news");
      
      if(category!="General")
        databaseData=databaseData.where("category", "==", category).orderBy("date", "desc");

      else if(clickedCategoryInDrawer)
        databaseData=databaseData.where("category", "==", clickedCategoryInDrawer).orderBy("date", "desc");

      else 
        databaseData=databaseData.orderBy("date", "desc");

      if(lastDoc)
        databaseData=databaseData.startAfter(lastDoc);

      databaseData.limit(3).get().then( (snapshot) => 
        {
            setLastDoc(snapshot.docs[snapshot.docs.length-1]);
            snapshot.forEach( (childSnapshot) =>
            {
                const data=childSnapshot.data();
                    newsList.push(
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
                          hour12: false
                        }
                      ),
                      content: data.content,
                      description: data.description,
                      imgUrl: data.imgUrl,
                      id: childSnapshot.id
                    });
            })
            setListOfNews((listOfNews)=>[...listOfNews, ...newsList]);    
        });
    };

    useEffect(()=>
    {
      setListOfNews([]);
      getNews();
    }, [category]);

    if(listOfNews.length===0)
    {
        return(
          <div>
            <Header setCategory={setCategory} setLastDoc={setLastDoc}/>
            <div style={{ alignItems: "center", display: "flex", justifyContent: "center",  width: "100%" }}>
              <CircularProgress/>
            </div>
          </div>
        );
    }
    
    return(
      <div>
        <Header setCategory={setCategory} setLastDoc={setLastDoc}/> 
        <div className="NewsCardArea">  
        {
          listOfNews.map(news => 
          {
              return (   
                <div className="NewsCard">
                  <img src= {news.imgUrl ? 
                            news.imgUrl : 
                            "https://s.france24.com/media/display/d1676b6c-0770-11e9-8595-005056a964fe/w:1280/p:16x9/news_1920x1080.png"}
                      className="ImageOfNews"/>
                      
                  <div className="TextOfNewsArea">
                    <div className="TitleOfNewsArea">
                      <span className="TitleOfNewsFont">{news.title}<br/></span>
                    </div>
                    <div className="AuthorOfNewsArea">
                      <span className="AuthorOfNewsFont">
                          By {news.author ? news.author : "unknow"}, 
                          published at {news.date ? news.date : "unknow date"}       
                      </span>
                    </div>
                    <div className="DescriptionOfNewsArea">
                        <span className="DescriptionOfNewsFont">{news.description ? news.description : ""}<br/></span>
                    </div>
                    <Link to={"/"+news.id}>
                      <div className="ReadMoreArea">
                        <span style={{cursor: "pointer"}} className="ReadMore"
                          onClick={ ()=>{setLinkOfNews("/"+news.id); redirect();} }
                          >Read More<br/>
                        </span>
                      </div>
                    </Link>  
                  </div>
                </div>                    
              );
            }) 
          }
          <Button className="moreButton" variant="contained" onClick={getNews}>More</Button>
          </div>
      </div>
    )
}