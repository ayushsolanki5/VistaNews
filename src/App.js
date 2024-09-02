import './App.css';
import React, { Component } from 'react'
import Navbar from './component/navbar';
import News from './component/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {

  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="General" pageSize={9} country="in" category="General" />} />
            <Route exact path="/Business" element={<News setProgress={this.setProgress} key="Business" pageSize={9} country="in" category="Business" />} />
            <Route exact path="/Entertainment" element={<News setProgress={this.setProgress} key="Entertainment" pageSize={9} country="in" category="Entertainment" />} />
            <Route exact path="/Health" element={<News setProgress={this.setProgress} key="Health" pageSize={9} country="in" category="Health" />} />
            <Route exact path="/Science" element={<News setProgress={this.setProgress} key="Sciences" pageSize={9} country="in" category="Science" />} />
            <Route exact path="/Sports" element={<News setProgress={this.setProgress} key="Sports" pageSize={9} country="in" category="Sports" />} />
            <Route exact path="/Technology" element={<News setProgress={this.setProgress} key="Technology" pageSize={9} country="in" category="Technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
