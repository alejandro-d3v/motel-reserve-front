interface IProps {
  selectedStartTime: string;
  selectedEndTime: string;
  handleBadgeClick: (time: string) => void;
}

const TimePicker = ({ selectedStartTime, selectedEndTime, handleBadgeClick }: IProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: 17 }, (_, i) => {
        const hour = 3 + Math.floor(i / 2);
        const minute = i % 2 === 0 ? '00' : '30';
        const time = `${hour.toString().padStart(2, '0')}:${minute}`;
        const isSelected = time === selectedStartTime || (selectedEndTime && time >= selectedStartTime && time <= selectedEndTime);
        const badgeClasses = `badge ${isSelected ? 'badge-neutral' : 'badge-outline-secondary'}`;

        return (
          <div key={time} className={badgeClasses} onClick={() => handleBadgeClick(time)}>
            {time}
          </div>
        );
      })}
    </div>
  );
};

export default TimePicker;