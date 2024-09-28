import { useParams } from 'react-router'

const NoPage = () => {
  let params = useParams();
  console.log(params)
    return <h1>{'404' + params}</h1>;
};
  
  export default NoPage;