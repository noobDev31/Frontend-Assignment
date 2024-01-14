import {ChangeEvent, KeyboardEvent} from 'react';

interface MentionInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const MentionInput: React.FC<MentionInputProps> = ({ value, onChange, onKeyDown }) => {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Type here..."
        className="mention-input"
    />
    );
  };
  
  export default MentionInput;
