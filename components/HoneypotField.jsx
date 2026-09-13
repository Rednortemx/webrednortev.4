// Invisible to people and assistive technology, but intentionally attractive
// to generic form-filling bots. The API silently discards submissions that
// populate it.
export default function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}
    >
      <label>
        Sitio web
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
