import logo from './logo.svg';
import './App.css';

function Header(props){
  return <h1><a href="/">{props.title} from props</a></h1>;
}

function Nav(props){

        const lis = [];
          for(let i=0; i<props.topics.length; i++){
            let t = props.topics[i];
            lis.push(<li id={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>)
          }  
  return <nav>
        <ol>
          {lis}
        </ol>
  </nav>
}

function Article(props) {
  return <article>
        <h2>{props.title} from props</h2>
        {props.body} from props
      </article>
}

function App() {
  const topics = [
    {id:1, title:"html", body:"html is ..."},
    {id:2, title:"css", body:"css is ..." },
    {id:3, title:"javascript", body:"javascript is ..."}
  ];
  return (
    <div>
      <Header title="WEB"></Header>
      <Nav topics={topics}></Nav> {/*문자열이 아닌 배열을 보낼 시 중괄호 사용! */}
      <Article title="Welcome" body="Hello, web"></Article>
    </div>
  );
}

export default App;
