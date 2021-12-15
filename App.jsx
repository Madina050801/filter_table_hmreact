import React from "react";
import { data } from "./data";
import "./index.css";

class App extends React.Component {
  state = {
    data: data,
    active: null,
    select: null,
  };

  render() {
    const onEdit = (value) => {
      console.log(value);
      this.setState({ active: value });
    };

    const onChange = (e) => {
      const { value, name } = e.target;
      console.log(value, name);
      this.setState({
        active: {
          ...this.state.active,
          [name]: value,
        },
      });
    };

    const onSave = () => {
      let res = this.state.data.map((value) =>
        value.id === this.state.active.id ? this.state.active : value
      );
      this.setState({ data: res, active: null });
    };
    const onSearch = (value) => {
      console.log(value);
      this.setState({ select: value });
    }
    const onFilter = (e) => {
      const newData = this.state.data.filter((value) =>
        value.status.toLowerCase().includes(e.target.value.toLowerCase()) || value.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      this.setState({ data: newData, active: null });
    };
    return (
      <div>        
        <div className="select">
        <select name="filter" id="select">
          <option value="all">All</option>
          <option onChange={onSearch} value="name">Name</option>
          <option value="status">Status</option>
        </select>
        <input name="name" placeholder="search" onChange={onFilter} />
        </div>
        <div className="container">
          <table border="1" width="100%" className="table">
            <thead>
              <tr className="fixed">
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(({ id, name, status }, index) => (
                <tr key={index}>
                  <td>
                    {this.state.active === id ? <input value={id} /> : id}
                  </td>
                  <td>
                    {this.state.active?.id === id ? (
                      <input
                        name="name"
                        onChange={onChange}
                        value={this.state.active.name}
                      />
                    ) : (
                      name
                    )}
                  </td>
                  <td>
                    {this.state.active?.id === id ? (
                      <input
                        name="status"
                        onChange={onChange}
                        value={this.state.active.status}
                      />
                    ) : (
                      status
                    )}
                  </td>
                  <td>
                    <button>delete</button>
                    <button
                      onClick={() => {
                        this.state.active
                          ? onSave()
                          : onEdit({ id, name, status });
                      }}
                    >
                      {this.state?.active?.id === id ? "save" : "edit"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
