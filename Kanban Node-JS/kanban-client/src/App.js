import { Provider } from 'react-redux';
import { store } from './actions/store';
import { Container } from 'react-bootstrap';
import Main from './components/Body/MainBody';
import Header from './components/Navigation/NavBar';

function App() {
  return (
    <Provider store={store}>
      <Container fluid='md'>
        <Header />
        <Main />
      </Container>
    </Provider>
  );
}

export default App;
