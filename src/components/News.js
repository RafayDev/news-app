import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';


export class News extends Component {

    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }
    async componentDidMount(){
        this.setState({loading:true})
       let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=28e7fc2b1efe4e93a791e4ab412c1af9";
        let data=await fetch(url,{method:"GET"});
        let parsedData=await data.json();
       // console.log(parsedData);
        this.setState({articles:parsedData.articles,loading:false})
        
       // console.log("hello its mee");
    }
    handleBack=async()=>{
        this.setState({loading:true})
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=28e7fc2b1efe4e93a791e4ab412c1af9&page=${this.state.page-1}`;
        let data=await fetch(url,{method:"GET"});
        let parsedData=await data.json();
        this.setState({articles:parsedData.articles,loading:false,page:this.state.page-1});
    }
   handleNext= async ()=>{
    this.setState({loading:true})
        //this.setState({page:this.state.page+1})
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=28e7fc2b1efe4e93a791e4ab412c1af9&page=${this.state.page+1}`;
        let data=await fetch(url,{method:"GET"});
        let parsedData=await data.json();
        this.setState({articles:parsedData.articles,loading:false,page:this.state.page+1});
    }
  render() {
    return (
      <div className="container my-3">
        <h2>Top Headline RafayDev News</h2>
                {this.state.loading&&<Spinner/>}
        <div className="row">
        {this.state.articles?.map((element)=>{
            return <div className='col-md-4 my-3' key={element.url}>
            <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}   
        </div>
        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type="button" class="btn btn-primary" onClick={this.handleBack}>Previous</button>
            <button type="button" class="btn btn-success" onClick={this.handleNext}>Next</button>
        </div>
      </div>
    )
  }
}

export default News
