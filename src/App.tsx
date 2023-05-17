import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import PageAdmin from './components/PageAdmin';
import PageBoard from './components/PageBoard';
import PageChannel from './components/PageChannel';
import PageMessage from './components/PageMessage';
import PagePrefs from './components/PagePrefs';
import { getUserIdFromJWT } from './backend/boardapi';
import { UserIDContext } from './components/UserIdContext';
import PageChannelCreateAndEdit from './components/PageChannelCreateAndEdit';
import PageMessageCreateAndEdit from './components/PageMessageEdit';
import PageMessageCreate from './components/PageMessageCreate';
import PageMessageEdit from './components/PageMessageEdit';

function App() {

  const [userID, setUserID] = React.useState(getUserIdFromJWT());
  
  return (
    <UserIDContext.Provider value={{userID, setUserID}}>
    <div className="App">
      <header className="App-header">
        <Menu></Menu>
        {
          <Routes>
            <Route path="/" element={<PageBoard />} />
            <Route path="/channel/:channelID" element={<PageChannel />} />
            <Route path="/message/:messageID" element={<PageMessage />} />
            <Route path="/admin" element={<PageAdmin />} />
            <Route path="/prefs" element={<PagePrefs />} />

            <Route path="/channel/create" element={<PageChannelCreateAndEdit/>} />
            <Route path="/channel/:channelID/edit" element={<PageChannelCreateAndEdit/>} />

            <Route path="/channel/:channelID/newMessage" element={<PageMessageCreate />} />
            <Route path="/message/:messageID/edit" element={<PageMessageEdit/>} />

          </Routes>
        }
      </header>
    </div>
    </UserIDContext.Provider>
  );
}

export default App;
