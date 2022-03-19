import { useState } from 'react';
import TwilioVideoProvider from './lib/components/TwilioVideoProvider';
import MainParticipant from './lib/components/TwilioVideoProvider/components/MainParticipant/MainParticipant';
import ParticipantList from './lib/components/TwilioVideoProvider/components/ParticipantList/ParticipantList';
import UserActions from './lib/components/TwilioVideoProvider/components/UserActions/UserActions';

function App() {
  const [inputToken, setInputToken] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <form>
            <label>Access Token:</label>
            <input onChange={(e) => setInputToken(e.target.value)}
            />
          </form>
          <TwilioVideoProvider
            accessToken={inputToken}
          // hideVideoRoom
          >
            {/* <ParticipantList />
            <MainParticipant />
            <ParticipantList mobile />
            <UserActions /> */}
          </TwilioVideoProvider>
        </div>
      </header>
    </div>
  );
}

export default App;
