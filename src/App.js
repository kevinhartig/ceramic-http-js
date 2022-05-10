import logo from './logo.svg';
import './App.css';
import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'

function App() {
  const API_URL = 'http:///localhost:7007';
  const ceramic = new CeramicClient(API_URL);
  const resolver = {
    ...getKeyResolver(),
    ...get3IDResolver(ceramic),
  }
  const did = new DID({
    resolver: {
      // A Ceramic client instance is needed by the 3ID DID resolver to load DID documents
      ...get3IDResolver(ceramic),
      // `did:key` DIDs are used internally by 3ID DIDs, therefore the DID instance must be able to resolve them
      ...getKeyResolver(),
    },
  })

  ceramic.did = did;
  console.log("did = " + ceramic.did);
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Basic DID creation
        </p>
      </header>
    </div>
  );
}

export default App;
