import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
// import MentionTextArea from './MentionInput';
import MentionOptionsList from './MentionOptionList';
import data from '../data.json';
import './mentionComponent.css';


interface MentionComponentProps {
  onChange: (event: ChangeEvent<HTMLInputElement> & { input: string; selectedOptions: string[] }) => void;
  value: string;
}

const MentionComponent: React.FC<MentionComponentProps> = ({ onChange, value }) => {
  const [mentionOptions, setMentionOptions] = useState<string[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.includes('@')) {
      const mentionSegments = inputValue.split('@');
      const query = mentionSegments[mentionSegments.length - 1];
      const filteredOptions = data.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      );
      setMentionOptions(filteredOptions);
    } else {
      setMentionOptions([]);
    }

    // Trigger the onChange handler with the input and selected options
    onChange({ ...e, input: inputValue, selectedOptions: mentionOptions });
  };

  const handleOptionSelect = (selectedOption: string) => {
    const atIndex = value.lastIndexOf('@');
    const updatedInput =
      atIndex !== -1
        ? value.substring(0, atIndex + 1) + selectedOption
        : `@${selectedOption}`;

    setMentionOptions([]);
    onChange({ input: updatedInput, selectedOptions: [selectedOption] } as ChangeEvent<HTMLInputElement> & { input: string; selectedOptions: string[] });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (mentionOptions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedOptionIndex((prevIndex) =>
          prevIndex < mentionOptions.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedOptionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : mentionOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedOptionIndex !== -1) {
          handleOptionSelect(mentionOptions[selectedOptionIndex]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="mention-input-container">
       <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type here..."
        className="mention-input"
      />
      {mentionOptions.length > 0 && (
        <MentionOptionsList
          mentionOptions={mentionOptions}
          selectedOptionIndex={selectedOptionIndex}
          handleOptionSelect={handleOptionSelect}
        />
      )}
    </div>
  );
};

export default MentionComponent;
