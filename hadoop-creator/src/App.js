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

      <div>
        <ClusterBuilder/>
      </div>
    </div>
  );
}

export default App;
