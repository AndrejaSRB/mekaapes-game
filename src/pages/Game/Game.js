// ******** HOC ********
import withConnect from '../../hoc/withConnect';

const Game = () => {
  return (
    <div>
      <h1>Factory</h1>
    </div>
  );
};

export default withConnect(Game, '/game');

