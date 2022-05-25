import React, { useState } from 'react'

import Bubble from '../components/Bubble'

export default function SalonsView({ presenter, viewModel }) {

  document.title = `Tous les salons`

  const [search, setSearch] = useState("")
  
  return (
    <div className="salons-wrapper">
        <div className="title-zone">
          <h1>Tous les salons</h1>
        </div>
        <div id="search-zone">
            <div id="search-box">
              <input
              type="text"
              placeholder="Rechercher un salon"
              onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        <div className="salons-group-wrapper">
          {viewModel.salons.filter(salon => salon.title.toLowerCase().includes(search.toLowerCase())).map(salon => (<Bubble key={salon.id} props={salon} />))}
        </div>
      </div>
  )
}
