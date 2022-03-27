import { useLocation } from 'react-router-dom';

const Success = () => {
  const { state } = useLocation();
  console.log(state);

  return <div>Success</div>;
};

export default Success;
