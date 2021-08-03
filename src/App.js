import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dogPicture: '',
      raca: '',
      loading: true,
    };

    this.fetchRandomDog = this.fetchRandomDog.bind(this);
  }

  componentDidMount() {
    this.fetchRandomDog();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    // const { dogPicture } = this.state;
    if (nextState.dogPicture.includes('terrier')) {
      return false;
    }
    return true;
  }

  async fetchRandomDog() {
    this.setState(
      { loading: true },
      async () => {
        const fetchURL = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await fetchURL.json();
        this.setState({
          loading: false,
          dogPicture: data.message,
          raca: (data.message.split('/')[4]),
        });
        const messageStorage = localStorage;
        messageStorage.setItem('imgURL', data.message);
        console.log();
      },
    );
  }

  render() {
    const { dogPicture, raca, loading } = this.state;
    const loadingElement = <span>Loading...</span>;
    const imgDog = <img src={ dogPicture } alt={ dogPicture } />;

    return (
      <main>
        <div>
          <h1>{ `Raça: ${raca}` }</h1>
        </div>
        <div>
          { loading ? loadingElement : imgDog }
        </div>
        <button type="submit" onClick={ this.fetchRandomDog }>Próxima imagem</button>
      </main>
    );
  }
}

export default App;
