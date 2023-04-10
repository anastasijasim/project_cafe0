// import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
// import {useDispatch, useSelector} from "react-redux"

import Routes from './routes/Routes'
// import { useEffect } from 'react'

const App = () => {
  // const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);

  // console.log (isAuth);
  // useEffect (()=>{
  //   dispatch(fetchAuthMe());
  // })
  return (
    <>
      <Routes/>
    </>
  )
}

export default App