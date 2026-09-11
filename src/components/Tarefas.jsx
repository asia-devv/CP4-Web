import {useState, useEffect} from 'react';
import '../css/style.css';
import AlternarEstado from './AlternarEstado';

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
const [filtro, setFiltro] =useState("todos")

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
    concluido: false,

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

const AlternarConclusao = (id) => {
  const tarefaAtualizada = tarefas.map((tarefa) =>
    tarefa.id === id
      ? {...tarefa, concluido: !tarefa.concluido}
      : tarefa
  );
  setTarefas(tarefaAtualizada)
};

const tarefasFiltradas = tarefas.filter((tarefa) => {
  if (filtro === 'pendente') {
    return !tarefa.concluido;
  }
  if (filtro === 'concluidos') {
    return tarefa.concluido;
  }
  return true;
});
    
  return (
    <div className='container'> 

      <h1 className='titulo'> 
        Genrenciador de Tarefas 
      </h1>

      <form onSubmit={AdicionarTarefa} className='form-todo'> 

        <div className='form-linha-top'>

            <input type='text' value={campo} onChange={(e)=>setCampo(e.target.value)}
            className='input-todo'
            placeholder='Título da Tarefa'
            />

            <textarea value={descricao} onChange={(e)=>setDescricao(e.target.value)}
                className='text-desc'
                placeholder='Descrição'
            />

        </div>

        <div className='form-linha-bottom'>

            <input type='date' value={data} onChange={(e)=>setData(e.target.value)}
            className='input-data'
            />

            <select value={prioridade} onChange={(e)=>setPrioridade(e.target.value)}
                className='select-prioridade'
            >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
            </select>

            <button type='submit' className='btn-adicionar'> 
            +
            </button>

        </div>


      </form>
      
      <button className=''></button>
      <button ></button>
      <button ></button>

      <ul className='lista-tarefa'>

        {tarefas.map((tarefa)=> (
          <li key={tarefa.id} className='item-tarefa'>
            
            <div className='item-header'> 
                <AlternarEstado
                  concluido={tarefa.concluido}
                  alternar={() => AlternarConclusao(tarefa.id)}
                />
                <span className={`item-text ${tarefa.concluido ? 'concluido' : ''}`}>{tarefa.texto} </span>
                <span className='item-prioridade'>{tarefa.prioridade} </span>
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
                className='btn-excluir'>  
                x
                </button>

            </div>
            
          </li>
        ))}

      </ul>

        {tarefas.length === 0 && <p className='mensagem-vazia'> Nenhuma Tarefa Salva </p>}

    </div>
  )
}

export default Tarefas