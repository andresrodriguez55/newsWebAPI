import './App.css';
import React, {useState, useEffect } from 'react';
import Header from './Header/Header';
import db from './Database/Database';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Switch, Route, Link, useHistory} from "react-router-dom";
import News from "./News";


export default function App()
{
  const MultipleNews=()=>
  {
    const [listOfNews, setListOfNews] = useState([]);
    const [lastDoc, setLastDoc]=useState();
    const [category, setCategory]=useState("General");
    const [linkOfNews, setLinkOfNews]=useState();
  
    const history=useHistory();
    const redirect = () => {
      history.push(linkOfNews);
    }
  
    const moreNews = () =>{
      const newsList=[];
      try
      {
        db.collection("news").orderBy("date", "desc").startAfter(lastDoc).limit
        (5).get().then( (snapshot) => {
            setLastDoc(snapshot.docs[snapshot.docs.length-1]);
            snapshot.forEach( (childSnapshot) =>{
                const data=childSnapshot.data();
                    newsList.push({
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
                        id: childSnapshot.id
                    });
            })
            setListOfNews((listOfNews)=>[...listOfNews, ...newsList]);    
        });
      }
  
      catch(e)
      {
        ;
      }
    }
  
    useEffect(()=>{
      const newsList=[];
      db.collection("news").orderBy("date", "desc").limit(5).get().then( (snapshot) => {
          setLastDoc(snapshot.docs[snapshot.docs.length-1]);
          snapshot.forEach( (childSnapshot) =>{
              const data=childSnapshot.data();
                  newsList.push({
                      title: data.title,
                      author: data.author,
                      category: data.category,
                      date: (new Date(data.date.seconds*1000)).toLocaleDateString(
                              "en-US", { weekday: 'long', year: 'numeric', 
                                          month: 'long', day: 'numeric', 
                                          hour: "2-digit", minute:"2-digit",
                                          hour12:false
                                      }
                          ),
                      content: data.content,
                      description: data.description,
                      imgUrl: data.imgUrl,
                      id:childSnapshot.id
                  });
              }
          )
          setListOfNews(newsList);    
      });
    }, []);
  
    if(listOfNews.length===0)
    {
        return(<div>
                <Header setCategory={setCategory}/>
                <div className="Loading">
                  <CircularProgress/>
                </div>
              </div>)
    }
  
    return(
      <div>
        <Header setCategory={setCategory}/> 
        <div className="NewsCardArea">{
          listOfNews.filter(function(news){
            if(category==="General" || news.category===category) return true
            }).map(news => {
              return (   
                  <div className="NewsCard">
                      <img alt={news.title}
                          src= {news.imgUrl ? 
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
                              <span className="DescriptionOfNewsFont">{news.description}<br/></span>
                          </div>
                          <Link to={"/"+news.id}>
                          <div className="ReadMoreArea">
                            <span style={{cursor: "pointer"}} className="ReadMore"
                              onClick={ ()=>{setLinkOfNews("/"+news.id); redirect();} }
                              >Read More<br/>
                            </span>
                          </div></Link>  
                      </div>
                  </div>                    
              );
          })   }
          <Button className="moreButton" variant="contained" onClick={moreNews}>More</Button>
        </div>
      </div>
    );
  }

  return(<Switch>
    <Route exact path="/" component={MultipleNews}/>
    <Route path="/:id" ><News/></Route>
  </Switch>);
} 