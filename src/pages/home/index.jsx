import './style.css'

function Home() {
  return (
    <div className='body'> 


      <div className='header'>
        <div className='title'>
          <h3>Minhas Turmas</h3>
        </div>

        <div className='exit'>
          <span className='exit-buttom'>
            <a href='.\login'>Sair</a>
          </span>
        </div>
      </div>

      <div className='grid-container'>
        <div className='grid-item'>
          <h2>Turma: A</h2> <br/>
          <p>Status: </p>
          <div className='access-class'>
            <button>••• Acessar</button>
          </div>
        </div>
        <div className='grid-item'>
          <h2>Turma: B</h2> <br/>
          <p>Status: </p>
          <div className='access-class'>
            <button>••• Acessar</button>
          </div>
        </div>
        <div className='grid-item'>
          <h2>Turma: C</h2> <br/>
          <p>Status: </p>
          <div className='access-class'>
            <button>••• Acessar</button>
          </div>
        </div>
        <div className='grid-item'>
          <h2>Turma: D</h2> <br/>
          <p>Status: </p>
          <div className='access-class'>
            <button>••• Acessar</button>
          </div>
        </div>
      </div>

      <div className='footer'>
        <div className='carroussel'>
          <h3>1 2 3...</h3>
        </div>

        <div className='new-class'>
          <span className='new-class-buttom'>
            <a href='#'>Adicionar Turma</a>
          </span>
        </div>
      </div>


    </div>
  )
}

export default Home