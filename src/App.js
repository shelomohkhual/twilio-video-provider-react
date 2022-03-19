import TwilioVideoProvider from './lib/components/TwilioVideoProvider';
const data = {
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2UzMzJkNTM4NWMxZWI2YzdjYjY5OTA0ZWZiMGYxNjk0LTE2NDc2ODQ2ODAiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJBdmluYXNoIE4iLCJ2aWRlbyI6eyJyb29tIjoiQmFza2V0IEJhbGwifX0sImlhdCI6MTY0NzY4NDY4MCwiZXhwIjoxNjQ3Njg4MjgwLCJpc3MiOiJTS2UzMzJkNTM4NWMxZWI2YzdjYjY5OTA0ZWZiMGYxNjk0Iiwic3ViIjoiQUNhZmFkYzJkMjVkZDA4Zjc3MWJiODc4NWY0YmM4ZGFkZiJ9.zoY9PYK1PI4wvrjYT_BzkwKUEf2_IJSdg5TwPQ-KYNU"
};
function App() {
  return (
    <div className="App">
      <header className="App-header">

        <TwilioVideoProvider
          userName='Shelomoh'
          accessToken={data.accessToken}
        />
      </header>
    </div>
  );
}

export default App;
