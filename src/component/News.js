import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'General'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `VistaNews - ${this.props.category}`;

  }

  async componentDidMount() {
    this.props.setProgress(20);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=add7928a48924360a5598e252d3d9e89&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true
    })
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
    })
    this.props.setProgress(100);
  }

  handleNextClick = async () => {
    console.log("next")
    this.props.setProgress(40);
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=add7928a48924360a5598e252d3d9e89&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      // this.setstate({loading: true });
      this.setState({
        loading:true
      })
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        // loading: false
        loading:false
      })
      this.props.setProgress(100);
    }

  }

  handlePrevClick = async () => {
    console.log("prev")
    this.props.setProgress(40);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=add7928a48924360a5598e252d3d9e89&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setstate({ loading: true });
    this.setState({
      loading:true
    })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      // loading: false
      loading:false
    })
    this.props.setProgress(100);
  }


  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center my-4">VistaNews - {this.props.category} Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={!element.title ? "Unknown" : element.title} description={element.description} imageUrl={element.urlToImage ? element.urlToImage : "https://static.vecteezy.com/system/resources/previews/011/643/706/large_2x/business-newspaper-isolated-on-white-background-daily-newspaper-mock-up-concept-photo.jpg"}
                url={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
            </div>

          })}

        </div>
        <div className="container d-flex justify-content-between">

          <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-dark" > &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark" >Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
