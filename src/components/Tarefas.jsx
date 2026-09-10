import {useState, useEffect} from 'react'
import '../css/style.css'

const Tarefas = () => {
// Hook - usaState - Manipula o estado da variável
const [tarefas,setTarefas]=useState(()=>{
    const salvarTarefas = localStorage.getItem("item-tarefa");
    return salvarTarefas ? JSON.parse(salvarTarefas) : [];
});


const [campo,setCampo]=useState("");
const [descricao,setDescricao]=useState("");
const [data,setData]=useState("");
const [prioridade,setPrioridade]=useState("");

// Hook - useEffect - Realiza o efeito colateralm nesse exemplo vai mostrar a tarefa adicionada em tempo real
useEffect(()=>{
    localStorage.setItem("item-tarefa", JSON.stringify(tarefas))
},[tarefas])


// FUNÇÃO ADICIONAR TAREFA 
const AdicionarTarefa = (e) => {
  e.preventDefault();     // preventDefault - previne que a pagina se recarregue automaticamente 
  if(!campo.trim()) return;     // validação de Campo se estiver vazio

  // novo objeto
  const novaTarefa = { 
    id: Date.now(),     // gera Id automático
    texto: campo,
    descricao: descricao,
    data: data,
    prioridade: prioridade,

  }
  setTarefas([...tarefas,novaTarefa]);      // "..." (spread) = Adiciona nova tarefa, mantendo as tarefas anteriores 
  setCampo('');     // Limpa o campo 
  setDescricao('');
  setData ('');
  setPrioridade ('Baixa');
}


// FUNÇÃO REMOVER TAREFA 
const RemoverTarefa = (id) => {
  // VERIFICA SE O ID DA TAREFA ATUAL É DIFERENTE DO ID QUE DESEJA APAGAR, SE O ID FOR IGUAL(TAREFA QUE DESEJA APAGAR) A CONDIÇÃO RETORNA FALSO E O ITEM É EXCLUIDO
  const apagarTarefa = tarefas.filter((tarefa)=> tarefa.id !== id)     // filter = copia e organiza
  setTarefas(apagarTarefa);
}
    
  return (
    <div className='container'> 

      <h1 className='title'> 
        To-Do 
      </h1>

      <form onSubmit={AdicionarTarefa} className='form'> 

        <input type='text' value={campo} onChange={(e)=>setCampo(e.target.value)}
          className='input'
          placeholder='Título da Tarefa'
        />

        <textarea value={descricao} onChange={(e)=>setDescricao(e.target.value)}
            className='text-desc'
            placeholder='Descrição'
        />

        <div className='form-linha'>

            <input type='date' value={data} onChange={(e)=>setData(e.target.value)}
            className='data'
            />

            <select value={prioridade} onChange={(e)=>setPrioridade(e.target.value)}
                className='select-prioridade'
            >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
            </select>

        </div>

        <button type='submit' className='add'> 
          +
        </button>

      </form>
      
      <ul className='space-y-3'>

        {tarefas.map((tarefa)=> (
          <li key={tarefa.id} className='item'>

            <div className='item-header'> 
                <span className='item-text'>{tarefa.texto} </span>
                <span className='item-prioriade'>{tarefa.prioridade} </span>
            </div>

            {tarefa.descricao && (<p className='item-descricao'>{tarefa.descricao} </p>)}

            <div className='item-footer'>
                {tarefa.data ? (
                    <span className='item-data'> 
                        Expira em: {new Date(tarefa.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </span>
                ) : (
                    <span className='item-sem-data'> Sem Data </span>
                )}

                <button onClick={()=>RemoverTarefa(tarefa.id)}
                className='delete'>  
                x
                </button>

            </div>
            
          </li>
        ))}

      </ul>

        {tarefas.length === 0 && <p className='text-center text-[#f427b0c9] italic mt-4'> Nenhuma Tarefa Salva </p>}

    </div>
  )
}

export default Tarefas