import './App.css';

import ClusterBuilder from './components/cluster-builder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hadoop Cluster Builder
        </p>
      </header>

      <body>
        <ClusterBuilder/>
      </body>
    </div>
  );
}

export default App;
