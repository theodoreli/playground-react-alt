//echo '[id: "{{unixtime}}" , data: [avatar: "{{avatar}}", firstName: "{{name.first}}", lastName: "{{name.last}}", username: "{{username}}"]],' | phony --max 100 > response.json

var React = window.React = require('react')
var Timer = require("./ui/Timer")
var Ajax = require('react-ajax')

var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };

    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      initialItems: ['Theo\'s Meatballs', 'Teddy Supreme'], 
      items: [],
      text: ''
    };
  },
  handleChange: function(e) {
    this.setState({text: e.target.value});// calling this triggers UI update
  },
  handleSubmit: function(e) {
    console.log(e)
    e.preventDefault();

    var nextItems = this.state.items.concat([this.state.text]);
    this.setState({items: nextItems, text: ''}); //calling this triggers UI update
  },
  filterList: function(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  },
  componentWillMount: function() {
    this.setState({items: this.state.initialItems})
  },
  handleResponse: function(a,b,c) {
    console.log(a)
    console.log(b)
    console.log(c)
  },
  render: function() {
    return (
      <div>
        <h3>Buddy</h3>
        <input type="text" placeholder="Search" onChange={this.filterList}/>

        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} placeholder='Add An Item'/>
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        <Timer />
      </div>
    );
  }
});

/*
var fetch = new Promise(function(resolve, reject) {
  get('response.json', function(err, res) {
    if (err) reject(err);

    console.log(res);
    resolve(res);
  });
});
*/

React.render(<App />, document.getElementById("app"));
