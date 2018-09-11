import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"csj",
      isGoing: true,
      favorSite: "tb",
      username:"",
      lastGistUrl:""

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const _this = this;
    axios.get("https://api.github.com/users/octocat/gists")
    .then(function(res)
    {
       console.log(res);
       var lastGist = res.data[0];
       _this.setState({
         username: lastGist.owner.login,
         lastGistUrl: lastGist.html_url
       });
    })
    .catch(function(error){
      alert('get失败')
      console.log(error);
  });
    
  }
 
  componentWillUnmount() {
    //this.serverRequest.abort();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log("name:"+name)
    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    alert('Name:' + this.state.name +'Is Going:' + this.state.isGoing + 'Your favorite flavor is: ' + this.state.favorSite);
    event.preventDefault();
  }

  

  render() {
    return (
    
      <form onSubmit={this.handleSubmit}>
      <h3>{this.state.lastGistUrl}</h3>
      <label>
          姓名:
          <input
            name="name"
            type="input"
            value={this.state.name}
            onChange={this.handleInputChange} />
        </label>
        <label>
          是否离开:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        
        <label>
          选择您最喜欢的网站
          <select
            name="favorSite"
            value={this.state.favorSite} onChange={this.handleInputChange}>
            <option value="gg">Google</option>
            <option value="rn">Runoob</option>
            <option value="tb">Taobao</option>
            <option value="fb">Facebook</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

export default App;
