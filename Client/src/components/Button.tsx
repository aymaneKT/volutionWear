import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button>
        <svg aria-hidden="true" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path strokeWidth={2} stroke="#fffffff" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" strokeLinejoin="round" strokeLinecap="round" />
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="#fffffff" d="M17 15V18M17 21V18M17 18H14M17 18H20" />
        </svg>
        ADD IMAGE
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    border: none;
    display: flex;
    padding: 0.75rem 1.5rem;
    background-color: #B074F3;
    color: #ffffff;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
    text-transform: uppercase;
    vertical-align: middle;
    align-items: center;
    border-radius: 0.5rem;
    user-select: none;
    gap: 0.75rem;
    box-shadow:
      0 4px 6px -1px #488aec31,
      0 2px 4px -1px #488aec17;
    transition: all 0.6s ease;
  }

  button:hover {
    box-shadow:
      0 10px 15px -3px #488aec4f,
      0 4px 6px -2px #488aec17;
  }

  button:focus,
  button:active {
    opacity: 0.85;
    box-shadow: none;
  }

  button svg {
    width: 1.25rem;
    height: 1.25rem;
  }`;

export default Button;
