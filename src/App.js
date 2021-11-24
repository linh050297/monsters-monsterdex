import React, { Component } from "react";
// import logo from "./logo.svg";
import { CardList } from "./components/card-list/card-list.component";
import "./App.css";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monstersArray: [],
      searchString: "",
    };

    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ monstersArray: res });
      });
  }

  // arrow function tự động bind this thành context của component ( nơi function handleChange được khởi tạo )
  handleChange = (e) => {
    this.setState({ searchString: e.target.value });
  };

  render() {
    const { monstersArray, searchString } = this.state;
    const filteredMonster = monstersArray.filter((item) =>
      item.name.toLowerCase().includes(searchString.toLowerCase())
    );

    return (
      <div>
        <div className="App">
          <h1>Monster Monsterdex</h1>
          <SearchBox
            placeholder="Please type to search !!!"
            handleChange={this.handleChange}
          />
          <CardList monsters={filteredMonster}></CardList>
        </div>
        <button onClick={() => this.setState({ monstersArray: [] })}>
          Clear
        </button>
      </div>
    );
  }
}

export default App;
