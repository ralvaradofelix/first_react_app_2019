import React, { Suspense } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import  Principal  from "./container/Principal";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from 'antd'

// function App() {
//   const { t, i18n } = useTranslation();
//   return (
//       <Principal t={t} />
//   );
// }
function App() {
  return (
    <div>
      <Suspense fallback={(<Icon type="loading" />)}>
      <Principal /> 
      </Suspense>
    </div>
  );
}

export default App;