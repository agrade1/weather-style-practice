import { useRef } from "react";

export default function SearchForm() {
  const inputRef = useRef(null);
  return (
    <form>
      search input
      <input
        ref={inputRef}
        // onChange={(e) => onChange(e.target.value)}
        placeholder="내용을 입력하세요"
      />
    </form>
  );
}
