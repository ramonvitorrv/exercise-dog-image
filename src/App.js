import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dogPicture: '',
      loading: true,
    };

    this.fetchRandomDog = this.fetchRandomDog.bind(this);
  }

  componentDidMount() {
    this.fetchRandomDog();
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
        });
      },
    );
  }

  render() {
    const { dogPicture, loading } = this.state;
    const loadingElement = <span>Loading...</span>;
    const imgDog = <img src={ dogPicture } alt={ dogPicture } />;

    return (
      <main>
        <div>
          { loading ? loadingElement : imgDog }
        </div>
        <button type="submit" onClick={ this.fetchRandomDog }>Próxima imagem</button>
      </main>
    );
  }
}

export default App;
