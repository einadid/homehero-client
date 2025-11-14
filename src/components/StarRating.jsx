export default function StarRating({ value = 0, onChange }) {
  return (
    <div className="rating">
      {[1,2,3,4,5].map((n) => (
        <input
          key={n}
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-orange-400"
          checked={value === n}
          onChange={() => onChange(n)}
        />
      ))}
    </div>
  );
}