import React from 'react';
import './index.css';
import List from './list';

class Form extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       input: '',
       filtered: '',
       posts: []
      };

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       this.handleSelect = this.handleSelect.bind(this);
    
  }

  handleSelect = event => {
    this.setState({
      filtered: event.target.value
    });
    console.log('Changed filter')

  } 
  handleChange = event => {
    console.log(`${this.state.input}`);
    this.setState({
      input: event.target.value  
    });
   
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchData();
    console.log('Done fetched');
  };

    fetchData = () => {
    if(this.state.filtered === 'author') {
      fetch(`http://hn.algolia.com/api/v1/search?tags=author_${ this.state.input}&tags=story`)
      .then((res) => res.json())
      .then(json => this.setState({posts: json.hits}))
    } else if(this.state.filtered === 'date') {
      fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${ this.state.input }&tags=story`)
      .then((res) => res.json())
      .then(json => this.setState({posts: json.hits}))
    } else {
      fetch(`http://hn.algolia.com/api/v1/search?query=${this.state.input}&tags=story`)
      .then((res) => res.json())
      .then(json => this.setState({posts: json.hits}))
    }
  };

  render() {
    return (
      <div className='main'>
        <form className='form'>
          <input className='search' placeholder='Enter Keyword' onChange={this.handleChange}></input>

          <select className='filt' value={this.state.value} onChange={this.handleSelect}>
            <option value="empty">-</option>
            <option value="author">Author</option>
            <option value="date">Date</option>
          </select>
          <button onClick={event => this.handleSubmit(event)}>Submit</button>
        </form>
        <div className='listArea'>
          <List posts={this.state.posts}/>
        </div>
   
      </div>
    )
  }





}

export default Form;