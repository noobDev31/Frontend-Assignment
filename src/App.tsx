import {useState} from 'react';
import MentionComponent from './components/MentionComponent';
import './App.css';

const App = (): JSX.Element => {
  const [mentionValue, setMentionValue] = useState('');

  const handleMentionChange = ({ input, selectedOptions }: {input: string, selectedOptions: string[]}): void => {
    console.log('Input:', input);
    console.log('Selected Options:', selectedOptions);
    setMentionValue(input);
  };

  return (
    <div>
      <MentionComponent onChange={handleMentionChange} value={mentionValue} />
    </div>
  );
}

export default App;
