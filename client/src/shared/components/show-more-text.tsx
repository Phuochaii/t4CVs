import React, { useState } from 'react';

const TextWithToggle = ({ text }: { text: string }) => {
  const [showAll, setShowAll] = useState(false);

  // Hàm này được sử dụng để đếm số dòng của văn bản
  const countLines = (text: string) => {
    const lineHeight = 18; // Điều chỉnh độ cao của mỗi dòng theo cần thiết
    const height = lineHeight * 2; // Số dòng tối đa là 2
    const div = document.createElement('div');
    div.style.visibility = 'hidden';
    div.style.position = 'absolute';
    div.style.width = 'fit-content';
    div.style.whiteSpace = 'pre-wrap';
    div.style.lineHeight = lineHeight + 'px';
    div.textContent = text;
    document.body.appendChild(div);
    const lines = Math.ceil(div.clientHeight / height);
    document.body.removeChild(div);
    return lines;
  };

  // Kiểm tra xem có cần hiển thị nút "Show more" hay không
  const showToggle = countLines(text) > 2;

  return (
    <div>
      {showAll ? (
        <div>
          <p>{text}</p>
          <button onClick={() => setShowAll(false)}>Show less</button>
        </div>
      ) : (
        <div>
          <p>{text}</p>
          {showToggle && (
            <button onClick={() => setShowAll(true)}>Show more</button>
          )}
        </div>
      )}
    </div>
  );
};

export default TextWithToggle;
