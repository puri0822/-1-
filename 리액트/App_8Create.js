import './App.css';
import { useState } from 'react';

function Header(props){
  return <h1><a href="/" onClick={(event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>;
}

function Nav(props){

        const lis = [];
          for(let i=0; i<props.topics.length; i++){
            let t = props.topics[i];
            lis.push(<li id={t.id}>
              <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
                event.preventDefault();
                props.onChangeMode(Number(event.target.id)); //이벤트를 유발시킨 타겟을 잡음
              }}>{t.title}</a>
              </li>)
          }  
  return <nav>
        <ol>
          {lis}
        </ol>
  </nav>
}

function Article(props) {
  return <article>
        <h2>{props.title} </h2>
        {props.body}
      </article>
}



function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [topics, setTopics] = useState([
    {id:1, title:"html", body:"html is ..."},
    {id:2, title:"css", body:"css is ..." },
    {id:3, title:"javascript", body:"javascript is ..."}
  ]);

  function Create(props) {
    return <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value
        const value = event.target.body.value
        props.onCreate(title, value);
      }}>
        <p><input type='text' name='title' placeholder='title'></input></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value="Create"></input></p>
      </form>
    </article>
  }

  let content = null;
  if(mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, web from content"></Article>
  }else if(mode === "READ") {
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === Number(id)){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }else if(mode === "CREATE") {
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode("READ");
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>;
  }


  return (
    <div>
      <Header title="WEB" onChangeMode={(event)=>{
        setMode("WELCOME");
        alert('Header!');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode("READ");
        setId(_id);
        alert(id);
      }}></Nav> {/*문자열이 아닌 배열을 보낼 시 중괄호 사용! */}
      {content}
      <a href="/create/" onClick={(event)=>{
        event.preventDefault();
        setMode("CREATE");
      }}>Create</a>
    </div>
  );
}

export default App;
