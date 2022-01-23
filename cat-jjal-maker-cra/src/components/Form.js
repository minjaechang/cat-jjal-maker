import { useState } from 'react';

const Form = ({ updateMainCat }) => {
  const [value, setValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

  const handleInputChange = (e) => {
    const userValue = e.target.value;
    setErrorMsg('');
    if (includesHangul(userValue)) {
      setErrorMsg('한글은 입력할 수 없습니다.');
    }
    setValue(userValue.toUpperCase());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (value === '') {
      setErrorMsg('빈 값으로 만들 수 없습니다.');
      return;
    }

    updateMainCat(value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type='text'
        name='name'
        placeholder='영어 대사를 입력해주세요'
        onChange={handleInputChange}
        value={value}
      />
      <button type='submit'>생성</button>
      <p style={{ color: 'red' }}>{errorMsg}</p>
    </form>
  );
};

export default Form;
