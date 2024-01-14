interface MentionOptionsListProps {
  mentionOptions: string[];
  selectedOptionIndex: number;
  handleOptionSelect: (selectedOption: string) => void;
//   mentionOptionsRef: React.RefObject<HTMLUListElement>;
}

const MentionOptionsList: React.FC<MentionOptionsListProps> = ({
  mentionOptions,
  selectedOptionIndex,
  handleOptionSelect,
//   mentionOptionsRef
}) => {
  return (
    <ul className="mention-options">
      {mentionOptions.map((option, index) => (
        <li
          key={option}
          onClick={() => handleOptionSelect(option)}
          className={index === selectedOptionIndex ? 'selected' : ''}
        >
          {option}
        </li>
      ))}
    </ul>
  );
};

export default MentionOptionsList;
