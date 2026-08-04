interface SliderProps {
  value: number;
  setValue: (e: number) => void;
  min: number;
  max: number;
}
function Slider({ value, setValue, min, max }: SliderProps) {
  return (
    <div>
      <input
        type="range"
        min={min * 100}
        max={max * 100}
        value={value * 100}
        onChange={(e) => {
          setValue(Number(e.target.value) / 100);
        }}
      />
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          setValue(Math.min(Math.max(0, Number(e.target.value)), 1));
        }}
      />
    </div>
  );
}

export default Slider;
