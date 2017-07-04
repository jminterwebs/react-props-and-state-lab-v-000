import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
    this.handleChangeFilterType = this.handleChangeFilterType.bind(this)
    this.findPets = this.findPets.bind(this)
    this.handleAdoptPet = this.handleAdoptPet.bind(this)
  }

  handleChangeFilterType = e => {
   this.setState({
     filters: {
       ...this.state.filters,
       type: e
     }
   })
 }

 findPets() {
   let url = '/api/pets'

   if (this.state.filters.type !== 'all') {
     url += `?type=${this.state.filters.type}`
   }

   fetch(url)
     .then(res => res.json())
     .then(pets => this.setState({ pets }))
 }

 handleAdoptPet = pet => {
   this.setState({
     adoptedPets: [...this.state.adoptedPets, pet],
   })
 }

 render() {
   return (
     <div className='ui container'>
       <header>
         <h1 className='ui dividing header'>React Animal Shelter</h1>
       </header>
       <div className='ui container'>
         <div className='ui grid'>
           <div className='four wide column'>
             <Filters filters={this.state.filters}
               onChangeType={this.handleChangeFilterType}
               onFindPetsClick={this.findPets}
             />
           </div>
           <div className='twelve wide column'>
             <PetBrowser pets={this.state.pets}
               adoptedPets={this.state.adoptedPets}
               onAdoptPet={this.handleAdoptPet}
             />
           </div>
         </div>
       </div>
     </div>
   )
 }

}

export default App;
