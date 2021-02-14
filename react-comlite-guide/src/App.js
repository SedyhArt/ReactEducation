import React, { Component } from 'react';

import classes from './App.css';
import Person from './Person/Person'


class App extends Component {

  state = {
    persons: [
      { id: 'ret45', name: "Artem", age: 27 },
      { id: 'gt13', name: "Nick", age: 21 },
      { id: 'lmll0', name: "Alex", age: 45 }
    ],
    showPersons: true,
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)}
            />
          })}
        </div>
      )
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }
    if (this.state.persons.length < 1) {
      assignedClasses.push(classes.blink)
    }

    return (
      <div className={classes.App}>
        <h1>I'm React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
          className={btnClass}
          // alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}>Switch name
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
