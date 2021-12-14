// ******** HOC ********
import withConnect from '../../hoc/withConnect';

const Minting = () => {

  return (
    <div>
      <h1>Minting</h1>
    </div>
  );
};

export default withConnect(Minting, '/minting');
